import React, { useState } from "react";
import {
  View,
  StatusBar,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import Navbar from "../components/Navbar";
import { ToastProvider, useToast } from "react-native-toast-notifications";
import color from "../theme/Colour";
const Home = ({ navigation }) => {
  const onClickLogin = () => {
    navigation.navigate("Login");
  };
  const toast = useToast();
  return (
    <>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/BlissQuantsTM.png")}
          style={styles.logo}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: color.bg_clr,
        }}
      >
        <TouchableOpacity
          onPress={onClickLogin}
          style={{
            backgroundColor: color.btn_clr,
            padding: 10,
            margin: 10,
          }}
        >
          <Text style={{ color: "white" }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("MobileNo")}
          style={{ backgroundColor: color.btn_clr, padding: 10 }}
        >
          <Text style={{ color: "white" }}>Signup</Text>
        </TouchableOpacity>
        <Image
          source={require("../assets/FooterLogo.png")}
          style={styles.footlogo}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    color: "white",
  },
  logo: {
    marginTop: 60,
    alignSelf: "center",
    width: 300,
    height: 80,
  },
  font: {
    color: "white",
    marginLeft: 15,
    marginTop: 5,
  },
  phoneInput: {
    color: "white",
    height: 40,
    width: 350,
    borderColor: color.btn_clr,
    borderWidth: 1,
    margin: 15,
  },
  logo: {
    // marginLeft: 35,
    marginTop: 60,
    alignSelf: "center",
    width: 300,
    height: 80,
  },
  logoContainer: {
    backgroundColor: color.bg_clr,
  },
  footlogo: {
    marginTop: "94%",
    alignSelf: "center",
    width: 350,
    height: 175,
  },
});
export default Home;
