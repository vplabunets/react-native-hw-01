import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
export function LoginScreen({ initialState }) {
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
    <KeyboardAvoidingView
      // behavvior={Platform.OS === "ios" ? "padding" : "height"}
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
                  setState((prevState) => ({ ...prevState, password: value }))
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
                    navigation.navigate("SignUp");
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
  );
}

const styles = StyleSheet.create({
  formContainer: {
    position: "relative",
  },

  form: {
    justifyContent: "flex-start",
    marginTop: 263,
    paddingHorizontal: 16,
    height: 548,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  header: {
    marginTop: 32,
    marginBottom: 33,
    fontSize: 30,
    textAlign: "center",
    background: "#212121",
  },
  inputTitle: {
    color: "#BDBDBD",
  },
  input: {
    position: "relative",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    height: 50,
    fontSize: 16,
    marginBottom: 16,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  passwordInputWrap: {
    position: "relative",
  },
  showPasswordBtn: {
    position: "absolute",
    right: 16,
    bottom: 32,
    fontSize: 16,
    color: "#1B4371",
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
