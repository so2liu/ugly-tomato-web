import React, { useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../API/firebase";
import { setUser } from "../actions/user";
import { User } from "../reducers/user.type";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "redirect",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/",
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

interface Login {
  user: User;
  onSetUser: typeof setUser;
}
function Login(props: Login) {
  const { user, onSetUser } = props;

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        onSetUser(
          firebaseUser.uid,
          firebaseUser.displayName ?? null,
          firebaseUser.photoURL ?? null,
          !firebaseUser.isAnonymous
        );
      }
    });
    return () => {
      unsubscribe();
    };
  }, [onSetUser]);

  return (
    <>
      {user.isSignedIn ? (
        <></>
      ) : (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </>
  );
}

export default Login;
