import { connect } from "react-redux";
import NewTask from "../components/NewTask";
import { createTaskAsync } from "../actions/task";
import { RootState } from "../reducers";

const mapState = (state: RootState) => ({});

const mapDispatch = {
  submitNewTask: createTaskAsync,
};

const ControlNewTask = connect(mapState, mapDispatch)(NewTask);

export default ControlNewTask;
