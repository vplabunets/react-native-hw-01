import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  formContainer: {
    position: "relative",
    width: "100%",
  },

  form: {
    justifyContent: "flex-start",
    marginTop: 263,
    paddingHorizontal: 16,
    height: 548,
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: "100%",
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
