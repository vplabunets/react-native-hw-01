import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { styles } from "./RegistrationScreen.styled";
const initialState = {
  login: "",
  email: "",
  password: "",
};
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function RegistrationScreen({ initialState, navigation }) {
  const [state, setState] = useState(initialState);
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
      {/* <View style={styles.container}> */}
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
        <KeyboardAvoidingView style={{ width: "100%" }}>
          <View style={styles.formContainer}>
            {isPhotoAdded ? (
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
            ) : (
              <View style={styles.photoWrap}>
                <View style={styles.addPhotoBtn}>
                  <TouchableOpacity>
                    <AntDesign
                      name="pluscircleo"
                      size={25}
                      color="#FF6C00"
                      backgroundColor="white"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 20 : 30,
              }}
            >
              <Text style={styles.header}>Registration</Text>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder={"Login"}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      login: value,
                    }))
                  }
                />
              </View>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder={"Email address"}
                  onFocus={() => {
                    setIsShowKeyboard(true);
                  }}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
                />
              </View>
              <View style={styles.passwordInputWrap}>
                <View style={{ marginBottom: 0 }}>
                  <TextInput
                    style={styles.input}
                    placeholder={"Password"}
                    secureTextEntry={isHidden}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                    }}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                  />
                  <TouchableOpacity onPress={showPassword}>
                    <Text style={styles.showPasswordBtn}>
                      {isHidden ? "Show" : "Hide"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.button}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    keyboardHide;
                    navigation.navigate("Home");
                  }}
                >
                  <Text style={styles.buttonText}> Sing up</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.toLoginBox}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => console.log(state)}
                >
                  <Text style={styles.toLoginText}>
                    You already have account{" "}
                    <Text
                      onPress={() => {
                        navigation.navigate("LogScreen");
                      }}
                    >
                      Sing In
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
      {/* </View> */}
    </TouchableWithoutFeedback>
    // </KeyboardAvoidingView>
  );
}
