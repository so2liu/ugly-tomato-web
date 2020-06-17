export interface Task {
  readonly uid: string;
  readonly id: string;
  title: string;
  label: string[];
  isSync: boolean;
}

export const TaskCreate = "append a task";
export const TaskMarkSync = "mark a task as sync with server";
export const TaskSync = "sync task list with server";
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

export type TaskActionType = TaskCreate | TaskMarkSync | TaskSync;
