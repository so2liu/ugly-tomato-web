import { Task } from "./tasks.type";

export interface Timer {
  readonly uid: string;
  readonly id: string;
  startAt: Date;
  endAt: Date | null;
  planMinutes: number;
  taskID: string;
  status: TimerStatus;
  remainSecs: number;
  isSync: boolean;
}

export type TimerStatus = "standby" | "running" | "stop" | "timeout";

export type TypeName = "timer" | "task" | "uid" | "record" | "todo";

export const TimerStart = "start a timer";
export const TimerTimeout = "timer is timeout";
export const TimerTick = "tick";
export const TimerStop = "stop timer";

interface TimerStart {
  name: "timer";
  type: typeof TimerStart;
  payload: {
    uid: string;
    planMinutes: number;
    taskID: string;
  };
}

interface TimerTick {
  name: "timer";
  type: typeof TimerTick;
}

interface TimerStop {
  name: "timer";
  type: typeof TimerStop;
}

export type TimerActionType = TimerStart | TimerTick | TimerStop;
