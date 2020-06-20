import React from "react";
import ControlTaskList from "../containers/ControlTaskList";
import ControlNewTask from "../containers/ControlNewTask";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import ControlTimer from "../containers/ControlTimer";

function TaskPage() {
  const status = useSelector((state: RootState) => state.timer.status);

  return (
    <>
      <h2>Task Page</h2>
      {(status === "running" || status === "timeout") && <ControlTimer />}
      <br />
      <ControlTaskList />
      <br />
      <ControlNewTask />
    </>
  );
}

export default TaskPage;
