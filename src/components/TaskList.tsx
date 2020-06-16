import React from "react";
import TaskCard from "./TaskCard";
import { createTaskAsync } from "../actions/task";
import { Task } from "../reducers/tasks.type";

interface props {
  tasks: Task[];
  onCreateTask: typeof createTaskAsync;
}
const TaskList = (props: props) => {
  const { tasks } = props;
  return (
    <>
      <h3>Task List</h3>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </>
  );
};

export default TaskList;
