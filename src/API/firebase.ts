import { firebaseConfig } from "./.env";
import _ from "lodash";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import "firebase/auth";
import { Task } from "../reducers/tasks.type";
import { TaskSyncType, TomatoSyncType } from "./firebase.type";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { syncTask } from "../actions/task";
import { Timer } from "../reducers/timer.types";

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

const db = firebase.firestore();

export const addTimerServer = async (tomato: Timer) => {
  const timerSync: TomatoSyncType = {
    ...tomato,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    version: "v1",
  };
  const docRef = await db.collection("tomatoes").add(timerSync);
  return { id: docRef.id, path: docRef.path };
};

export const markTimerSync = (firestoreID: string) => {
  return markServer(firestoreID, "tomatoes", { isSync: true });
};

export const markTaskDoneServer = (firestoreID: string, value: boolean) => {
  return markServer(firestoreID, "tasks", { isDone: value });
};

const markServer = (
  firestoreID: string,
  collection: string,
  toUpdated: { [key: string]: boolean }
) => {
  return db.collection(collection).doc(firestoreID).update(toUpdated);
};

export const updateTask = (
  firestoreID: string,

  task: Task
) => {
  const taskSync: TaskSyncType = {
    ...task,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    version: "v1",
    isSync: true,
  };
  return db.collection("tasks").doc(firestoreID).update(taskSync);
};

export const addTaskServer = async (task: Task) => {
  const taskSync: TaskSyncType = {
    ...task,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    version: "v1",
  };
  const docRef = await db.collection("tasks").add(taskSync);
  return { id: docRef.id, path: docRef.path };
};

export const markTaskSync = (firestoreID: string) => {
  return db.collection("tasks").doc(firestoreID).update({ isSync: true });
};

const useWebsocket = <T>(
  initState: T[],
  collection: string,
  equalCondition: [string, "==", string]
) => {
  const [state, setState] = useState(initState);
  useEffect(() => {
    const unsubsribe = db
      .collection(collection)
      .where(...equalCondition)
      .orderBy("updatedAt", "desc")
      .onSnapshot((snapshot) => {
        const newState = snapshot.docs.map((doc) => {
          return { ...(doc.data() as T), firestoreID: doc.id };
        });
        if (!_.isEqual(state, newState)) setState(newState);
      });
    return () => {
      unsubsribe();
    };
  }, [collection, equalCondition]);

  return state;
};

export const useSyncTasks = (uid: string) => {
  const dispatch = useDispatch();
  const tasks = useWebsocket([] as TaskSyncType[], "tasks", ["uid", "==", uid]);
  useEffect(() => {
    dispatch(syncTask(tasks));
  }, [tasks, dispatch, syncTask]);
};
