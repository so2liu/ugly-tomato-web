import { all, takeEvery, select, call } from "redux-saga/effects";
import { watchTaskCreate, watchTaskFinish, watchTaskDelete } from "./task";
import { watchTick, watchStopTimer } from "./timer";
import { UserAction } from "../reducers/user.type";
import { RootState } from "../reducers";
import { setUserOnServer } from "../API/firebase";
import { watchSyncUser } from "./user";

export default function* rootSaga() {
  yield all([
    watchTaskCreate(),
    watchTick(),
    watchStopTimer(),
    watchTaskFinish(),
    watchTaskDelete(),
    watchSyncUser(),
    watchAndLog(),
  ]);
}

function* watchAndLog() {
  yield takeEvery("*", function* logger(action: any) {
    const state = yield select();

    console.log("action", action);
    console.log("state after", state);
  });
}
