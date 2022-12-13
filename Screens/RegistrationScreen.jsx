import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

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
          style={{ ...styles.form, marginBottom: isShowKeyboard ? 20 : 30 }}
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
                setState((prevState) => ({ ...prevState, login: value }))
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
                setState((prevState) => ({ ...prevState, email: value }))
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
                    navigation.navigate("Login");
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
  photoWrap: {
    zIndex: 10,
    position: "absolute",
    marginTop: 203,
    marginLeft: 128,
    marginRight: 127,
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

  form: {
    marginTop: 263,
    paddingHorizontal: 16,
    height: 549,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRigthRadius: 25,
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
