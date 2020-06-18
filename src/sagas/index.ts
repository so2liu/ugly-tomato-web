import { all } from "redux-saga/effects";
import { watchTaskCreate, watchTaskFinish, watchTaskDelete } from "./task";
import { watchTick, watchStopTimer } from "./timer";

export default function* rootSaga() {
  yield all([
    watchTaskCreate(),
    watchTick(),
    watchStopTimer(),
    watchTaskFinish(),
    watchTaskDelete(),
  ]);
}
