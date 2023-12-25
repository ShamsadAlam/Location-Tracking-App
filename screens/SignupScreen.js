import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { BASE_URL } from "../config";

const SignupScreen = ({ navigation }) => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Age, setAge] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const Signup = async () => {
    const formData = new FormData();
    formData.append("name", Name);
    formData.append("email", Email);
    formData.append("password", Password);
    formData.append("age", Age);

    if (selectedImage) {
      formData.append("profile_picture", {
        uri: selectedImage,
        name: "profile_picture.jpg",
        type: "image/jpg",
      });
    }
    console.log("formData: ", formData);
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        alert("Yay, Signed Up Done 😊😊!!");
        navigation.navigate("Login");
      } else {
        const errorData = await response.json();
        alert("Signup failed 😓😓");
        console.error("Error creating account:", errorData);
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const selectImage = async () => {
    try {
      const { assets, canceled } = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!canceled) {
        setSelectedImage(assets[0].uri);
        console.log("selectedImage: ", assets[0].uri);
      }
    } catch (error) {
      console.log("Error selecting image:", error);
    }
  };

  const OpenCamera = async () => {
    try {
      const { assets, canceled } = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
      if (!canceled) {
        setSelectedImage(assets[0].uri);
        console.log("selectedImage: ", assets[0].uri);
      }
    } catch (error) {
      console.log("Error selecting image:", error);
    }
  };

  useEffect(() => {
    console.log("gallery: ", gallery);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/background.png")}
        style={{ height: "40%" }}
      />
      <ScrollView style={styles.signup}>
        <Text
          style={{
            padding: 8,
            fontSize: 22,
            fontWeight: "800",
            paddingLeft: "5%",
            marginTop: "6%",
          }}
        >
          Signup
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "5%",
            marginTop: "2%",
          }}
        >
          <View>
            <Image source={require("../assets/images/user1.png")} />
          </View>
          <View style={{ marginLeft: "2%" }}>
            <Text
              style={{
                padding: 2,
              }}
            >
              Profile Picture
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                onPress={OpenCamera}
                style={{
                  padding: 8,
                  backgroundColor: "#e4e4e4",
                  borderRadius: 5,
                  paddingHorizontal: 24,
                }}
              >
                <Text>Take Picture</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={selectImage}
                style={{
                  padding: 8,
                  backgroundColor: "#e4e4e4",
                  borderRadius: 5,
                  marginLeft: "5%",
                  paddingHorizontal: 24,
                }}
              >
                <Text>Upload</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <KeyboardAvoidingView style={{ marginTop: "5%" }}>
          <TextInput
            placeholder="Name"
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            style={styles.textInput}
            value={Name}
            onChangeText={(text) => setName(text)}
          />
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
          <TextInput
            placeholder="Age"
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            style={styles.textInput}
            value={Age}
            onChangeText={(text) => setAge(text)}
          />
        </KeyboardAvoidingView>
        <Pressable style={styles.button} onPress={Signup}>
          <Text
            style={{
              color: "#fff",
              fontWeight: "600",
              padding: 20,
              fontSize: 16,
            }}
          >
            Create Account
          </Text>
        </Pressable>
      </ScrollView>
      <StatusBar />
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
  },
  signup: {
    position: "absolute",
    marginTop: "60%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: "70%",
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
