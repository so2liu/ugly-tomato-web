import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import WrapJSON from "./WrapJSON";

function AppHeader() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <>
      <h1>Ugly Tomato for {user.displayName ?? "QiQi"}</h1>
      <WrapJSON json={user} />
    </>
  );
}

export default AppHeader;
