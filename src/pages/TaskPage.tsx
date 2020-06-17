import React from "react";
import ControlTaskList from "../containers/ControlTaskList";
import ControlNewTask from "../containers/ControlNewTask";
import { useSyncTasks } from "../API/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

function TaskPage() {
  const uid = useSelector((state: RootState) => state.user.uid);
  useSyncTasks(uid);
  return (
    <>
      <h2>Task Page</h2>
      <ControlNewTask />
      <br />
      <ControlTaskList />
    </>
  );
}

export default TaskPage;
