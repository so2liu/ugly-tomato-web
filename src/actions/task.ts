import { TaskActionAsyncType, TaskCreateAsync } from "../sagas/task.type";
import { TaskActionType, TaskCreate, Task } from "../reducers/tasks.type";

export const createTaskAsync = (
  uid: string,
  title: string,
  label: string[]
): TaskActionAsyncType => ({
  name: "task",
  type: TaskCreateAsync,
  payload: {
    uid,
    title,
    label,
  },
});

export const createTask = (newTask: Task): TaskActionType => ({
  name: "task",
  type: TaskCreate,
  payload: newTask,
});
