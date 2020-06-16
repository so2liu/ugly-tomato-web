import { TaskCreateAsync, TaskActionAsyncType } from "./task.type";
import { take, put, call, takeEvery } from "redux-saga/effects";
import { Task } from "../reducers/tasks.type";
import { generateID } from "../utils";
import { createTask } from "../actions/task";
import { addTaskServer } from "../API/firebase";

function* appendTask() {
  const action: TaskActionAsyncType = yield take(TaskCreateAsync);
  const newTask: Task = {
    uid: action.payload.uid,
    id: generateID("task"),
    title: action.payload.title,
    label: action.payload.label,
    isSync: false,
  };
  yield put(createTask(newTask));
  const serverPath = yield call(addTaskServer, newTask);
  console.log(serverPath);
}

export default function* watchTask() {
  takeEvery(TaskCreateAsync, appendTask);
}
