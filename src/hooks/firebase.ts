import { useState, useEffect } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { TaskSyncType } from "../API/firebase.type";
import { syncTask } from "../actions/task";
import { db } from "../API/firebase";

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
