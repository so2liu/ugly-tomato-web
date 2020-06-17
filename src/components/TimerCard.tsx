import React from "react";
import { Card, Button } from "react-bootstrap";
import { Timer } from "../reducers/timer.types";
import WrapJSON from "./WrapJSON";
import { stopTimerAsync } from "../actions/timer";

interface TimerCard {
  timer: Timer;
  onStopTimer: typeof stopTimerAsync;
}
function TimerCard(props: TimerCard) {
  const { timer, onStopTimer } = props;

  return (
    <>
      <h3>Timer Card</h3>
      <Card bg={timer.status === "timeout" ? "danger" : undefined}>
        <Card.Body>
          <Card.Title>
            {new Date(timer.remainSecs * 1000).toISOString().substr(11, 8)}
          </Card.Title>
          <Button onClick={onStopTimer}>Stop Working</Button>
          <WrapJSON json={timer} />
        </Card.Body>
      </Card>
    </>
  );
}

export default TimerCard;
