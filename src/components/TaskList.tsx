import React, { useState, useReducer } from "react";
import TaskCard from "./TaskCard";
import { Task } from "../reducers/tasks.type";
import { startTimer } from "../actions/timer";
import { doneTaskAsync, deleteTaskAsync } from "../actions/task";
import produce from "immer";
import { ButtonGroup, Button } from "react-bootstrap";

interface props {
  tasks: Task[];
  onStartTimer: typeof startTimer;
  onFinishTask: typeof doneTaskAsync;
  onDeleteTask: typeof deleteTaskAsync;
}
const TaskList = (props: props) => {
  const { tasks } = props;

  const [state, dispatch] = useReducer(showDoneReducer, initState);

  function handleToggleShowDone(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    dispatch({ type: "Toggle" });
  }

  return (
    <>
      <h3>Task List</h3>
      <ButtonGroup aria-label="Basic example">
        <Button variant="info" size="sm" onClick={handleToggleShowDone}>
          Undo
        </Button>
        <Button variant="secondary" size="sm" onClick={handleToggleShowDone}>
          Done
        </Button>
      </ButtonGroup>
      <br />
      <br />
      {tasks
        .filter((t) => t.isDone === state.showDone)
        .map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStartTimer={props.onStartTimer}
            onFinishTask={props.onFinishTask}
            onDeleteTask={props.onDeleteTask}
          />
        ))}
    </>
  );
};

export default TaskList;

const initState = {
  showDone: false,
};
function showDoneReducer(state: typeof initState, action: { type: string }) {
  switch (action.type) {
    case "Toggle":
      return produce(state, (draft) => {
        draft.showDone = !draft.showDone;
      });
    default:
      return state;
  }
}
