import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  formContainer: {
    position: "relative",
    width: "100%",
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