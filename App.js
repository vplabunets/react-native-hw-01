import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { LoginScreen } from "./Screens/LoginScreen";
import { RegistrationScreen } from "./Screens/RegistrationScreen.jsx";
const isHermes = () => !!global.HermesInternal;

const initialState = {
  login: "",
  email: "",
  password: "",
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function App() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          {/* <ImageBackground
            style={styles.image}
            source={require("./assets/images/bg.jpg")}
          >
            <Text style={{ color: "white" }}>Вона працює</Text>
            <RegistrationScreen initialState={initialState} />

            <LoginScreen initialState={initialState} />
          </ImageBackground> */}
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Image
              source={require("./assets/images/bg.jpg")}
              style={{
                width: windowWidth,
                height: windowHeight,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
            {/* <RegistrationScreen initialState={initialState} /> */}

            <LoginScreen initialState={initialState} />
          </View>

          <StatusBar style="auto" />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "center",
  },
});
