import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

function AppHeader() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <>
      <h1>Ugly Tomato for {user.displayName ?? "QiQi"}</h1>
    </>
  );
}

export default AppHeader;
