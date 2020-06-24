import React, {
  useReducer,
  Dispatch,
  useState,
  useEffect,
  Fragment,
} from "react";
import { Card, Button, ButtonGroup, Container } from "react-bootstrap";
import produce from "immer";
import {
  loadingAppStateFromLocalStorage,
  generateID,
  secToTimer,
  calTotalSecFromRecords,
} from "../utils";
import { useSaveInLocalStorage } from "../hooks/window";
import { useInput } from "../hooks/UI";
import { delay } from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { setTodoOnServer } from "../API/firebase";
import moment from "moment";
import WrapJSON from "../components/WrapJSON";

function RecordPage() {
  const uid = useSelector((state: RootState) => state.user.uid);
  const initialTodo = loadingAppStateFromLocalStorage<Todo[]>([], "todo");
  const [todo, dispatchTodo] = useReducer(
    todoReducer,
    produce(initialTodo, (draft) => {
      draft.forEach((d) => {
        d.totalSec = calTotalSecFromRecords(d.records);
      });
    })
  );
  useSaveInLocalStorage(todo, "todo");

  const initialRecord = loadingAppStateFromLocalStorage(
    blankRecord(),
    "record",
    (loaded: Record) => Boolean(loaded.endAt)
  );
  const [record, dispatchRecord] = useReducer(recordReducer, initialRecord);
  useSaveInLocalStorage(record, "record");

  const [changedTodoID, setChangedTodoID] = useState("");
  function handleStop(todoID: string, record: Record) {
    dispatchRecord(stop());
    dispatchTodo(
      appendRecordForTodo(
        todoID,
        record.id,
        record.startAt,
        new Date().getTime()
      )
    );
    setChangedTodoID(todoID);
  }

  useEffect(() => {
    const changedTodo = todo.find((t) => t.id === changedTodoID);
    if (changedTodo) setTodoOnServer(changedTodo);
  }, [changedTodoID, todo]);

  const CurrentTimer = <Timer record={record} />;

  return (
    <>
      <h2>RecordPage</h2>

      <CreateTodoCard
        onCreate={(title) => {
          dispatchTodo(create(title, uid));
        }}
      />
      {todo
        .filter((t) => !t.isDeleted)
        .map((t) => (
          <Fragment key={t.id}>
            <Container style={{ margin: 0, marginTop: "5%", padding: 0 }}>
              <TodoCard
                todo={t}
                Timer={record.todoID === t.id ? CurrentTimer : undefined}
                onStart={(todoID) => {
                  dispatchRecord(start(todoID));
                  setChangedTodoID(todoID);
                }}
                onStop={() => {
                  handleStop(record.todoID, record);
                  setChangedTodoID(record.todoID);
                }}
                onDelete={(todoID) => {
                  dispatchTodo(deleteTodo(todoID));
                  setChangedTodoID(todoID);
                }}
                onToggleDone={(todoID) => {
                  dispatchTodo(toogleDone(todoID));
                  setChangedTodoID(todoID);
                }}
              />
            </Container>
          </Fragment>
        ))}
    </>
  );
}
export default RecordPage;

function Timer(props: { record: Record }) {
  const { record } = props;

  const [sec, setSec] = useState(-1);
  useEffect(() => {
    if (record.status === "running") {
      const periodSec = Math.floor(
        (new Date().getTime() - record.startAt) / 1000
      );
      const timerID = delay(setSec, 1000, periodSec);
      console.log(sec);
      return () => {
        clearTimeout(timerID);
      };
    }
  }, [sec, record]);

  return (
    <>
      {" "}
      <p>{secToTimer(Math.max(sec, 0))}</p>
      {process.env.NODE_ENV === "development" && <WrapJSON json={record} />}
    </>
  );
}

function TodoCard(props: {
  todo: Todo;
  Timer?: JSX.Element;
  onStart: Dispatch<string>;
  onStop: Dispatch<void>;
  onDelete: Dispatch<string>;
  onToggleDone: Dispatch<string>;
}) {
  const { todo, onStart, onStop, onDelete, onToggleDone, Timer } = props;

  function handleStart() {
    onStart(todo.id);
  }

  function handleStop() {
    onStop();
  }

  function handleDelete() {
    onDelete(todo.id);
  }

  function handleToogleDone() {
    onToggleDone(todo.id);
  }

  const StartStop = (
    <>
      <Button variant="secondary" onClick={handleStart}>
        Start
      </Button>
      <Button variant="outline-secondary" onClick={handleStop}>
        Stop
      </Button>
    </>
  );

  return (
    <Card>
      <Card.Header>{moment(todo.updatedAt).fromNow()}</Card.Header>
      <Card.Body>
        <Card.Title>{todo.title}</Card.Title>
        {Timer}
        {todo.totalSec > 0 && (
          <Card.Text>
            Already done for{" "}
            {moment.duration(todo.totalSec, "seconds").humanize()}
          </Card.Text>
        )}
        <ButtonGroup>
          {!todo.isDone && StartStop}
          <Button variant="info" onClick={handleToogleDone}>
            {todo.isDone ? "Open" : "Close"}
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </ButtonGroup>
        {process.env.NODE_ENV === "development" && <WrapJSON json={todo} />}
      </Card.Body>
    </Card>
  );
}

