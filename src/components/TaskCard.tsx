import React from "react";
import { Card, Button } from "react-bootstrap";
import WrapJSON from "./WrapJSON";
import { Task } from "../reducers/tasks.type";
import { startTimer } from "../actions/timer";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { doneTaskAsync } from "../actions/task";

interface Props {
  task: Task;
  onStartTimer: typeof startTimer;
  onFinishTask: typeof doneTaskAsync;
}
const TaskCard = (props: Props) => {
  const { task, onStartTimer, onFinishTask } = props;
  const { title, isSync, isDone, id, firestoreID } = task;
  const uid = useSelector((state: RootState) => state.user.uid);

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
          <Button onClick={handleStartTimer}>Start</Button>
          {isDone ? (
            <Button onClick={handleToggleDone} variant="warning">
              Reopen
            </Button>
          ) : (
            <Button onClick={handleToggleDone} variant="success">
              Finish
            </Button>
          )}
          <WrapJSON json={props.task} />
        </Card.Body>
      </Card>
      <br />
    </>
  );
};

export default TaskCard;
