import {
  Timer,
  TimerActionType,
  TimerStart,
  TimerTick,
  TimerStop,
} from "./timer.types";
import { generateID } from "../utils";
import produce from "immer";

const initTimer = (): Timer => ({
  uid: "placeholderUid",
  id: generateID("timer"),
  startAt: new Date(),
  endAt: null,
  planMinutes: 25,
  task: null,
  status: "standby",
  remainSecs: 25 * 60,
  isSync: false,
});

function timer(state: Timer = initTimer(), action: TimerActionType): Timer {
  if (action.name !== "timer") return state;
  switch (action.type) {
    case TimerStart:
      return produce(state, (draft) => {
        draft.uid = action.payload.uid;
        draft.planMinutes = action.payload.planMinutes;
        draft.task = action.payload.task ?? null;
        draft.remainSecs = draft.planMinutes * 60;
      });

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
