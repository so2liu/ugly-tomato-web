import { useState, useEffect, useMemo } from "react";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { TaskSyncType } from "../API/firebase.type";
import { syncTask } from "../actions/task";
import { db } from "../API/firebase";
import { EqualConditionType } from "./types";

const useWebsocket = <T>(
  initState: T[],
  collection: string,
  equalCondition: EqualConditionType
) => {
  const [state, setState] = useState(initState);
  useEffect(() => {
    const unsubsribe = db
      .collection(collection)
      .where(...equalCondition)
      .orderBy("updatedAt", "desc")
      .onSnapshot((snapshot) => {
        const newState = snapshot.docs.map((doc) => doc.data() as T);
        setState(newState);
      });
    return () => {
      unsubsribe();
    };
  }, [equalCondition, collection]);

  return state;
};

export const useSyncTasks = (uid: string) => {
  const dispatch = useDispatch();
  const equalCondition: EqualConditionType = useMemo(() => ["uid", "==", uid], [
    uid,
  ]);
  const tasks = useWebsocket([] as TaskSyncType[], "tasks", equalCondition);
  useEffect(() => {
    dispatch(syncTask(tasks));
  }, [dispatch, tasks]);
};
