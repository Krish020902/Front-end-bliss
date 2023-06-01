import React, { useState } from "react";
import {
  View,
  StatusBar,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import FloatingLabelInput from "../components/FloatingLabelInput";
import { useUserContext } from "../context/user_context";
import axios from "axios";
import { LOGIN_EMAIL } from "../constants/api";

const Email = ({ navigation }) => {
  const { setUserEmail, setUserPassword, email, password  , setUserPhone,  phone} = useUserContext();

  const login = async () => {
    try {
      console.log(typeof setUserEmail);
      console.log("email and aps5s", password);
      const res = await axios.post(LOGIN_EMAIL, {
        mobile: `${phone}`,
        password: `${password}`,
      });

      if (res.data.valid) {
        console.log(res.data.message);

        navigation.navigate("MainDashboard");
      } else {
        console.log("some error", err);
      }
    } catch (err) {
      console.log("Outside catch", err);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/BlissQuantsTM.jpg")}
        style={styles.logo}
      />
      <Text
        style={{
          fontWeight: "bold",
          color: "white",
          marginLeft: 15,
          marginTop: 20,
        }}
      >
        Welcome,
      </Text>
      <Text style={styles.font}>Enter Your Mobile Number</Text>
      <TextInput
              keyboardType="phone-pad"

        style={{
          height: 26,
          alignSelf: "center",
          margin: 15,
          width: 350,
          fontSize: 20,
          color: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#555",
        }}
        onChangeText={(number) => setUserPhone(number)}
      />
      <Text style={styles.font}>Enter Your Password</Text>
      <TextInput
        secureTextEntry={true}
        
        maxLength={10}
        style={{
          height: 26,
          alignSelf: "center",
          margin: 15,
          width: 350,
          fontSize: 20,
          color: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#555",
        }}
        onChangeText={(pass) => setUserPassword(pass)}
      />
      <TouchableOpacity
        onPress={login}
        style={{
          backgroundColor: "rgb(132,194,37)",
          padding: 10,
          marginTop: 10,
          width: 100,
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Text style={{ color: "white" }}>NEXT</Text>
      </TouchableOpacity>
      <Image
        source={require("../assets/FooterLogo.png")}
        style={styles.footlogo}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    // position: "absolute",
    backgroundColor: "#3a3332",
    color: "white",

    // marginLeft: 2,
  },
  logo: {
    // marginLeft: 35,
    marginTop: 60,
    alignSelf: "center",
    width: 300,
    height: 80,
  },
  footlogo: {
    marginTop: "59%",
    alignSelf: "center",
    width: 350,
    height: 175,
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
    borderColor: "rgb(132,194,37)",
    borderWidth: 1,
    margin: 15,

    // marginBottom: 10,
  },
});
export default Email;
