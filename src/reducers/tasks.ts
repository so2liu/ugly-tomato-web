import {
  Task,
  TaskActionType,
  TaskCreate,
  TaskMarkSync,
  TaskSync,
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

    default:
      return state;
  }
}

export default tasks;
