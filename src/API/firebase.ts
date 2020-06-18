import { firebaseConfig } from "./.env";
import _ from "lodash";
import firebase, { firestore } from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/auth";
import { Task } from "../reducers/tasks.type";
import {
  TaskSyncType,
  TomatoSyncType,
  CollectionName,
  RawStateType,
} from "./firebase.type";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { syncTask } from "../actions/task";
import { Timer } from "../reducers/timer.types";

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
  firestoreID?: string
) => {
  const readyAdd = {
    ...toAdd,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    version: "v1",
    isSync: true,
  };
  if (firestoreID) {
    await db.collection(collection).doc(firestoreID).set(readyAdd);
    return {
      id: firestoreID,
      path: `${collection}/${firestoreID}`,
    };
  } else {
    const docRef = await db.collection(collection).add(readyAdd);
    return { id: docRef.id, path: docRef.path };
  }
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

export const updateTaskOnServer = (firestoreID: string, task: Task) => {
  return setOnServer("tasks", task, firestoreID);
};

export const addTaskOnServer = (task: Task) => {
  return setOnServer("tasks", task);
};

export const markTaskSyncOnServer = (firestoreID: string) => {
  return db.collection("tasks").doc(firestoreID).update({ isSync: true });
};

export const deleteTaskOnServer = (firestoreID: string) => {
  return deleteOnServer("tasks", firestoreID);
};

// ===== timer =====
export const markTimerAsSyncOnServer = (firestoreID: string) => {
  return markOnServer(firestoreID, "tomatoes", { isSync: true });
};

export const addTimerOnServer = async (tomato: Timer) => {
  return setOnServer("tomatoes", tomato);
};
