import { all } from "redux-saga/effects";
import watchTask from "./task";

export default function* rootSaga() {
  yield all([watchTask()]);
}
