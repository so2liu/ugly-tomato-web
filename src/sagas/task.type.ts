export const TaskCreateAsync = "append a async task";
export interface TaskCreateAsync {
  name: "task";
  type: typeof TaskCreateAsync;
  payload: {
    title: string;
    label: string[];
    minuteEachTomato: number;
  };
}

export const TaskDoneAsync = "mark a task as done in server";
export interface TaskDoneAsync {
  name: "task";
  type: typeof TaskDoneAsync;
  payload: {
    id: string;
    value: boolean;
  };
}

export const TaskDeleteAsync = "delete a task on server";
export interface TaskDeleteAsync {
  name: "task";
  type: typeof TaskDeleteAsync;
  payload: { id: string };
}

// export type TaskActionAsyncType = TaskCreateAsync | TaskDoneAsync;
