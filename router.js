import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createNativeStackNavigator();

import { LoginScreen } from "./Screens/auth/LoginScreen/LoginScreen";
import { RegistrationScreen } from "./Screens/auth/RegistrationScreen/RegistrationScreen";
import { Home } from "./Screens/Home";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="LoginScreen">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="RegScreen"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="LogScreen"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <AuthStack.Navigator initialRouteName="LoginScreen">
      <AuthStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
    </AuthStack.Navigator>
  );
};

import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    backgroundColor: "black",
    margin: 0,
    padding: 0,
  },
});
