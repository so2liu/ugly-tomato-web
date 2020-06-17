import { TaskActionAsyncType, TaskCreateAsync } from "../sagas/task.type";
import {
  TaskActionType,
  TaskCreate,
  Task,
  TaskSync,
} from "../reducers/tasks.type";

export const createTaskAsync = (
  title: string,
  label: string[]
): TaskActionAsyncType => ({
  name: "task",
  type: TaskCreateAsync,
  payload: {
    title,
    label,
  },
});

export const createTask = (newTask: Task): TaskActionType => ({
  name: "task",
  type: TaskCreate,
  payload: newTask,
});

export const syncTask = (serverTasks: Task[]): TaskActionType => ({
  name: "task",
  type: TaskSync,
  payload: serverTasks,
});
