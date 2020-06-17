export interface Task {
  readonly uid: string;
  readonly id: string;
  firestoreID: string;
  title: string;
  label: string[];
  isSync: boolean;
  isDone: boolean;
  minuteEachTomato: number;
  minutes: number;
  tomatoes: number;
}

export const TaskCreate = "append a task";
export const TaskMarkSync = "mark a task as sync with server";
export const TaskSync = "sync task list with server";
export const TaskDone = "mark a task as done";
export const TaskTomatoDone = "a tomato is done for a task";
interface TaskCreate {
  name: "task";
  type: typeof TaskCreate;
  payload: Task;
}

interface TaskMarkSync {
  name: "task";
  type: typeof TaskMarkSync;
  payload: {
    id: string;
  };
}

interface TaskSync {
  name: "task";
  type: typeof TaskSync;
  payload: Task[];
}

interface TaskDone {
  name: "task";
  type: typeof TaskDone;
  payload: { id: string; value: boolean };
}

interface TaskTomatoDone {
  name: "task";
  type: typeof TaskTomatoDone;
  payload: {
    id: string;
    plusMinutes: number;
  };
}

export type TaskActionType =
  | TaskCreate
  | TaskMarkSync
  | TaskSync
  | TaskDone
  | TaskTomatoDone;
