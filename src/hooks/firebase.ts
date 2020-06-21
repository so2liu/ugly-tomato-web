import { useState, useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import {
  TaskSyncType,
  UserSyncType,
  CollectionName,
} from "../API/firebase.type";
import { syncTask } from "../actions/task";
import { db } from "../API/firebase";
import { EqualConditionType } from "./types";
import { initUser } from "../reducers/user";
import { syncUserFromServer } from "../actions/user";

const useWebsocketByCondition = <T>(
  initState: T[],
  collection: CollectionName,
  equalCondition: EqualConditionType
) => {
  const [state, setState] = useState(initState);
  useEffect(() => {
    const unsubsribe = db
      .collection(collection)
      .where(...equalCondition)
      .orderBy("updatedAt", "desc")
      .limit(30)
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

const useWebsocketByID = <T>(
  initState: T,
  collection: CollectionName,
  id: string
) => {
  const [state, setState] = useState(initState);
  useEffect(() => {
    const unsubsribe = db
      .collection(collection)
      .doc(id)
      .onSnapshot((snapshot) => {
        setState(snapshot.data() as T);
      });
    return () => {
      unsubsribe();
    };
  }, [collection, id]);
  return state;
};

// ===== Tasks =====
export const useSyncTasks = (uid: string) => {
  const dispatch = useDispatch();
  const equalCondition: EqualConditionType = useMemo(() => ["uid", "==", uid], [
    uid,
  ]);
  const tasks = useWebsocketByCondition(
    [] as TaskSyncType[],
    "tasks",
    equalCondition
  );
  useEffect(() => {
    dispatch(syncTask(tasks));
  }, [dispatch, tasks]);
};

// ===== User =====
export const useSyncUser = (uid: string) => {
  const dispatch = useDispatch();

  const user = useWebsocketByID(initUser() as UserSyncType, "users", uid);
  useEffect(() => {
    if (user.isSignedIn) dispatch(syncUserFromServer(user));
  }, [dispatch, user]);
};
