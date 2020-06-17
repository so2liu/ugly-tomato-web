import React from "react";
import { Card } from "react-bootstrap";
import WrapJSON from "./WrapJSON";
import { Task } from "../reducers/tasks.type";

interface Props {
  task: Task;
}
const TaskCard = (props: Props) => {
  const { title, isSync } = props.task;

  return (
    <>
      <Card border={isSync ? "success" : "warning"}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <WrapJSON json={props.task} />
        </Card.Body>
      </Card>
      <br />
    </>
  );
};

export default TaskCard;
