export interface User {
  uid: string;
  displayName: string | null;
  avatar: string | null;
  isSignedIn: boolean;
}

export const UserSet = "set user info";
export const UserClear = "clear user info and set it to init";

interface UserSet {
  name: "user";
  type: typeof UserSet;
  payload: User;
}

interface UserClear {
  name: "user";
  type: typeof UserClear;
}

export type UserAction = UserSet | UserClear;
