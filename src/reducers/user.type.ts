import { UserSyncType } from "../API/firebase.type";

export interface UserBasic {
  uid: string;
  displayName: string | null;
  avatar: string | null;
  isSignedIn: boolean;
}

export interface UserSetting {
  noticeSound?: NoticeSound;
}
export type NoticeSound =
  | null
  | "bullfrog.ogg"
  | "got-it-done.ogg"
  | "horse-whinnies.ogg";

export interface User extends UserBasic {
  settings?: UserSetting;
}

export const UserSet = "set user info";
export const UserClear = "clear user info and set it to init";

interface UserBaseAction {
  name: "user";
  shouldToServer: boolean;
}

interface UserSet extends UserBaseAction {
  type: typeof UserSet;
  payload: UserBasic;
}

interface UserClear extends UserBaseAction {
  type: typeof UserClear;
}

export const UserSettingChange = "change user settings";
interface UserSettingChange extends UserBaseAction {
  type: typeof UserSettingChange;
  payload: Partial<UserSetting>;
}

export const UserSyncFromServer = "sync user from server";
interface UserSyncFromServer extends UserBaseAction {
  type: typeof UserSyncFromServer;
  payload: UserSyncType;
}

export type UserAction =
  | UserSet
  | UserClear
  | UserSettingChange
  | UserSyncFromServer;
