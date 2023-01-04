import React from "react";
import { TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { Feather } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { authSignOutUser } from "../../../redux/auth/authOperations";

import { DefaultScreen } from "../../nestedScreens/DefaultScreen";
import { CommentsScreen } from "../../nestedScreens/CommentsScreen";
import { MapScreen } from "../../nestedScreens/MapScreen";

const NestedScreen = createNativeStackNavigator();

export const PostsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };
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
              onPress={signOut}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        options={{ headerShown: true }}
        name="Comments"
        component={CommentsScreen}
        title="Comments"
      />
      <NestedScreen.Screen
        options={{ headerShown: true }}
        name="Map"
        component={MapScreen}
      />
    </NestedScreen.Navigator>
  );
};
