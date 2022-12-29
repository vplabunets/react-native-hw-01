import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import { AntDesign, Feather } from "@expo/vector-icons";

export const CreateScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isPhotoAdded, setiIsPhotoAdded] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState(null);
  const [photoPlace, setPhotoPlace] = useState(null);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  const keyboardHide = () => {
    Keyboard.dismiss();
    // console.log(state);
    setIsShowKeyboard(false);
  };

  const takePhoto = async () => {
    let photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    const location = await Location.getCurrentPositionAsync();
    setLocation(location.coords);
    // console.log("photo/uri", photo.uri);
    // console.log("location", location.coords);
  };

  const sendPhoto = async () => {
    // console.log(navigation);
    navigation.navigate("PostsScreen", {
      screen: "Posts",
      params: { photo, photoName, photoPlace, location },
    });

    // navigation.navigate("DefaultScreen", { photo });
  };

  const deletePost = () => {
    setPhotoName("");
    setPhotoPlace("");
    setPhoto(null);
    setLocation("");
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.form,
          marginBottom: isShowKeyboard ? 20 : 30,
        }}
      >
        <View style={styles.photoWrap}>
          <Camera ref={setCamera} style={styles.camera}>
            {photo && (
              <View style={styles.takePhotoContainer}>
                <Image
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  source={{ uri: photo }}
                />
              </View>
            )}
            <TouchableOpacity
              style={styles.addPhotoIcon}
              onPress={() => takePhoto()}
            >
              <AntDesign name="camera" size={24} color="#F6F6F6" />
            </TouchableOpacity>
          </Camera>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => console.log(state)}
          >
            <Text
              style={styles.addPhotoBtn}
              onPress={() => {
                console.log("Add photo");
              }}
            >
              Add Photo
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder={"Name"}
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
            onChangeText={(value) => setPhotoName(value)}
          />
        </View>
        <View style={styles.passwordInputWrap}>
          <View style={{ marginBottom: 0 }}>
            <TextInput
              style={styles.input}
              placeholder={"Location"}
              onFocus={() => {
                setIsShowKeyboard(true);
              }}
              onChangeText={(value) => setPhotoPlace(value)}
            />
          </View>
        </View>
        <View
          style={{
            ...styles.button,
            backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
          }}
        >
          <TouchableOpacity activeOpacity={0.7} onPress={sendPhoto}>
            <Text
              style={{
                ...styles.buttonText,
                color: photo ? "#FFFFFF" : "#BDBDBD",
              }}
            >
              Publish
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonDelete} onPress={deletePost}>
          <Feather name="trash-2" size={24} color="#DADADA" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    heigth: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "#F6F6F6",
    borderTopWidth: 1,
  },
  form: {
    height: 724,
    width: 375,
    paddingHorizontal: 16,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  photoWrap: {
    marginTop: 32,
    width: 343,
  },
  camera: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E8E8E8 ",
    borderRadius: 8,
    height: 230,
  },
  addPhotoIcon: {
    zIndex: 100,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  addPhotoBtn: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderWidth: 4,
    borderColor: "#F6F6F6",
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },

  input: {
    color: "#BDBDBD",
    position: "relative",
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    height: 50,
    fontSize: 16,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  passwordInputWrap: {
    position: "relative",
  },

  button: {
    marginTop: 43,
    height: 50,
    borderWidth: 0,
    borderRadius: 100,

    borderColor: "red",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 120,
  },
  buttonText: {
    fontFamily: "Roboto",

    fontSize: 16,
  },
  buttonDelete: {
    width: 70,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
});
