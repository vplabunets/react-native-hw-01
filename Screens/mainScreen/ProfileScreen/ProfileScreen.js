import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { authSignOutUser } from "../../../redux/auth/authOperations";
import firebase from "../../../firebase/config";

import { AntDesign, Feather, FontAwesome } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const ProfileScreen = ({ navigation }) => {
  const [isHidden, setIsHidden] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isPhotoAdded, setiIsPhotoAdded] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const dispatch = useDispatch();
  const { userId, login, email, userPic } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPost();
  }, []);
  console.log(userPosts);
  const getUserPost = async () => {
    await firebase
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const showPassword = () => {
    setIsHidden(!isHidden);
  };
  console.log("userPosts", userPosts);
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      {/* // <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}> */}
      <View
        style={{
          flex: 1,
          position: "relative",
        }}
      >
        <View
          style={{
            position: "absolute",
            zIndex: 10,
            width: 120,
            height: 120,
            borderRadius: 16,
            alignSelf: "center",
            marginTop: 87,
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 16,
            }}
            source={{ uri: userPic }}
          />
          <View style={styles.addPhotoBtn}>
            <TouchableOpacity>
              <AntDesign
                name="closecircleo"
                size={25}
                color="#E8E8E8"
                backgroundColor="white"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            zIndex: 3,
            position: "absolute",
            top: 171,
            right: 19,
            color: "#BDBDBD",
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              // marginTop: 24,
              // marginRight: 19,
            }}
            onPress={signOut}
          >
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              // style={{ justifyContent: "flex-end" }}
            />
          </TouchableOpacity>
        </View>

        <Image
          source={require("../../../assets/images/bg.jpg")}
          style={{
            width: windowWidth,
            height: windowHeight,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <View
          style={{
            ...styles.container,
            marginTop: 147,

            borderTopRightRadius: 16,
            borderTopLeftRadius: 16,
          }}
        >
          <View style={{ width: "100%", height: "100%" }}>
            <Text
              style={{
                marginTop: 92,
                fontSize: 30,
                textAlign: "center",
                marginBottom: 33,
              }}
            >
              {login}
            </Text>
            {!userPosts.length ? (
              <Text style={{ textAlign: "center" }}>No posts yet</Text>
            ) : (
              <FlatList
                data={userPosts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.postPhoto}>
                      <View
                        style={{
                          height: 240,
                          width: "100%",
                          borderRadius: 8,
                        }}
                      >
                        <Image
                          source={{ uri: item.photo }}
                          style={{
                            ...styles.image,
                            width: "100%",
                            height: "100%",
                            borderRadius: 8,
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "500",
                          marginBottom: 11,
                        }}
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
                              <FontAwesome
                                name="comment"
                                size={24}
                                color="#FF6C00"
                              />
                            </TouchableOpacity>
                            <Text
                              style={{
                                fontSize: 16,
                                marginLeft: 9,
                                textAlignVertical: "center",
                              }}
                            >
                              0
                            </Text>
                          </View>
                          <View style={styles.photoCommentsContainer}>
                            <Feather
                              name="thumbs-up"
                              size={24}
                              color={item.like ? "#FF6C00" : "#BDBDBD"}
                            />

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
                          <Text style={{ fontSize: 16 }}>
                            {item.photoPlace}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                }}
              />
            )}
            {/* <FlatList
            data={userPosts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
              return (
                <View style={{ ...styles.postPhoto, marginBottom: 32 }}>
                  <Image
                    source={{ uri: item.photo }}
                    style={{ height: 240, borderRadius: 8, marginBottom: 8 }}
                  />
                  <View style={{ marginBottom: 11 }}>
                    <Text style={{ fontSize: 16, fontWeight: "500" }}>
                      {item.photoName}
                    </Text>
                  </View> */}
            {/* <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  > */}
            {/* <TouchableOpacity
                      // style={styles.buttonDelete}
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
                        color="#DADADA"
                      />
                    </TouchableOpacity> */}
            {/* <View
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
                      <Text style={{}}>{item.photoPlace}</Text>
                    </View> */}
            {/* </View> */}
            {/* </View> */}
            {/* ); */}
            {/* }} */}
            {/* /> */}
          </View>
        </View>
      </View>
      {/* // </TouchableWithoutFeedback> */}
    </KeyboardAvoidingView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    paddingHorizontal: 16,
    // marginTop: 150,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },

  photoWrap: {
    zIndex: 10,
    // position: "absolute",
    // marginTop: 59,
    alignSelf: "center",
    width: 120,
    height: 120,
    border: "none",
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    justifyContent: "center",
  },
  addPhotoBtn: {
    position: "absolute",
    right: -12,
    bottom: 26,
    zIndex: 20,
    width: 26,
    height: 26,
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
  },
  profileWrap: {
    marginTop: 147,
    paddingHorizontal: 16,
    height: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  header: {
    marginTop: 92,
    marginBottom: 33,
    fontSize: 30,
    textAlign: "center",
    background: "#212121",
  },
  inputTitle: {
    color: "#BDBDBD",
  },
  button: {
    marginTop: 43,
    height: 50,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    borderColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontFamily: "Roboto",
    color: "#FFFFFF",
    fontSize: 16,
  },
  toLoginBox: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  toLoginText: {
    fontFamily: "Roboto",
    color: "#1B4371",
    fontSize: 16,
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
