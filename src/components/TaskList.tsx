import React from "react";
import TaskCard from "./TaskCard";
import { Task } from "../reducers/tasks.type";
import { startTimer } from "../actions/timer";

interface props {
  tasks: Task[];
  onStartTimer: typeof startTimer;
}
const TaskList = (props: props) => {
  const { tasks } = props;
  return (
    <>
      <h3>Task List</h3>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onStartTimer={props.onStartTimer} />
      ))}
    </>
  );
};

export default TaskList;
