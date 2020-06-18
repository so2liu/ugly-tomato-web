import React, { useState, useEffect } from "react";
import { Form, Badge, Button, Container } from "react-bootstrap";
import { UseInputType, UseTagsType } from "./UI.type";
import uniq from "lodash/uniq";

export function useInput(
  label: string,
  type: string = "text",
  hint?: string
): UseInputType {
  const [state, setState] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setState(e.target.value);
  }

  const Input = (
    <>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={`Enter ${label}`}
        value={state}
        onChange={handleChange}
      />
      {hint && <Form.Text className="text-muted">{hint}</Form.Text>}
    </>
  );

  function reset() {
    setState("");
  }

  return [state, reset, Input];
}

export function useTags(value: string): UseTagsType {
  const list: string[] = value
    .split(" ")
    .filter((tag) => tag.trim().length > 0);
  const uniqueList = uniq(list);

  const [clicked, setClicked] = useState("");

  const Tags = (
    <div style={{ marginTop: 10, marginBottom: 10 }}>
      {uniqueList.map((tag, index) => (
        <Button
          key={tag}
          size="sm"
          variant={index % 2 === 0 ? "outline-primary" : "outline-secondary"}
          style={{ marginRight: 10 }}
          onClick={() => {
            setClicked(tag);
          }}
        >
          {tag}
        </Button>
      ))}
    </div>
  );
  return [uniqueList, Tags, clicked];
}

export function useNotification(title: string, condition: () => boolean) {
  useEffect(() => {
    if (Notification.permission === "default") Notification.requestPermission();
  }, []);

  useEffect(() => {
    if (condition()) {
      new Notification(title);
    }
  }, [title, condition]);
}

export function useAskBeforeClose(title: string, condition: () => boolean) {
  useEffect(() => {
    if (condition()) {
      window.onbeforeunload = function (e: BeforeUnloadEvent) {
        e = e || window.event;
        if (e) {
          e.returnValue = title;
        }
        return title;
      };
    } else {
      window.onbeforeunload = null;
    }
  }, [condition]);
}
