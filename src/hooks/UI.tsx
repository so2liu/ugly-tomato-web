import React, { useState, useEffect } from "react";
import { Form, Badge } from "react-bootstrap";
import { UseInputType, UseTagsType } from "./UI.type";

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

export function useTags(
  label: string,
  type: string = "text",
  hint?: string
): UseTagsType {
  const [value, reset, Input] = useInput(label, type, hint);

  const list: string[] = value
    .split(" ")
    .filter((tag) => tag.trim().length > 0);
  const uniqueList = list.filter((tag, index) => list.indexOf(tag) === index);
  const Tags = (
    <>
      {uniqueList.map((tag) => (
        <Badge key={tag} variant="success">
          {tag}
        </Badge>
      ))}
    </>
  );
  return [list, reset, Input, Tags];
}

export function useNotification(
  title: string,
  condition: () => boolean,
  deps: any[]
) {
  useEffect(() => {
    if (Notification.permission == "default") Notification.requestPermission();
  }, [Notification.permission]);

  useEffect(() => {
    if (condition()) {
      new Notification(title);
    }
  }, deps);
}
