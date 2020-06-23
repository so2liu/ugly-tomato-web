import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import ControlNavbar from "../containers/ControlNavbar";
import { useSyncUser } from "../hooks/firebase";

function AppHeader() {
  const user = useSelector((state: RootState) => state.user);
  useSyncUser(user.uid);
  return (
    <div
      style={{
        paddingLeft: "5%",
        paddingRight: "5%",
        margin: 0,
        width: "100%",
        backgroundColor: "lightgrey",
      }}
    >
      <ControlNavbar />
    </div>
  );
}

export default AppHeader;
