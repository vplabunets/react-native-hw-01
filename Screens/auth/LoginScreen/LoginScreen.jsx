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

import { useDispatch } from "react-redux";
import { authSignInUser } from "../../../redux/auth/authOperations";

import { styles } from "./LoginScreen.styled";

const initialState = {
  email: "",
  password: "",
};
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function LoginScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const showPassword = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(authSignInUser(state));
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
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
        <KeyboardAvoidingView style={{ width: "100%" }}>
          <View style={styles.form}>
            <Text style={styles.header}>Login</Text>
            <View>
              <TextInput
                style={styles.input}
                placeholder={"Email address"}
                value={state.email}
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
                  value={state.password}
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
              <TouchableOpacity activeOpacity={0.7} onPress={handleSubmit}>
                <Text style={styles.buttonText}> Sing In</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.toLoginBox}>
              <TouchableOpacity activeOpacity={0.7}>
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
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
