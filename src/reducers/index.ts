import { combineReducers } from "redux";
import timer from "./timer";
import tasks from "./tasks";

const rootReducer = combineReducers({ timer, tasks });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
