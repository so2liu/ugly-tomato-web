import React from "react";
import TaskPage from "./pages/TaskPage";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import ControlLogin from "./containers/ControlLogin";
import AppHeader from "./components/AppHeader";

function App() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  return (
    <Provider store={store}>
      <Container style={{ marginBottom: "5%" }}>
        <AppHeader />
        <ControlLogin />
        <TaskPage />
      </Container>
    </Provider>
  );
}

export default App;
