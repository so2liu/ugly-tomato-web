import { delay, put, select, takeEvery, call } from "redux-saga/effects";
import { tickTimer, stopTimer } from "../actions/timer";
import { RootState } from "../reducers";
import { TimerStart, Timer } from "../reducers/timer.types";
import { TimerStopAsync } from "./timer.type";
import {
  addTimerOnServer,
  markTimerAsSyncOnServer,
  updateTaskOnServer,
} from "../API/firebase";
import { Task } from "../reducers/tasks.type";
import { doneTomato } from "../actions/task";

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
  const timer: Timer = yield select((state: RootState) => state.timer);
  const taskID: string = yield select(
    (state: RootState) => state.timer.task?.id
  );
  const task: Task = yield select((state: RootState) => state.timer.task);
  const plusMinutes =
    (new Date().getTime() - timer.startAt.getTime()) / 1000 / 60;

  yield put(doneTomato(task.id, plusMinutes));

  const newTask: Task = yield select((state: RootState) =>
    state.tasks.find((t) => t.id === taskID)
  );
  yield call(updateTaskOnServer, task.firestoreID, newTask);

  const res = yield call(addTimerOnServer, timer);
  yield call(markTimerAsSyncOnServer, res.id);
}

export function* watchStopTimer() {
  yield takeEvery(TimerStopAsync, stopTimerChain);
}
