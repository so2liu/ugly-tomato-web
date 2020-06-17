import { TaskCreateAsync, TaskDoneAsync } from "./task.type";
import { put, call, takeEvery, select, delay } from "redux-saga/effects";
import { Task, TaskDone } from "../reducers/tasks.type";
import { generateID } from "../utils";
import { createTask, doneTask } from "../actions/task";
import {
  addTaskServer,
  markTaskSync,
  markTaskDoneServer,
} from "../API/firebase";
import { RootState } from "../reducers";

function* appendTask(action: TaskCreateAsync) {
  const uid: string = yield select((state: RootState) => state.user.uid);
  const newTask: Task = {
    uid: uid,
    id: generateID("task"),
    firestoreID: "",
    title: action.payload.title,
    label: action.payload.label,
    isSync: false,
    isDone: false,
    tomatoes: 0,
    minutes: 0,
    minuteEachTomato: action.payload.minuteEachTomato,
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

export function* watchTaskCreate() {
  yield takeEvery(TaskCreateAsync, appendTask);
}

function* finishTask(action: TaskDoneAsync) {
  const { id, firestoreID, value } = action.payload;
  yield put(doneTask(id, value));

  yield call(markTaskDoneServer, firestoreID, value);
  yield delay(500);
}

export function* watchTaskFinish() {
  yield takeEvery(TaskDoneAsync, finishTask);
}
