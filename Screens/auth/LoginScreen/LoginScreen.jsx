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
import { styles } from "./LoginScreen.styled";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function LoginScreen({ initialState, navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const keyboardHide = () => {
    setIsShowKeyboard();
    Keyboard.dismiss();
    console.log(state);
  };
  const showPassword = () => {
    setIsHidden(!isHidden);
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {/* <KeyboardAvoidingView
        behavvior={Platform.OS === "ios" ? "padding" : "height"}
        // style={{ width: "100%" }}
      > */}
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
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
          <KeyboardAvoidingView
            behavvior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ width: "100%" }}
          >
            <View style={styles.formContainer}>
              <View style={styles.form}>
                <Text style={styles.header}>Login</Text>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder={"Email address"}
                    onFocus={() => {
                      setIsShowKeyboard(true);
                    }}
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
                  <TouchableOpacity activeOpacity={0.7} onPress={keyboardHide}>
                    <Text style={styles.buttonText}> Sing In</Text>
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
                          navigation.navigate("RegScreen");
                        }}
                      >
                        Sing Up
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
