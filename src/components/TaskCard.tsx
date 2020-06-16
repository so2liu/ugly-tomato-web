import React from "react";
import { Card, Button } from "react-bootstrap";
import { BsFillPlayFill } from "react-icons/bs";
import WrapJSON from "./WrapJSON";
import { Task } from "../reducers/tasks.type";
import { createTaskAsync } from "../actions/task";

interface Props {
  task: Task;
}
const TaskCard = (props: Props) => {
  const { id, title } = props.task;

  return (
    <Card>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <WrapJSON json={props.task} />
      </Card.Body>
    </Card>
  );
};

export default TaskCard;
