import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { registerAsset } from "react-native-web/dist/cjs/modules/AssetRegistry";
import { Entypo, Feather } from "@expo/vector-icons";
export const DefaultScreen = ({ navigation, route, xxx }) => {
  console.log("route in DefaultScreen", route.params);
  const [posts, setPosts] = useState("");

  useEffect(() => {
    if (route.params) setPosts((prevState) => [...prevState, route.params]);
  }, [route.params]);

  console.log("posts", posts);
  return (
    <View style={styles.container}>
      <View style={styles.userPhotoWrap}>
        <Image style={styles.userPhoto} />
        <View style={styles.userDetails}>
          <View style={{ fontWeight: "bald" }}>
            <Text style={styles.userName}>xxx yyy</Text>
          </View>
          <View>
            <Text style={styles.userEmail}>xxx@mail.com</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          console.log(item);
          return (
            <View style={{ ...styles.postPhoto, marginBottom: 32 }}>
              <Image
                source={{ uri: item.photo }}
                style={{ height: 240, borderRadius: 8, marginBottom: 8 }}
              />
              <View style={{ marginBottom: 11 }}>
                <Text style={{}}>{item.photoName}</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                // style={styles.buttonDelete}
                // onPress={deletePost}
                >
                  <Feather name="message-circle" size={24} color="#DADADA" />
                </TouchableOpacity>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{ marginRight: 13 }}
                    // onPress={deletePost}
                  >
                    <Feather name="map-pin" size={24} color="#DADADA" />
                  </TouchableOpacity>
                  <Text style={{}}>{item.photoPlace}</Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    // backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 16,

    // alignItems: "center",
  },
  userPhotoWrap: {
    marginTop: 32,
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 16,
    marginRight: 8,
  },
  userDetails: {
    // alignItems: "center",
  },
  userName: { fontWeight: "bold" },
  userEmail: {
    fontSize: 11,
  },
  postPhoto: {
    flexDirection: "column",
    border: 1,
    borderColor: "red",
    borderRadius: 8,
  },
});
