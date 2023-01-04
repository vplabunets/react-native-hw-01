import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
  Keyboard,
} from "react-native";
import { useSelector } from "react-redux";

import firebase from "../../firebase/config";

import { AntDesign } from "@expo/vector-icons";

export const CommentsScreen = ({ route }) => {
  const { postId, uri } = route.params;
  const { login, userPic } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const item = route.params.item;
  useEffect(() => {
    getAllComments();
  }, []);

  const cleanInput = () => {
    setComment("");
  };

  const createComment = async () => {
    const currentDate = new Date().toLocaleString();
    Keyboard.dismiss();
    try {
      await firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .add({ comment, login, currentDate, userPic });

      await firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .set({ ...item, amount: allComments.length + 1 });
    } catch (error) {
      console.error("createComment", error);
    } finally {
    }
    await cleanInput();
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

  return (
    <View style={styles.container}>
      <View style={{}}>
        <Image
          source={{ uri }}
          style={{ height: 240, borderRadius: 8, marginBottom: 8 }}
        />
      </View>
      <SafeAreaView style={{ ...styles.container, paddingHorizontal: 0 }}>
        <FlatList
          style={{ width: "100%" }}
          data={allComments}
          renderItem={({ item }) => (
            <View
              style={{
                ...styles.commentContainer,
                display: "flex",
                flexDirection: "row",
                marginLeft: 0,
                marginBottom: 24,
              }}
            >
              <View
                style={{
                  width: 28,
                  height: 28,
                  // borderWidth: 2,
                  borderRadius: 28,
                  marginEnd: 16,
                  // backgroundColor: "rgba(0, 0, 0, 0.03)",
                }}
              >
                <Image
                  source={{ uri: item.userPic }}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 28,
                    marginEnd: 16,
                  }}
                />
              </View>
              <View
                style={{
                  height: "100%",
                  width: 330,
                  padding: 16,
                  borderBottomLeftRadius: 6,
                  borderBottomEndRadius: 6,
                  borderTopRightRadius: 6,
                  backgroundColor: "rgba(0, 0, 0, 0.03)",
                }}
              >
                <Text>{item.comment}</Text>
                <Text style={{ fontSize: 10, textAlign: "right" }}>
                  {item.currentDate}
                </Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={"Comment"}
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity
          style={styles.sendCommentButton}
          onPress={createComment}
        >
          <AntDesign name="arrowup" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  commentContainer: {
    // borderColor: "red",
    // borderWidth: 1,
  },
  input: {
    color: "#BDBDBD",
    width: "100%",
    padding: 16,
    marginTop: 32,
    borderRadius: 100,
    height: 50,
    fontSize: 16,
    marginBottom: 16,
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
  },
  sendCommentButton: {
    position: "absolute",
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    right: 8,
    top: 40,
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    borderRadius: 34,
  },
});
