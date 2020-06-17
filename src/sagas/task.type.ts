export const TaskCreateAsync = "append a async task";
interface TaskCreateAsync {
  name: "task";
  type: typeof TaskCreateAsync;
  payload: {
    title: string;
    label: string[];
  };
}

export type TaskActionAsyncType = TaskCreateAsync;
