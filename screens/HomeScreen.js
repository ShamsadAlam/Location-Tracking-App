import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useCallback, useEffect } from "react";
import { useFonts } from "expo-font";
import { StatusBar } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Montserrat: require("../assets/fonts/Montserrat-VariableFont_wght.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // const requestLocationPermission = async () => {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //       {
  //         title: "Cool Photo App Camera Permission",
  //         message:
  //           "Cool Photo App needs access to your camera " +
  //           "so you can take awesome pictures.",
  //         buttonNeutral: "Ask Me Later",
  //         buttonNegative: "Cancel",
  //         buttonPositive: "OK",
  //       }
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log("You can use the Location");
  //     } else {
  //       console.log("Location permission denied");
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };

  // useEffect(() => {
  //   requestLocationPermission();
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Loco</Text>
      <Text style={styles.secondHeading}>
        Track your real time location with loco
      </Text>
      <Image
        style={{ marginTop: "5%" }}
        source={require("../assets/images/Home.png")}
      />
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.navigate("SignUp");
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "600",
            padding: 20,
            fontSize: 16,
          }}
        >
          Sign-up
        </Text>
      </Pressable>
      <Pressable
        style={styles.account}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text>Already have an account?</Text>
        <Text
          style={{
            color: "#dd8716",
            fontWeight: "600",
            fontSize: 15,
            textDecorationLine: "underline",
            marginLeft: 6,
          }}
        >
          Log in
        </Text>
      </Pressable>
      <StatusBar />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  heading: {
    fontFamily: "Montserrat",
    color: "#dd8716",
    fontWeight: "800",
    fontSize: 26,
  },
  secondHeading: {
    fontFamily: "Montserrat",
    fontWeight: "500",
  },
  button: {
    backgroundColor: "#dd8716",
    width: "90%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: "10%",
  },
  account: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    textDecorationLine: "none",
    marginTop: 2,
  },
});
