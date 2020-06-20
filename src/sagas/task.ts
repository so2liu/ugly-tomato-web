import { TaskCreateAsync, TaskDoneAsync, TaskDeleteAsync } from "./task.type";
import { put, call, takeEvery, select } from "redux-saga/effects";
import { Task } from "../reducers/tasks.type";
import { generateID } from "../utils";
import { createTask, doneTask } from "../actions/task";
import { setTaskOnServer, deleteTaskOnServer } from "../API/firebase";
import { RootState } from "../reducers";
import produce from "immer";

function* appendTask(action: TaskCreateAsync) {
  const uid: string = yield select((state: RootState) => state.user.uid);
  const newTask: Task = {
    uid: uid,
    id: generateID("task"),
    title: action.payload.title,
    label: action.payload.label,
    isSync: false,
    isDone: false,
    tomatoes: 0,
    minutes: 0,
    minuteEachTomato: action.payload.minuteEachTomato,
  };
  yield put(createTask(newTask));
  const newTaskToServer = produce(newTask, (draft) => {
    draft.isSync = true;
  });
  const res = yield call(setTaskOnServer, newTaskToServer);
}

export function* watchTaskCreate() {
  yield takeEvery(TaskCreateAsync, appendTask);
}

function* finishTask(action: TaskDoneAsync) {
  const { id, value } = action.payload;
  yield put(doneTask(id, value));
  const updatedTask = yield select((state: RootState) =>
    state.tasks.find((t) => t.id === id)
  );
  yield call(setTaskOnServer, updatedTask);
}

export function* watchTaskFinish() {
  yield takeEvery(TaskDoneAsync, finishTask);
}

function* deleteTask(action: TaskDeleteAsync) {
  yield call(deleteTaskOnServer, action.payload.id);
}
export function* watchTaskDelete() {
  yield takeEvery(TaskDeleteAsync, deleteTask);
}
