import React from "react";
import { Card, Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { Task } from "../reducers/tasks.type";
import { startTimer } from "../actions/timer";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { doneTaskAsync, deleteTaskAsync } from "../actions/task";
import { useTags } from "../hooks/UI";

interface Props {
  task: Task;
  onStartTimer: typeof startTimer;
  onFinishTask: typeof doneTaskAsync;
  onDeleteTask: typeof deleteTaskAsync;
}
const TaskCard = (props: Props) => {
  const { task, onStartTimer, onFinishTask, onDeleteTask } = props;
  const { title, isSync, isDone, id } = task;
  const uid = useSelector((state: RootState) => state.user.uid);
  const status = useSelector((state: RootState) => state.timer.status);

  function handleStartTimer(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    onStartTimer(uid, task.minuteEachTomato, task.id);
  }

  function handleToggleDone(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    onFinishTask(id, !isDone);
  }

  function handleDelete(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    onDeleteTask(id);
  }

  const StartBtn = <Button onClick={handleStartTimer}>Start</Button>;
  const CloseBtn = (
    <Button onClick={handleToggleDone} variant="success">
      Close
    </Button>
  );
  const ReopenBtn = (
    <Button onClick={handleToggleDone} variant="outline-warning">
      Reopen
    </Button>
  );
  const DeleteBtn = (
    <Button onClick={handleDelete} variant="danger">
      Delete
    </Button>
  );

  const TaskDiscription = (
    <>
      <Card.Text>
        {task.tomatoes.toFixed(0)} x{" "}
        <span role="img" aria-label="tomato">
          🍅
        </span>
      </Card.Text>
      <Card.Text>
        {task.minutes.toFixed(2)} x{" "}
        <span role="img" aria-label="minute">
          ⌛
        </span>
      </Card.Text>
      <Card.Text>
        {task.minuteEachTomato.toFixed(2)} x{" "}
        <span role="img" aria-label="minute">
          ⌛
        </span>
        /
        <span role="img" aria-label="tomato">
          🍅
        </span>
      </Card.Text>
    </>
  );

  const [, Tags] = useTags(task.label, true);

  return (
    <>
      <Card border={isSync ? "success" : "warning"}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {Tags}
          {TaskDiscription}
          <Row>
            <Col>
              <ButtonGroup aria-label="TaskManage">
                {!task.isDone && status !== "running" && StartBtn}

                {isDone ? ReopenBtn : CloseBtn}
              </ButtonGroup>
            </Col>
            <Col>{DeleteBtn}</Col>
            <Col md={6} xs={0} />
          </Row>
        </Card.Body>
      </Card>
      <br />
    </>
  );
};

export default TaskCard;
