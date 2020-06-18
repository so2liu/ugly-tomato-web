import React from "react";
import ControlTaskList from "../containers/ControlTaskList";
import ControlNewTask from "../containers/ControlNewTask";
import { useSyncTasks } from "../API/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import ControlTimer from "../containers/ControlTimer";

function TaskPage() {
  const uid = useSelector((state: RootState) => state.user.uid);
  const status = useSelector((state: RootState) => state.timer.status);
  useSyncTasks(uid);
  return (
    <>
      <h2>Task Page</h2>
      {status === "running" && <ControlTimer />}
      <br />
      <ControlTaskList />
      <br />
      <ControlNewTask />
    </>
  );
}

export default TaskPage;
