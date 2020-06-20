import {
  Timer,
  TimerActionType,
  TimerStart,
  TimerTick,
  TimerStop,
  TimerStatus,
} from "./timer.types";
import { generateID } from "../utils";
import produce from "immer";
import { Task } from "./tasks.type";

const initTimer = (
  uid: string = "placeholder",
  planMinutes: number = 25,
  taskID: string = "",
  status: TimerStatus = "standby"
): Timer => ({
  uid,
  id: generateID("timer"),
  startAt: new Date(),
  endAt: null,
  planMinutes,
  taskID,
  status,
  remainSecs: planMinutes * 60,
  isSync: false,
});

function timer(state: Timer = initTimer(), action: TimerActionType): Timer {
  if (action.name !== "timer") return state;
  switch (action.type) {
    case TimerStart:
      const { uid, planMinutes, taskID } = action.payload;
      return initTimer(uid, planMinutes, taskID, "running");

    case TimerTick:
      return produce(state, (draft) => {
        draft.remainSecs--;
        if (draft.remainSecs === 0) draft.status = "timeout";
      });

    case TimerStop:
      return produce(state, (draft) => {
        draft.endAt = new Date();
        draft.status = "stop";
      });

    default:
      return state;
  }
}

export default timer;
