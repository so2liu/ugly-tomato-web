import React from "react";
import { User } from "../reducers/user.type";
import { mapDispatch, mapState } from "../containers/ControlNavbar";
import { type } from "os";
import { Button, Container, Row, Col } from "react-bootstrap";
import firebase from "../API/firebase";
import { NavLink } from "react-router-dom";

type TopNavbar = typeof mapDispatch & ReturnType<typeof mapState>;

function TopNavbar(props: TopNavbar) {
  const { user, onClearUser } = props;

  function handleLogout(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    onClearUser();
    firebase.auth().signOut();
  }

  const LogoutBtn = (
    <Button onClick={handleLogout} variant="outline-dark">
      Logout
    </Button>
  );

  const navActiveStyle: React.CSSProperties = {
    color: "black",
    fontWeight: "bold",
  };

  return (
    <Container>
      <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
        <h1>Ugly Tomato for {user.displayName ?? "QiQi"}</h1>
        <NavLink to="/tasks" activeStyle={navActiveStyle}>
          Task
        </NavLink>
        <NavLink to="/settings" activeStyle={navActiveStyle}>
          Setting
        </NavLink>
        {LogoutBtn}
      </Row>
    </Container>
  );
}
export default TopNavbar;
