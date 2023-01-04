import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export const MapScreen = ({ route }) => {
  console.log("route.params.location", route.params.location);
  const { longitude, latitude } = route.params.location;
  return (
    <View style={styles.container}>
      <MapView
        style={{
          flex: 1,
        }}
        initialRegion={{
          longitude,
          latitude,
          longitudeDelta: 0.1,
          latitudeDelta: 0.1,
        }}
      >
        <Marker coordinate={{ longitude, latitude }} title="Wow photo" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
  },
});
