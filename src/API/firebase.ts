import { firebaseConfig } from "./.env";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/auth";
import { Task } from "../reducers/tasks.type";
import { CollectionName, RawStateType } from "./firebase.type";
import { Timer } from "../reducers/timer.types";
import { User } from "../reducers/user.type";
import { Todo } from "../pages/RecordPage";

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

export const db = firebase.firestore();

// ===== general =====
const markOnServer = (
  firestoreID: string,
  collection: string,
  toUpdated: { [key: string]: boolean }
) => {
  return db.collection(collection).doc(firestoreID).update(toUpdated);
};

const setOnServer = async (
  collection: CollectionName,
  toAdd: RawStateType,
  firestoreID: string
) => {
  const readyAdd = {
    ...toAdd,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    version: "v1",
    isSync: true,
  };

  await db
    .collection(collection)
    .doc(firestoreID)
    .set(readyAdd, { merge: true });
  return {
    id: firestoreID,
    path: `${collection}/${firestoreID}`,
  };
};

const deleteOnServer = async (
  collection: CollectionName,
  firebaseID: string
) => {
  await db.collection(collection).doc(firebaseID).delete();
  return {
    id: firebaseID,
    path: `${collection}/${firebaseID}`,
  };
};

// ===== tasks =====

export const markTaskDoneServer = (firestoreID: string, value: boolean) => {
  return markOnServer(firestoreID, "tasks", { isDone: value });
};

export const setTaskOnServer = (task: Task) => {
  return setOnServer("tasks", task, task.id);
};

export const deleteTaskOnServer = (firestoreID: string) => {
  return deleteOnServer("tasks", firestoreID);
};

// ===== timer =====
export const markTimerAsSyncOnServer = (firestoreID: string) => {
  return markOnServer(firestoreID, "tomatoes", { isSync: true });
};

export const setTimerOnServer = (tomato: Timer) => {
  return setOnServer("tomatoes", tomato, tomato.id);
};

// ===== user =====
export const setUserOnServer = (user: User) => {
  console.log("call setUser", user.uid);
  return setOnServer("users", user, user.uid);
};

// ===== toto =====
export const setTodoOnServer = (todo: Todo) => {
  console.log(todo);
  return setOnServer("todo", todo, todo.info.id);
};
