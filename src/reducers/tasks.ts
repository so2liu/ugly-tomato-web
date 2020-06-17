import {
  Task,
  TaskActionType,
  TaskCreate,
  TaskMarkSync,
  TaskSync,
  TaskDone,
  TaskTomatoDone,
} from "./tasks.type";
import produce from "immer";
import { mockTasks } from "../mock/task";

function tasks(state: Task[] = mockTasks, action: TaskActionType) {
  if (action.name !== "task") return state;

  switch (action.type) {
    case TaskCreate:
      return produce(state, (draft) => {
        draft.push(action.payload);
      });

    case TaskMarkSync:
      return produce(state, (draft) => {
        const index = draft.findIndex((d) => d.id === action.payload.id);
        draft[index].isSync = true;
      });

    case TaskSync:
      return action.payload;

    case TaskDone:
      return produce(state, (draft) => {
        const target = draft.find((d) => d.id === action.payload.id);
        if (target) target.isDone = action.payload.value;
      });

    case TaskTomatoDone:
      return produce(state, (draft) => {
        const target = draft.find((d) => d.id === action.payload.id);
        if (target) {
          target.tomatoes++;
          target.minutes += action.payload.plusMinutes;
        }
      });

    default:
      return state;
  }
}

export default tasks;
