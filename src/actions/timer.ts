import { TimerActionType, TimerStart } from "../reducers/timer.types";
import { Task } from "../reducers/tasks.type";

export const startTimer = (
  uid: string,
  planMinutes: number,
  task?: Task
): TimerActionType => ({
  name: "timer",
  type: TimerStart,
  payload: {
    uid,
    planMinutes,
    task,
  },
});
