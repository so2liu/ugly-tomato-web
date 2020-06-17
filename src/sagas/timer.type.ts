export const TimerStopAsync = "stop the timer and send to server";
interface TimerStopAsync {
  name: "timer";
  type: typeof TimerStopAsync;
}

export type TimerActionAsync = TimerStopAsync;
