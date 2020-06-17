import { UserAction, UserSet, User, UserClear } from "./user.type";

const initUser = (): User => ({
  uid: "placeholder2",
  displayName: "",
  avatar: null,
  isSignedIn: false,
});

const user = (state: User = initUser(), action: UserAction): User => {
  if (action.name !== "user") return state;

  switch (action.type) {
    case UserSet:
      return action.payload;
    case UserClear:
      return initUser();
    default:
      return state;
  }
};

export default user;
