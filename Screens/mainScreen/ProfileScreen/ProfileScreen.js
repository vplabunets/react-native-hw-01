import React, { useState } from "react";
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
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export const ProfileScreen = () => {
  const [state, setState] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isPhotoAdded, setiIsPhotoAdded] = useState(false);
  const keyboardHide = () => {
    Keyboard.dismiss();
    console.log(state);
    setIsShowKeyboard(false);
  };

  const showPassword = () => {
    setIsHidden(!isHidden);
  };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={styles.container}
    // >
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View
      // style={{
      //   flex: 1,
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
      >
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
        <View style={styles.photoWrap}>
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
            ...styles.profileWrap,
            marginBottom: isShowKeyboard ? 20 : 30,
            display: "flex",
            color: "#BDBDBD",
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              marginTop: 24,
              marginRight: 19,
            }}
            onPress={{}}
          >
            <Feather
              name="log-out"
              size={24}
              color="#BDBDBD"
              tyle={{ justifyContent: "flex-end" }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },

  photoWrap: {
    zIndex: 10,
    position: "absolute",
    marginTop: 87,
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
});
