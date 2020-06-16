import { Task } from "./tasks.type";

export interface Timer {
  readonly uid: string;
  readonly id: string;
  startAt: Date;
  endAt: Date | null;
  planMinutes: number;
  task: Task | null;
}

export type TypeName = "timer" | "task" | "uid";

export const TimerStart = "start a timer";
export const TimerTimeout = "timer is timeout";
interface TimerStart {
  name: "timer";
  type: typeof TimerStart;
  payload: {
    uid: string;
    planMinutes: number;
    task?: Task;
  };
}

export type TimerActionType = TimerStart;
