import { Timer, TimerActionType, TimerStart } from "./timer.types";
import { generateID } from "../utils";
import produce from "immer";

const initTimer = (): Timer => ({
  uid: "placeholderUid",
  id: generateID("timer"),
  startAt: new Date(),
  endAt: null,
  planMinutes: 25,
  task: null,
});

function timer(state: Timer = initTimer(), action: TimerActionType): Timer {
  if (action.name !== "timer") return state;
  switch (action.type) {
    case TimerStart:
      return produce(state, (draft) => {
        draft.uid = action.payload.uid;
        draft.planMinutes = action.payload.planMinutes;
        draft.task = action.payload.task ?? null;
      });

    default:
      return state;
  }
}

export default timer;
