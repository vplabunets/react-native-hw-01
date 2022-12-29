import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";

export const DefaultScreen = ({ navigation, route, xxx }) => {
  console.log("route in DefaultScreen", route.params);
  const [posts, setPosts] = useState("");

  useEffect(() => {
    if (route.params) setPosts((prevState) => [...prevState, route.params]);
  }, [route.params]);

  console.log("posts", posts);
  return (
    // <View style={styles.container}>
    <FlatList
      data={posts}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 10 }}>
          <Image
            source={{ uri: item.photo }}
            style={{ width: 350, height: 200 }}
          />
        </View>
      )}
    />
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "green",

    justifyContent: "center",
    // alignItems: "center",
  },
});
