import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  login: null,
  stateChange: false,
  email: null,
  userPic: null,
};

const actions = {
  updateUserProfile: (state, { payload }) => ({
    ...state,
    userId: payload.userId,
    login: payload.login,
    email: payload.email,
    userPic: payload.userPic,
  }),
  authStateChange: (state, { payload }) => ({
    ...state,
    stateChange: payload.stateChange,
  }),
  authSignOut: () => state,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: actions,
});
