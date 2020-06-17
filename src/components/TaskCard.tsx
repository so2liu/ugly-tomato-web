import React from "react";
import { Card, Button } from "react-bootstrap";
import WrapJSON from "./WrapJSON";
import { Task } from "../reducers/tasks.type";
import { startTimer } from "../actions/timer";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

interface Props {
  task: Task;
  onStartTimer: typeof startTimer;
}
const TaskCard = (props: Props) => {
  const { task, onStartTimer } = props;
  const { title, isSync } = task;
  const uid = useSelector((state: RootState) => state.user.uid);

  function handleStartTimer() {
    onStartTimer(uid, 0.25, task);
  }

  return (
    <>
      <Card border={isSync ? "success" : "warning"}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Button onClick={handleStartTimer}>Start</Button>
          <WrapJSON json={props.task} />
        </Card.Body>
      </Card>
      <br />
    </>
  );
};

export default TaskCard;
