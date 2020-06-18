import { Task } from "../reducers/tasks.type";
import firebase from "./firebase";
import { Timer } from "../reducers/timer.types";
import { User } from "../reducers/user.type";
export interface TaskSyncType extends Task {
  updatedAt: firebase.firestore.FieldValue;
  version: "v1";
}

export interface TomatoSyncType extends Timer {
  updatedAt: firebase.firestore.FieldValue;
  version: "v1";
  firestoreID?: string;
}

export type RawStateType = Task | User | Timer;
export type CollectionName = "tasks" | "users" | "tomatoes";
