export interface Task {
  readonly uid: string;
  readonly id: string;
  title: string;
  label: string[];
  isSync: boolean;
}

export const TaskCreate = "append a task";
export const TaskMarkSync = "mark a task as sync with server";
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

export type TaskActionType = TaskCreate | TaskMarkSync;
