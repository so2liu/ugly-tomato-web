import { RootState } from "../reducers";

import { connect } from "react-redux";
import Login from "../components/Login";
import { setUser } from "../actions/user";

const mapState = (state: RootState) => ({
  user: state.user,
});

const mapDispatch = {
  onSetUser: setUser,
};

const ControlLogin = connect(mapState, mapDispatch)(Login);

export default ControlLogin;
