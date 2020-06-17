import { all } from "redux-saga/effects";
import watchTask from "./task";
import { watchTick, watchStopTimer } from "./timer";

export default function* rootSaga() {
  yield all([watchTask(), watchTick(), watchStopTimer()]);
}
