import {
  TaskCreateAsync,
  TaskDoneAsync,
  TaskDeleteAsync,
} from "../sagas/task.type";
import {
  TaskActionType,
  TaskCreate,
  Task,
  TaskSync,
  TaskDone,
  TaskTomatoDone,
} from "../reducers/tasks.type";

export const createTaskAsync = (
  title: string,
  label: string[],
  minuteEachTomato: number
): TaskCreateAsync => ({
  name: "task",
  type: TaskCreateAsync,
  payload: {
    title,
    label,
    minuteEachTomato,
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

export const doneTask = (id: string, value: boolean): TaskActionType => ({
  name: "task",
  type: TaskDone,
  payload: { id, value },
});

export const doneTaskAsync = (id: string, value: boolean): TaskDoneAsync => ({
  name: "task",
  type: TaskDoneAsync,
  payload: { id, value },
});

export const doneTomato = (
  id: string,
  plusMinutes: number
): TaskActionType => ({
  name: "task",
  type: TaskTomatoDone,
  payload: {
    id,
    plusMinutes,
  },
});

export const deleteTaskAsync = (id: string): TaskDeleteAsync => ({
  name: "task",
  type: TaskDeleteAsync,
  payload: { id },
});
