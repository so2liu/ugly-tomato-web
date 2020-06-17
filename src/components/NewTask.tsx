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
  const [tags, resetTags, TagInput, TagBadge] = useTags(
    "Tag Names",
    "Tags should be split with space."
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    submitNewTask(title, tags);
    resetTitle();
    resetTags();
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
        <Button type="submit">Add</Button>
      </Form>
    </>
  );
}

export default NewTask;
