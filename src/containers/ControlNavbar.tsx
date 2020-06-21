import { RootState } from "../reducers";
import { clearUser } from "../actions/user";
import { connect } from "react-redux";
import TopNavbar from "../components/TopNavbar";

export const mapState = (state: RootState) => ({
  user: state.user,
});

export const mapDispatch = {
  onClearUser: clearUser,
};

const ControlNavbar = connect(mapState, mapDispatch)(TopNavbar);

export default ControlNavbar;
