import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";

export const MapScreen = () => (
  <View style={styles.container}>
    <Text>MapScreen</Text>
    {/* <MapView></MapView> */}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
