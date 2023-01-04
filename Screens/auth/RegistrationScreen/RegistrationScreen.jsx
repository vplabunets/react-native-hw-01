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
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { useDispatch } from "react-redux";

import { AntDesign } from "@expo/vector-icons";
import { authSignUpUser } from "../../../redux/auth/authOperations";

import { styles } from "./RegistrationScreen.styled";

const initialState = {
  login: "",
  email: "",
  password: "",
  userPic: "",
};
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function RegistrationScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [isHidden, setIsHidden] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const dispatch = useDispatch();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setState((prevState) => ({
        ...prevState,
        userPic: result.assets[0].uri,
      }));
    }
  };

  const deleteImage = () => {
    setState((prevState) => ({
      ...prevState,
      userPic: result.assets[0].uri,
    }));
  };

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
    setIsFocused(false);
  };

  const showPassword = () => {
    setIsHidden(!isHidden);
  };

  const handleSubmit = () => {
    if (!state.login || !state.email || !state.password) return;
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialState);
    dispatch(authSignUpUser(state));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
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
            style={{ width: "100%" }}
            // behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.formContainer}>
              {state.userPic ? (
                <View style={styles.photoWrap}>
                  <Image
                    source={{ uri: state.userPic }}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                      borderRadius: 16,
                    }}
                  />
                  <View style={styles.addPhotoBtn}>
                    <TouchableOpacity onPress={deleteImage}>
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
                    <TouchableOpacity onPress={pickImage}>
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
                }}
              >
                <Text style={styles.header}>Registration</Text>
                <View>
                  <TextInput
                    style={styles.input}
                    placeholder={"Login"}
                    value={state.login}
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
                      value={state.password}
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
                  <TouchableOpacity activeOpacity={0.7} onPress={handleSubmit}>
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
      </View>
    </TouchableWithoutFeedback>
  );
}
