import {
  UserAction,
  UserSet,
  User,
  UserClear,
  UserSettingChange,
  UserSyncFromServer,
  UserSetting,
} from "./user.type";
import produce from "immer";

export const initUser = (): User => {
  const init: User = {
    uid: "placeholder2",
    displayName: null,
    avatar: null,
    isSignedIn: false,
  };
  const localSettings = window.localStorage.getItem("userSettings");
  if (localSettings) init.settings = JSON.parse(localSettings);
  return init;
};

const user = (state: User = initUser(), action: UserAction): User => {
  if (action.name !== "user") return state;

  switch (action.type) {
    case UserSet:
      return action.payload;
    case UserSyncFromServer:
      return action.payload;
    case UserClear:
      return initUser();
    case UserSettingChange:
      return produce(state, (draft) => {
        draft.settings = { ...draft.settings, ...action.payload };
      });
    default:
      return state;
  }
};

export default user;
