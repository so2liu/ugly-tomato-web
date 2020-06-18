import React from "react";
import { useInput, useTags } from "../hooks/UI";
import { Form, Button } from "react-bootstrap";
import { createTaskAsync } from "../actions/task";

interface NewTask {
  submitNewTask: typeof createTaskAsync;
}
function NewTask(props: NewTask) {
  const { submitNewTask } = props;

  const [title, resetTitle, TitleInput] = useInput("Task Name");
  const [
    minuteEachTomato,
    resetMinuteEachTomato,
    MinuteEachTomatoInput,
  ] = useInput("Minutes per Tomato", "number");
  const [tags, resetTags, TagInput, TagBadge] = useTags(
    "Tag Names",
    "Tags should be split with space."
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title.trim().length === 0) return;
    submitNewTask(title, tags, Number(minuteEachTomato));
    resetTitle();
    resetTags();
    resetMinuteEachTomato();
  }
  return (
    <>
      <h3>New Task</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="titleInput">{TitleInput}</Form.Group>
        <Form.Group controlId="tagInput">
          {TagInput}
          {TagBadge}
        </Form.Group>
        <Form.Group controlId="minuteInput">{MinuteEachTomatoInput}</Form.Group>
        <Button type="submit">Add</Button>
      </Form>
    </>
  );
}

export default NewTask;
