import React from "react";
import { Card, Button } from "react-bootstrap";
import WrapJSON from "./WrapJSON";
import { Task } from "../reducers/tasks.type";
import { startTimer } from "../actions/timer";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { doneTaskAsync } from "../actions/task";
import Tags from "./Tags";

interface Props {
  task: Task;
  onStartTimer: typeof startTimer;
  onFinishTask: typeof doneTaskAsync;
}
const TaskCard = (props: Props) => {
  const { task, onStartTimer, onFinishTask } = props;
  const { title, isSync, isDone, id, firestoreID } = task;
  const uid = useSelector((state: RootState) => state.user.uid);
  const status = useSelector((state: RootState) => state.timer.status);

  function handleStartTimer() {
    onStartTimer(uid, task.minuteEachTomato, task);
  }

  function handleToggleDone() {
    onFinishTask(id, firestoreID, !isDone);
  }

  return (
    <>
      <Card border={isSync ? "success" : "warning"}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Tags tags={task.label} />
          <Card.Text>{task.tomatoes.toFixed(0)} x 🍅</Card.Text>
          <Card.Text>{task.minutes.toFixed(2)} x ⌛</Card.Text>
          <Card.Text>{task.minuteEachTomato.toFixed(2)} x ⌛/🍅</Card.Text>
          {!task.isDone && status !== "running" && (
            <Button onClick={handleStartTimer}>Start</Button>
          )}
          {isDone ? (
            <Button onClick={handleToggleDone} variant="warning">
              Reopen
            </Button>
          ) : (
            <Button onClick={handleToggleDone} variant="success">
              Finish
            </Button>
          )}
        </Card.Body>
      </Card>
      <br />
    </>
  );
};

export default TaskCard;
