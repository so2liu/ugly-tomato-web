import {
  TimerActionType,
  TimerStart,
  TimerTick,
  TimerStop,
} from "../reducers/timer.types";
import { Task } from "../reducers/tasks.type";
import { TimerStopAsync, TimerActionAsync } from "../sagas/timer.type";

export const startTimer = (
  uid: string,
  planMinutes: number,
  taskID: string
): TimerActionType => ({
  name: "timer",
  type: TimerStart,
  payload: {
    uid,
    planMinutes,
    taskID,
  },
});

export const tickTimer = (): TimerActionType => ({
  name: "timer",
  type: TimerTick,
});

export const stopTimer = (): TimerActionType => ({
  name: "timer",
  type: TimerStop,
});

export const stopTimerAsync = (): TimerActionAsync => ({
  name: "timer",
  type: TimerStopAsync,
});
