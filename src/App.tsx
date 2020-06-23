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
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import SettingPage from "./pages/SettingPage";
import RecordPage from "./pages/RecordPage";

function App() {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  return (
    <Router>
      <Provider store={store}>
        <AppHeader />
        <Container style={{ marginBottom: "5%" }}>
          <ControlLogin />
          <Switch>
            <Route path="/tasks" component={TaskPage} />
            <Route path="/records" component={RecordPage} />
            <Route path="/settings">
              <SettingPage />
            </Route>
            <Redirect from="/" exact to="/tasks" />
          </Switch>
        </Container>
      </Provider>
    </Router>
  );
}

export default App;