function CreateTodoCard(props: { onCreate: Dispatch<string> }) {
  const { onCreate } = props;
  const [title, resetTitle, TitleInput] = useInput("Todo");
  function onAdd() {
    onCreate(title);
    resetTitle();
  }
  return (
    <Card>
      <Card.Body>
        <Card.Title>New Todo</Card.Title>
        {TitleInput}
        <Button variant="secondary" onClick={onAdd}>
          Add
        </Button>
      </Card.Body>
    </Card>
  );
}

// ===== Todo =====
export type Todo = {
  readonly uid: string;
  readonly id: string;
  title: string;
  updatedAt: number;
  isDone: boolean;
  isDeleted: boolean;
  totalSec: number;
  records: { startAt: number; endAt: number; recordID: string }[];
};

type TodoAction =
  | CreateTodo
  | ToggleDoneTodo
  | AppendRecordForTodo
  | DeleteTodo;
type CreateTodo = {
  type: "Create";
  payload: Todo;
};
type ToggleDoneTodo = {
  type: "ToggleDone";
  payload: { id: string };
};
type AppendRecordForTodo = {
  type: "AppedRecordForTodo";
  payload: { id: string; recordID: string; startAt: number; endAt: number };
};
type DeleteTodo = {
  type: "DeleteTodo";
  payload: { id: string };
};

const create = (title: string, uid: string): TodoAction => ({
  type: "Create",
  payload: {
    uid,
    id: generateID("todo"),
    title,
    updatedAt: new Date().getTime(),
    isDone: false,
    isDeleted: false,
    totalSec: 0,
    records: [],
  },
});

const toogleDone = (id: string): TodoAction => ({
  type: "ToggleDone",
  payload: { id },
});

const appendRecordForTodo = (
  id: string,
  recordID: string,
  startAt: number,
  endAt: number
): TodoAction => ({
  type: "AppedRecordForTodo",
  payload: { id, recordID, startAt, endAt },
});

const deleteTodo = (id: string): TodoAction => ({
  type: "DeleteTodo",
  payload: { id },
});

const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case "Create":
      return produce(state, (draft) => {
        draft.unshift(action.payload);
      });
    case "ToggleDone":
      return produce(state, (draft) => {
        const index = draft.findIndex((d) => d.id === action.payload.id);
        if (index > -1) {
          draft[index].isDone = !draft[index].isDone;
        }
      });
    case "DeleteTodo":
      return produce(state, (draft) => {
        const index = draft.findIndex((d) => d.id === action.payload.id);
        if (index > -1) {
          draft[index].isDeleted = true;
        }
      });
    case "AppedRecordForTodo":
      return produce(state, (draft) => {
        const index = draft.findIndex((d) => d.id === action.payload.id);
        if (index > -1) {
          const { recordID, startAt, endAt } = action.payload;
          draft[index].records.push({ recordID, startAt, endAt });
          draft[index].totalSec += (endAt - startAt) / 1000;
        }
      });
    default:
      return state;
  }
};

// ===== Record =====

type Record = {
  readonly id: string;
  readonly todoID: string;
  status: "standby" | "running";
  startAt: number;
  endAt: number | null;
};

type StartAction = {
  type: "Start";
  payload: Record;
};

type StopAction = {
  type: "Stop";
};

type RecordAction = StartAction | StopAction;

const recordReducer = (state: Record, action: RecordAction): Record => {
  switch (action.type) {
    case "Start":
      return action.payload;

    case "Stop":
      return produce(state, (draft) => {
        draft.endAt = new Date().getTime();
        draft.status = "standby";
      });
    default:
      return state;
  }
};

const start = (todoID: string): RecordAction => ({
  type: "Start",
  payload: {
    id: generateID("record"),
    todoID,
    status: "running",
    startAt: new Date().getTime(),
    endAt: null,
  },
});

const stop = (): RecordAction => ({
  type: "Stop",
});

const blankRecord = (): Record => ({
  id: "",
  todoID: "",
  status: "standby",
  startAt: new Date().getTime(),
  endAt: null,
});
