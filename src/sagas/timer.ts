import { delay, put, select, takeEvery, call } from "redux-saga/effects";
import { tickTimer, stopTimer } from "../actions/timer";
import { RootState } from "../reducers";
import { TimerStart } from "../reducers/timer.types";
import { TimerStopAsync } from "./timer.type";
import { addTimerServer, markTimerSync } from "../API/firebase";

function* tick() {
  const selectStatus = (state: RootState) => state.timer.status;

  while (["standby", "running"].includes(yield select(selectStatus))) {
    yield delay(1000);
    yield put(tickTimer());
  }
}

export function* watchTick() {
  yield takeEvery(TimerStart, tick);
}

function* stopTimerChain() {
  yield put(stopTimer());
  const timer = yield select((state: RootState) => state.timer);
  try {
    const res = yield call(addTimerServer, timer);
    yield call(markTimerSync, res.id);
  } catch (error) {
    console.error(error);
  }
}

export function* watchStopTimer() {
  yield takeEvery(TimerStopAsync, stopTimerChain);
}
