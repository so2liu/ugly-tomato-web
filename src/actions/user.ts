import {
  UserAction,
  UserSet,
  UserClear,
  UserSetting,
  UserSettingChange,
  UserSyncFromServer,
} from "../reducers/user.type";
import { UserSyncType } from "../API/firebase.type";

export const setUser = (
  uid: string,
  displayName: string | null,
  avatar: string | null,
  isSignedIn: boolean
): UserAction => ({
  name: "user",
  type: UserSet,
  shouldToServer: true,
  payload: {
    uid,
    displayName,
    avatar,
    isSignedIn,
  },
});

export const clearUser = (): UserAction => ({
  name: "user",
  type: UserClear,
  shouldToServer: true,
});

export const changeUserSetting = (
  setting: Partial<UserSetting>
): UserAction => ({
  name: "user",
  type: UserSettingChange,
  shouldToServer: true,
  payload: setting,
});

export const syncUserFromServer = (user: UserSyncType): UserAction => ({
  name: "user",
  type: UserSyncFromServer,
  shouldToServer: false,
  payload: user,
});
