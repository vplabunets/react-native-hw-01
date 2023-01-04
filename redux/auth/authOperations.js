import firebase from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ login, email, password, userPic }) =>
  async (dispatch, getState) => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      const user = await firebase.auth().currentUser;
      const { displayName, uid, photoURL } = await firebase.auth().currentUser;
      if (userPic) {
        const response = await fetch(userPic);
        const file = await response.blob();
        await firebase.storage().ref(`userPic/${uid}`).put(file);
        const userPhoto = await firebase
          .storage()
          .ref("userPic")
          .child(uid)
          .getDownloadURL();

        await user.updateProfile({
          displayName: login,
          email,
          photoURL: userPhoto,
        });
      }

      const userUpdateProfile = {
        userId: uid,
        login: displayName,
        email: photoURL,
      };
      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await firebase.auth().signOut();
  dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  await firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        login: user.displayName,
        userId: user.uid,
        email: user.email,
        userPic: user.photoURL,
      };
      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};
