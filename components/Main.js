import React, { useEffect, useState } from "react";

import {} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import firebase from "../firebase/config";

import { useRoute } from "../router";
import { authStateChangeUser } from "../redux/auth/authOperations";

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  const rounting = useRoute(stateChange);

  return <NavigationContainer>{rounting}</NavigationContainer>;
};
