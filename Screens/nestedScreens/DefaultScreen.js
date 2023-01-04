import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import db from "../../firebase/config";
import { Feather } from "@expo/vector-icons";

export const DefaultScreen = ({ navigation, route }) => {
  const [post, setPost] = useState([]);
  const { login, email, userPic } = useSelector((state) => state.auth);
  const [allComments, setAllComments] = useState([]);

  const getAllPosts = async () => {
    try {
      await db
        .firestore()
        .collection("posts")
        .onSnapshot((data) =>
          setPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );
    } catch (error) {
      console.error("getAllPosts", error);
    }
  };

  const getAllComments = async () => {
    await firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPosts();
    getAllComments();
  }, []);

  const addLike = async (item) => {
    let like = item.like ? item.like + 1 : 0 + 1;
    await db
      .firestore()
      .collection("posts")
      .doc(item.id)
      .set({ ...item, like });
  };

  // console.log("post", post);
  return (
    <View style={styles.container}>
      <View style={styles.userPhotoWrap}>
        <Image source={{ uri: userPic }} style={{ ...styles.userPhoto }} />
        <View style={styles.userDetails}>
          <View>
            <Text style={styles.userName}>{login}</Text>
          </View>
          <View>
            <Text style={styles.userEmail}>{email}</Text>
          </View>
        </View>
      </View>
      <FlatList
        data={post}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.postPhoto}>
              <Image source={{ uri: item.photo }} style={styles.image} />
              <Text
                style={{ fontSize: 16, fontWeight: "500", marginBottom: 11 }}
              >
                {item.photoName}
              </Text>
              <View style={styles.photoActionsContainer}>
                <View style={styles.photoCommentsAndLikesContainer}>
                  <View style={styles.photoCommentsContainer}>
                    <TouchableOpacity
                      style={{ marginRight: 9 }}
                      onPress={() =>
                        navigation.navigate("Comments", {
                          postId: item.id,
                          uri: item.photo,
                        })
                      }
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color={item.amount ? "#FF6C00" : "#BDBDBD"}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 16,
                        marginLeft: 9,
                        textAlignVertical: "center",
                        color: item.amount ? "#212121" : "#BDBDBD",
                      }}
                    >
                      {item.amount ? item.amount : 0}
                    </Text>
                  </View>
                  <View style={styles.photoCommentsContainer}>
                    <TouchableOpacity onPress={() => addLike(item)}>
                      <Feather
                        name="thumbs-up"
                        size={24}
                        color={item.like ? "#FF6C00" : "#BDBDBD"}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 16,
                        marginLeft: 9,
                        textAlignVertical: "center",
                        color: item.like ? "#212121" : "#BDBDBD",
                      }}
                    >
                      {item.like ? item.like : 0}
                    </Text>
                  </View>
                </View>

                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{ marginRight: 13 }}
                    onPress={() =>
                      navigation.navigate("Map", {
                        location: item.location,
                      })
                    }
                  >
                    <Feather name="map-pin" size={24} color="#DADADA" />
                  </TouchableOpacity>
                  <Text style={{ fontSize: 16 }}>{item.photoPlace}</Text>
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
    border: 1,
    borderColor: "red",
    borderRadius: 16,
    marginRight: 8,
    border: 2,
    backgroundColor: "#FFFFFF",
  },
  userDetails: {
    // alignItems: "center",
  },
  userName: { fontWeight: "bold" },
  userEmail: {
    fontSize: 11,
  },
  image: { height: 240, borderRadius: 8, marginBottom: 8 },
  postPhoto: {
    flexDirection: "column",
    border: 1,
    borderColor: "red",
    borderRadius: 8,
    marginBottom: 32,
  },
  photoActionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  photoCommentsAndLikesContainer: {
    display: "flex",
    flexDirection: "row",
    marginRight: 27,
  },
  photoCommentsContainer: {
    marginBottom: 11,
    display: "flex",
    flexDirection: "row",
    marginRight: 27,
  },
});
