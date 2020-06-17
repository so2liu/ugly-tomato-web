import React from "react";
import TaskPage from "./pages/TaskPage";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import WrapJSON from "./components/WrapJSON";

function App() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  return (
    <Provider store={store}>
      <Container>
        <h1>Ugly Tomato for QQ</h1>
        <TaskPage />
      </Container>
    </Provider>
  );
}

export default App;
