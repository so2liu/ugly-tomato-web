import { UserAction, UserSet } from "../reducers/user.type";

export const setUser = (
  uid: string,
  displayName: string | null,
  avatar: string | null,
  isSignedIn: boolean
): UserAction => ({
  name: "user",
  type: UserSet,
  payload: {
    uid,
    displayName,
    avatar,
    isSignedIn,
  },
});
