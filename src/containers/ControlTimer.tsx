import { connect } from "react-redux";
import { RootState } from "../reducers";
import TimerCard from "../components/TimerCard";
import { stopTimerAsync } from "../actions/timer";

const mapState = (state: RootState) => ({
  timer: state.timer,
});

const mapDispatch = {
  onStopTimer: stopTimerAsync,
};

const ControlTimer = connect(mapState, mapDispatch)(TimerCard);

export default ControlTimer;
