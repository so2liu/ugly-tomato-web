import { TaskCreateAsync, TaskActionAsyncType } from "./task.type";
import { put, call, takeEvery, select } from "redux-saga/effects";
import { Task } from "../reducers/tasks.type";
import { generateID } from "../utils";
import { createTask } from "../actions/task";
import { addTaskServer, markTaskSync } from "../API/firebase";
import { RootState } from "../reducers";

function* appendTask(action: TaskActionAsyncType) {
  const uid: string = yield select((state: RootState) => state.user.uid);
  const newTask: Task = {
    uid: uid,
    id: generateID("task"),
    title: action.payload.title,
    label: action.payload.label,
    isSync: false,
  };
  yield put(createTask(newTask));
  try {
    const res = yield call(addTaskServer, newTask);
    console.log({ res });
    yield call(markTaskSync, res.id);
  } catch (error) {
    console.log(error);
  }
}

export default function* watchTask() {
  yield takeEvery(TaskCreateAsync, appendTask);
}
