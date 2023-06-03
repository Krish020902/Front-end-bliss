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
import { useUserContext } from "../context/user_context";
import axios from "axios";
import { LOGIN_MOBILE } from "../constants/api";
import { Link } from "@react-navigation/native";
import Email from "./Email";

const ForgotPass = ({ navigation }) => {
  const { setUserPhone, setUserOtp, phone } = useUserContext();
  const clickemail = () => {
    navigation.navigate("Email");
  };
  const generateOtp = async () => {
    try {
      const res = await axios.post(LOGIN_MOBILE, {
        user_id: "",
        email: `${phone}@bliss.com`,
        password: "",
        country: "",
        pincode: "",
        birthyear: "",
        interest: "",
        role: "",
        leader_name: "",
        passreset: "",
        register_date: "",
        status: "",
        name: "",
        mobile: phone,
        company: "",
        session_id: "",
        plan: "",
        first_date: "",
        email_org: "",
      });

      if (res.data.valid) {
        console.log("otp is :");
        console.log(res.data.data.otp);
        setUserOtp(res.data.data.otp);
        navigation.navigate("ForgotOtp");
      } else {
        console.log(err);
      }
    } catch (err) {
      console.log(err);
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
      <Text style={styles.font}>Enter Your Mobile Number to recover password.</Text>
      <TextInput
        maxLength={10}
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
      <Text style={{ fontWeight: "lighter", color: "grey", marginLeft: 15 }}>
        OTP Message will be sent to your Phone Number
      </Text>
      
      <TouchableOpacity
        onPress={generateOtp}
        style={{
          backgroundColor: "rgb(132,194,37)",
          padding: 10,
          marginTop: 15,
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
    marginTop: "67%",
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

export default ForgotPass;
