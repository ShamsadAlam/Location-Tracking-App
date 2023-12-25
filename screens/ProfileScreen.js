import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "react-native";
import { BASE_URL } from "../config";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import { Avatar } from "react-native-paper";

const ProfileScreen = ({ navigation }) => {
  const [data, setData] = useState({});
  const [modalVisible, setModalVisible] = useState(true);
  const route = useRoute();
  const token = route.params?.token;
  const getUserDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/`, {
        headers: {
          "x-auth-token": token,
        },
      });

      if (response) {
        // console.log("res: ", response);
        setData(response.data);
      } else {
        console.error("Error creating account:");
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };
  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <View style={styles.container}>
      <Text
        style={{
          borderWidth: 1,
          borderColor: "#e4e4e4",
          padding: 18,
          elevation: 12,
          shadowColor: "#fff",
          shadowOpacity: 0.8,
          textAlign: "center",
          fontSize: 18,
        }}
      >
        Profile
      </Text>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            marginBottom: 10,
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          Hello, {(data && data.name) || "user"}
        </Text>
        <Avatar.Image
          size={200}
          source={
            data
              ? { uri: data.image_url }
              : require("../assets/images/user2.png")
          }
          style={styles.image}
        />

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "2%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={require("../assets/images/location.png")} />
          <Text style={{ marginLeft: "1%" }}>New York City</Text>
        </View>
      </View>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          margin: 16,
          borderWidth: 1,
          padding: 8,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#e4e4e4",
          elevation: 12,
          shadowColor: "#fff",
          shadowOpacity: 0.8,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            borderWidth: 1,
            justifyContent: "space-between",
            alignItems: "center",
            padding: 14,
            borderRadius: 20,
            borderColor: "#e4e4e4",
          }}
        >
          <View>
            <Text style={{ textDecorationLine: "underline", fontSize: 16 }}>
              {(data && data.email) || "sally@gmail.com"}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "600" }}>EMAIL</Text>
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>{(data && data.age) || "32"}</Text>
            <Text style={{ fontSize: 10, fontWeight: "600" }}>AGE</Text>
          </View>
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Location Persmision Required</Text>
            <Text style={{}}>
              You need to allow the app to fetch your location to use Loco,
              otherwise you will be logged out!{" "}
            </Text>
            <View
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                gap: 20,
                marginTop: 10,
              }}
            >
              <Pressable
                style={{
                  borderRadius: 20,
                  padding: 10,
                  paddingHorizontal: 20,
                  elevation: 2,
                  backgroundColor: "#dd8716",
                }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Allow Settings</Text>
              </Pressable>
              <Pressable
                style={{
                  borderRadius: 20,
                  padding: 10,
                  paddingHorizontal: 20,
                  elevation: 2,
                  backgroundColor: "#ff2d55",
                }}
                onPress={() => navigation.replace("Home")}
              >
                <Text style={styles.textStyle}>Logout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      {!modalVisible && (
        <ScrollView style={{ padding: 8 }}>
          <Text style={{ fontWeight: "600", fontSize: 16 }}>
            General Statistics
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderWidth: 1,
              padding: 10,
              borderRadius: 20,
              borderColor: "#e4e4e4",
              elevation: 12,
              shadowColor: "#fff",
              shadowOpacity: 0.8,
              marginTop: "5%",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Image source={require("../assets/images/check.png")} />
              <Text style={{ marginLeft: "8%" }}>Places Visited</Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                paddingHorizontal: 26,
                borderRadius: 20,
                paddingVertical: 2,
              }}
            >
              <Text>5</Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderWidth: 1,
              padding: 10,
              borderRadius: 20,
              borderColor: "#e4e4e4",
              elevation: 12,
              shadowColor: "#fff",
              shadowOpacity: 0.8,
              marginTop: "5%",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Image source={require("../assets/images/clock.png")} />
              <Text style={{ marginLeft: "8%" }}>Hours Travelled</Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                paddingHorizontal: 26,
                borderRadius: 20,
                paddingVertical: 2,
              }}
            >
              <Text>18</Text>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderWidth: 1,
              padding: 10,
              borderRadius: 20,
              borderColor: "#e4e4e4",
              elevation: 12,
              shadowColor: "#fff",
              shadowOpacity: 0.8,
              marginTop: "5%",
            }}
          >
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Image source={require("../assets/images/award.png")} />
              <Text style={{ marginLeft: "8%" }}>Surveys Completed</Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                paddingHorizontal: 26,
                borderRadius: 20,
                paddingVertical: 2,
              }}
            >
              <Text>9</Text>
            </View>
          </View>
        </ScrollView>
      )}
      <View
        style={{
          borderWidth: 1,
          position: "absolute",
          bottom: 0,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingVertical: 16,
          borderColor: "#e4e4e4",
          backgroundColor: "#fff",
        }}
      >
        <Image source={require("../assets/images/circle.png")} />
        <Image source={require("../assets/images/Icon-Plus.png")} />
        <Image source={require("../assets/images/circle.png")} />
      </View>
      <StatusBar />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#fff",
  },
  centeredView: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50%",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#ff2d55",
  },
});
