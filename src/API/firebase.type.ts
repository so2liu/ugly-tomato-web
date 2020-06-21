import { Task } from "../reducers/tasks.type";
import firebase from "./firebase";
import { Timer } from "../reducers/timer.types";
import { User } from "../reducers/user.type";

interface Server {
  updatedAt: firebase.firestore.FieldValue;
  version: "v1";
}

export interface TaskSyncType extends Task, Server {}

export interface TomatoSyncType extends Timer, Server {
  firestoreID?: string;
}

export interface UserSyncType extends User, Server {}

export type RawStateType = Task | Timer | User;
export type CollectionName = "tasks" | "tomatoes" | "users";
