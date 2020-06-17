import { Task } from "../reducers/tasks.type";
import firebase from "./firebase";
export interface TaskSyncType extends Task {
  updatedAt: firebase.firestore.FieldValue;
  version: "v1";
  firestoreID?: string;
}
