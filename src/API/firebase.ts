import { firebaseConfig } from "./.env";

import firebase from "firebase/app";
import { Task } from "../reducers/tasks.type";

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

const db = firebase.firestore();

export const addTaskServer = (task: Task) =>
  db
    .collection("tasks")
    .add({
      ...task,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      version: "v1",
    })
    .then((docRef) => docRef.path);
