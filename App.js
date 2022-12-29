import React from "react";

import { AppLoading } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

import { useRoute } from "./router";

// const loadApplication = async  () => {
//   await Font.loadAsync({
//     "DMMono-Regular" : require('./assets/')
//   })
// }
// const isHermes = () => !!global.HermesInternal;
export default function App() {
  const rounting = useRoute(true);
  return <NavigationContainer>{rounting}</NavigationContainer>;
}
