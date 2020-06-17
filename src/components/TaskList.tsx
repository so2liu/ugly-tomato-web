import React from "react";
import TaskCard from "./TaskCard";
import { Task } from "../reducers/tasks.type";
import { startTimer } from "../actions/timer";
import { doneTaskAsync } from "../actions/task";

interface props {
  tasks: Task[];
  onStartTimer: typeof startTimer;
  onFinishTask: typeof doneTaskAsync;
}
const TaskList = (props: props) => {
  const { tasks } = props;
  return (
    <>
      <h3>Task List</h3>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onStartTimer={props.onStartTimer}
          onFinishTask={props.onFinishTask}
        />
      ))}
    </>
  );
};

export default TaskList;
