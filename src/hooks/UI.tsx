import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { UseInputType, UseTagsType } from "./types";
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
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={`Enter ${label}`}
        value={state}
        onChange={handleChange}
      />
      {hint && <Form.Text className="text-muted">{hint}</Form.Text>}
    </Form.Group>
  );

  function reset() {
    setState("");
  }

  return [state, reset, Input];
}

export function useTags(rawTags: string[], disable?: boolean): UseTagsType {
  const list: string[] = rawTags.filter((tag) => tag.trim().length > 0);
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
          disabled={disable}
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
  }, [condition, title]);
}
