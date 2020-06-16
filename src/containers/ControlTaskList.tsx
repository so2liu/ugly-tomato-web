import { connect } from "react-redux";
import { RootState } from "../reducers";
import { createTaskAsync } from "../actions/task";
import TaskList from "../components/TaskList";

const mapState = (state: RootState) => ({
  tasks: state.tasks,
});

const mapDispatch = {
  onCreateTask: createTaskAsync,
};

const ControlTaskList = connect(mapState, mapDispatch)(TaskList);

export default ControlTaskList;
