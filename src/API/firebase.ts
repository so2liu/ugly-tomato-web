import { firebaseConfig } from "./.env";

import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/firestore";
import { Task } from "../reducers/tasks.type";
import { TaskSyncType } from "./firebase.type";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { syncTask } from "../actions/task";

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

const db = firebase.firestore();

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
        setState(
          snapshot.docs.map((doc) => {
            return { ...(doc.data() as T), firestoreID: doc.id };
          })
        );
      });
    return () => {
      unsubsribe();
    };
  }, [collection]);
  return state;
};

export const useSyncTasks = (uid: string) => {
  const dispatch = useDispatch();
  const tasks = useWebsocket([] as TaskSyncType[], "tasks", ["uid", "==", uid]);
  useEffect(() => {
    dispatch(syncTask(tasks));
  });
};
