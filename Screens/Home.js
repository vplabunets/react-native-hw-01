import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Feather } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

import { PostsScreen } from "./mainScreen/PostsScreen/PostsScreen";
import { CreateScreen } from "./mainScreen/CreateScreen/CreateScreen";
import { ProfileScreen } from "./mainScreen/ProfileScreen/ProfileScreen";
export const Home = ({ navigation }) => {
  return (
    <MainTab.Navigator
      initialRouteName="PostsScreen"
      screenOptions={{
        headerTitleAlign: "center",
        tabBarActiveTintColor: "#ffffff",
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarInactiveTintColor: "#212121CC",
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 9,
          paddingHorizontal: 63,
          paddingBottom: 50,
        },
      }}
    >
      <MainTab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerTitleAlign: "center",
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => (
            <TouchableOpacity>
              <Feather
                name="grid"
                size={size}
                color={color}
                focused={focused}
              />
            </TouchableOpacity>
          ),

          tabBarItemStyle: {
            marginRight: 15,
            width: 70,
            height: 40,
            borderRadius: 20,
          },
        }}
      />
      <MainTab.Screen
        name="Create post"
        component={CreateScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused, size, color }) => (
            <TouchableOpacity>
              <Entypo name="plus" size={size} color={color} focused={focused} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16, marginBottom: 10 }}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("PostsScreen")}
            >
              <Feather name="arrow-left" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),

          tabBarItemStyle: {
            marginRight: 15,
            width: 70,
            height: 40,

            borderRadius: 20,
          },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitleAlign: "center",
          tabBarIconStyle: { color: "red" },
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} focused={focused} />
          ),
          headerShown: false,
          tabBarItemStyle: {
            width: 70,
            height: 40,
            borderRadius: 20,
          },
        }}
      />
    </MainTab.Navigator>
  );
};
