import { combineReducers } from "redux";
import timer from "./timer";
import tasks from "./tasks";
import user from "./user";

const rootReducer = combineReducers({ timer, tasks, user });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
