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
import { SetState } from "immer/dist/internal";

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
    const changedTodo = todo.find((t) => t.info.id === changedTodoID);
    if (changedTodo) setTodoOnServer(changedTodo);
  }, [changedTodoID, todo]);

  const CurrentTimer = <Timer record={record} />;

  const [showDone, setShowDone] = useState(false);
  return (
    <>
      <h2>RecordPage</h2>

      <CreateTodoCard
        onCreate={(title) => {
          dispatchTodo(create(title, uid));
        }}
      />
      <Container style={{ margin: 0, marginTop: "5%", padding: 0 }}>
        <ToggleOpenTabs showDone={showDone} setShowDone={setShowDone} />
      </Container>
      {todo
        .filter((t) => t.status !== "deleted")
        .filter((t) => (showDone ? true : t.status !== "done"))
        .map((t) => (
          <Fragment key={t.info.id}>
            <Container style={{ margin: 0, marginTop: "5%", padding: 0 }}>
              <TodoCard
                todo={t}
                btnGroup={
                  <TodoBtnGroup
                    todo={t}
                    record={record}
                    onStart={() => {
                      const todoID = t.info.id;
                      dispatchRecord(start(todoID));
                      dispatchTodo(startTodo(todoID));
                      setChangedTodoID(todoID);
                    }}
                    onStop={() => {
                      handleStop(record.todoID, record);
                      setChangedTodoID(record.todoID);
                    }}
                    onDelete={() => {
                      const todoID = t.info.id;
                      dispatchTodo(deleteTodo(todoID));
                      setChangedTodoID(todoID);
                    }}
                    onToggleDone={() => {
                      const todoID = t.info.id;

                      dispatchTodo(toogleDone(todoID));
                      setChangedTodoID(todoID);
                    }}
                  />
                }
                Timer={record.todoID === t.info.id ? CurrentTimer : undefined}
              />
            </Container>
          </Fragment>
        ))}
    </>
  );
}
export default RecordPage;

function ToggleOpenTabs(props: {
  showDone: boolean;
  setShowDone: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { showDone, setShowDone, ...rest } = props;
  return (
    <ButtonGroup {...rest}>
      <Button
        variant="secondary"
        disabled={!showDone}
        onClick={() => {
          setShowDone(false);
        }}
      >
        Open
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          setShowDone(true);
        }}
        disabled={showDone}
      >
        All
      </Button>
    </ButtonGroup>
  );
}

function Timer(props: { record: Record }) {
  const { record } = props;

  const [sec, setSec] = useState(-1);
  useEffect(() => {
    if (record.status === "running") {
      const periodSec = Math.floor(
        (new Date().getTime() - record.startAt) / 1000
      );
      const timerID = delay(setSec, 1000, periodSec);
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

function TodoBtnGroup(props: {
  todo: Todo;
  record: Record;
  onStart: () => void;
  onStop: () => void;
  onDelete: () => void;
  onToggleDone: () => void;
}) {
  const { todo, record, onStart, onStop, onDelete, onToggleDone } = props;
  const enableStartStopByTodo: TodoStatus[] = ["standby", "doing"];
  const enableStartStopByRecord =
    record.status === "standby" ||
    (record.status === "running" && record.todoID === todo.info.id);

  const StartBtn = (
    <Button variant="secondary" onClick={onStart}>
      Start
    </Button>
  );

  const StopBtn = (
    <Button variant="outline-secondary" onClick={onStop}>
      Stop
    </Button>
  );

  const StartStop = todo.status === "standby" ? StartBtn : StopBtn;

  const CloseBtn = (
    <Button variant="info" onClick={onToggleDone}>
      Close
    </Button>
  );

  const OpenBtn = (
    <Button variant="outline-info" onClick={onToggleDone}>
      Open
    </Button>
  );

  const CloseOpenBtn = todo.status === "done" ? OpenBtn : CloseBtn;

  const DeleteBtn = (
    <Button variant="danger" onClick={onDelete}>
      Delete
    </Button>
  );

  const enableCloseOpenByTodo: TodoStatus[] = ["standby", "done"];
  const enableCloseOpenByRecord =
    record.status === "standby" ||
    (record.status === "running" && record.todoID !== todo.info.id);
  return (
    <ButtonGroup>
      {enableStartStopByTodo.includes(todo.status) &&
        enableStartStopByRecord &&
        StartStop}
      {enableCloseOpenByTodo.includes(todo.status) &&
        enableCloseOpenByRecord &&
        CloseOpenBtn}
      {enableCloseOpenByTodo.includes(todo.status) &&
        enableCloseOpenByRecord &&
        DeleteBtn}
    </ButtonGroup>
  );
}

function TodoCard(props: {
  todo: Todo;
  btnGroup: JSX.Element;
  Timer?: JSX.Element;
}) {
  const {
    todo,
    btnGroup,

    Timer,
  } = props;

  return (
    <Card>
      <Card.Header>{moment(todo.info.createdAt).fromNow()}</Card.Header>
      <Card.Body>
        <Card.Title
          style={{
            textDecoration: todo.status === "done" ? "line-through" : "",
          }}
        >
          {todo.title}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {todo.totalSec > 0 && (
            <Card.Text>
              Already done for{" "}
              {moment.duration(todo.totalSec, "seconds").humanize()}
            </Card.Text>
          )}
        </Card.Subtitle>
        {Timer}

        {btnGroup}
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
  readonly info: {
    readonly uid: string;
    readonly id: string;
    readonly createdAt: number;
  };
  status: TodoStatus;
  // {
  //   isRunning: boolean;
  //   isDone: boolean;
  //   isDeleted: boolean;
  // };
  title: string;
  totalSec: number;
  records: { startAt: number; endAt: number; recordID: string }[];
};
type TodoStatus = "standby" | "doing" | "done" | "deleted";
type TodoAction =
  | CreateTodo
  | ToggleDoneTodo
  | AppendRecordForTodo
  | DeleteTodo
  | StartTodo;
type CreateTodo = {
  type: "Create";
  payload: Todo;
};
type StartTodo = {
  type: "StartTodo";
  payload: { id: string };
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
    info: {
      uid,
      id: generateID("todo"),
      createdAt: new Date().getTime(),
    },
    title,
    status: "standby",
    totalSec: 0,
    records: [],
  },
});

const startTodo = (id: string): TodoAction => ({
  type: "StartTodo",
  payload: { id },
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
    case "StartTodo":
      return produce(state, (draft) => {
        const index = draft.findIndex((d) => d.info.id === action.payload.id);
        if (index > -1) {
          draft[index].status = "doing";
        }
      });
    case "ToggleDone":
      return produce(state, (draft) => {
        const index = draft.findIndex((d) => d.info.id === action.payload.id);
        if (index > -1) {
          // switch between 'done' and 'standby
          draft[index].status =
            draft[index].status === "done" ? "standby" : "done";
        }
      });
    case "DeleteTodo":
      return produce(state, (draft) => {
        const index = draft.findIndex((d) => d.info.id === action.payload.id);
        console.log(index);
        if (index > -1) {
          draft[index].status = "deleted";
        }
      });
    case "AppedRecordForTodo":
      return produce(state, (draft) => {
        const index = draft.findIndex((d) => d.info.id === action.payload.id);
        if (index > -1) {
          const { recordID, startAt, endAt } = action.payload;
          draft[index].records.push({ recordID, startAt, endAt });
          draft[index].totalSec += (endAt - startAt) / 1000;
          draft[index].status = "standby";
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
  status: RecordStatus;
  startAt: number;
  endAt: number | null;
};
type RecordStatus = "standby" | "running";
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
