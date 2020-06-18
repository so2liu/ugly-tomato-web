import React, { useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { Timer } from "../reducers/timer.types";
import WrapJSON from "./WrapJSON";
import { stopTimerAsync } from "../actions/timer";
import { useNotification, useAskBeforeClose } from "../hooks/UI";

interface TimerCard {
  timer: Timer;
  onStopTimer: typeof stopTimerAsync;
}
function TimerCard(props: TimerCard) {
  const { timer, onStopTimer } = props;

  useNotification("Timeout! Take a break.", () => timer.status === "timeout", [
    timer.status,
  ]);

  useAskBeforeClose(
    "Close page with running timer will lost your current timer data. Do you really want to close page?",
    () => timer.status === "running",
    [timer.status]
  );

  return (
    <>
      <h3>Timer Card</h3>
      <Card bg={timer.status === "timeout" ? "danger" : undefined}>
        <Card.Body>
          <Card.Title>
            {new Date(timer.remainSecs * 1000).toISOString().substr(11, 8)}
          </Card.Title>
          {["running", "timeout"].includes(timer.status) && (
            <Button onClick={onStopTimer}>Stop Working</Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default TimerCard;
