import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const NestedScreen = createNativeStackNavigator();

import { DefaultScreen } from "../../nestedScreens/DefaultScreen";
import { CommentsScreen } from "../../nestedScreens/CommentsScreen";
import { MapScreen } from "../../nestedScreens/MapScreen";

export const PostsScreen = ({ navigation, route }) => {
  console.log("route in PostsScreen", route.params);

  return (
    <NestedScreen.Navigator
      initialRouteName="Posts"
      screenOptions={{
        headerTitleAlign: "center",
      }}
    >
      <NestedScreen.Screen
        name="Posts"
        title="Posts"
        component={DefaultScreen}
        options={{
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10, marginBottom: 10 }}
              activeOpacity={0.7}
              // onPress={signOut}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        options={{ headerShown: true }}
        name="CommentsScreen"
        component={CommentsScreen}
        title="Comments"
      />
      <NestedScreen.Screen
        options={{ headerShown: false }}
        name="MapScreen"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",

    justifyContent: "center",
    alignItems: "center",
  },
});
