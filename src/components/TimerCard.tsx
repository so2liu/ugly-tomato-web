import React from "react";
import { Card, Button } from "react-bootstrap";
import { Timer } from "../reducers/timer.types";
import { stopTimerAsync } from "../actions/timer";
import {
  useNotification,
  useAskBeforeClose,
  usePageTitle,
} from "../hooks/window";
import { secToTimer } from "../utils";

interface TimerCard {
  timer: Timer;
  onStopTimer: typeof stopTimerAsync;
}
function TimerCard(props: TimerCard) {
  const { timer, onStopTimer } = props;

  useNotification("🍔Timeout! Take a break.", timer.status === "timeout");

  usePageTitle("⚡️Running!", timer.status === "running");
  usePageTitle("🍔Timeout!", timer.status === "timeout");

  useAskBeforeClose(
    "Close page will lost your current timer.",
    timer.status === "running" || timer.status === "timeout"
  );

  function handleStopTimer(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    onStopTimer();
  }

  return (
    <>
      <h3>Timer Card</h3>
      <Card bg={timer.status === "timeout" ? "danger" : undefined}>
        <Card.Body>
          <Card.Title> {secToTimer(timer.remainSecs)}</Card.Title>
          {["running", "timeout"].includes(timer.status) && (
            <Button onClick={handleStopTimer}>Stop Working</Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
}

export default TimerCard;
