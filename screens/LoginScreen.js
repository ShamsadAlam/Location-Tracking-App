import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "react-native";
import { BASE_URL } from "../config";
import axios from "axios";

const LoginScreen = ({ navigation }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const Login = async () => {
    console.log("login: ", Email, Password);
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
        email: Email,
        password: Password,
      });

      if (response) {
        alert("Yay, you logged in 😊😊!!");
        console.log("res: ", response);
        navigation.navigate("Profile", {
          token: response.data.token,
        });
      } else {
        console.error("Error creating account:");
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/background.png")}
        style={{ height: "40%" }}
      />
      <ScrollView style={styles.signup}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              padding: 8,
              fontSize: 22,
              fontWeight: "800",
              paddingLeft: "5%",
              marginTop: "6%",
            }}
          >
            Login
          </Text>

          <Image
            source={require("../assets/images/user3.png")}
            style={{ marginTop: "6%", marginRight: "5%" }}
          />
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "5%",
            marginTop: "2%",
          }}
        >
          <View style={{ marginLeft: "2%" }}></View>
        </View>
        <KeyboardAvoidingView style={{ marginTop: "5%" }}>
          <TextInput
            placeholder="Email"
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            style={styles.textInput}
            value={Email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            style={styles.textInput}
            value={Password}
            onChangeText={(text) => setPassword(text)}
          />
        </KeyboardAvoidingView>
        <Pressable style={styles.button} onPress={Login}>
          <Text
            style={{
              color: "#fff",
              fontWeight: "600",
              padding: 20,
              fontSize: 16,
            }}
          >
            Login
          </Text>
        </Pressable>
      </ScrollView>
      <StatusBar />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
  },
  signup: {
    position: "absolute",
    marginTop: "75%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: "50%",
    width: "100%",
  },
  textInput: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 40,
    borderWidth: 1,
    paddingLeft: 10,
    padding: 8,
    borderColor: "#e4e4e4",
    marginTop: 14,
  },
  button: {
    backgroundColor: "#dd8716",
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: "10%",
    alignSelf: "center",
  },
});
