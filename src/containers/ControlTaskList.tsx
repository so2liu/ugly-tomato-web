import { connect } from "react-redux";
import { RootState } from "../reducers";
import TaskList from "../components/TaskList";
import { startTimer } from "../actions/timer";

const mapState = (state: RootState) => ({
  tasks: state.tasks,
});

const mapDispatch = {
  onStartTimer: startTimer,
};

const ControlTaskList = connect(mapState, mapDispatch)(TaskList);

export default ControlTaskList;
