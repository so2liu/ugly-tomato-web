import { connect } from "react-redux";
import { RootState } from "../reducers";
import TaskList from "../components/TaskList";
import { startTimer } from "../actions/timer";
import { doneTaskAsync, deleteTaskAsync } from "../actions/task";

const mapState = (state: RootState) => ({
  tasks: state.tasks,
});

const mapDispatch = {
  onStartTimer: startTimer,
  onFinishTask: doneTaskAsync,
  onDeleteTask: deleteTaskAsync,
};

const ControlTaskList = connect(mapState, mapDispatch)(TaskList);

export default ControlTaskList;
