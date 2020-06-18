import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { Task } from "../reducers/tasks.type";
import { startTimer } from "../actions/timer";
import { doneTaskAsync, deleteTaskAsync } from "../actions/task";
import { Form } from "react-bootstrap";
import { useSyncTasks } from "../hooks/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { useTags } from "../hooks/UI";

interface props {
  tasks: Task[];
  onStartTimer: typeof startTimer;
  onFinishTask: typeof doneTaskAsync;
  onDeleteTask: typeof deleteTaskAsync;
}
const TaskList = (props: props) => {
  const { tasks } = props;

  const [showClosed, setShowClosed] = useState(false);

  const uid = useSelector((state: RootState) => state.user.uid);
  useSyncTasks(uid);

  const [tags, Tags, clickedTag] = useTags(
    tasks.map((t) => t.label.join(" ")).join(" ")
  );

  return (
    <>
      <h3>Task List</h3>
      <Form.Group controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Show closed tasks"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setShowClosed(e.target.checked);
          }}
        />
      </Form.Group>
      {Tags}
      {tasks
        .filter((t) => {
          if (showClosed) return t;
          return t.isDone === false;
        })
        .filter((t) => {
          if (clickedTag) return t.label.includes(clickedTag);
          return true;
        })
        .map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onStartTimer={props.onStartTimer}
            onFinishTask={props.onFinishTask}
            onDeleteTask={props.onDeleteTask}
          />
        ))}
    </>
  );
};

export default TaskList;
