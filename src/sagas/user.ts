import { UserAction, User } from "../reducers/user.type";
import { takeEvery, select, call } from "redux-saga/effects";
import { RootState } from "../reducers";
import { setUserOnServer } from "../API/firebase";

function* syncUser(action: UserAction) {
  if (action.name !== "user") return;
  const user: User = yield select((state: RootState) => state.user);
  if (user.isSignedIn && action.shouldToServer) {
    const res = yield call(setUserOnServer, user);
  }
}

export function* watchSyncUser() {
  yield takeEvery("*", syncUser);
}
