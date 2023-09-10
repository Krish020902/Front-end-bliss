import React, { useEffect, useState, useRef } from "react";
import * as Device from "expo-device";
import {
  View,
  StatusBar,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerForPushNotificationsAsync } from "expo-notifications";
import * as Notifications from "expo-notifications";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { Button, Input, Icon } from "@rneui/base";

import { useUserContext } from "../context/user_context";
import axios from "axios";
import { LOGIN_MOBILE } from "../constants/api";
import { Link } from "@react-navigation/native";
import Email from "./Login_Pass";
import { useToast } from "react-native-toast-notifications";
const Login = ({ navigation }) => {
  const toast = useToast();
  const { setUserPhone, setUserOtp, phone } = useUserContext();

  const clickemail = () => {
    navigation.navigate("Login_Pass");
  };

  const sendNotification = async (title, body) => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    const content = {
      title: title,
      body: body,
    };

    const trigger = null;

    await Notifications.scheduleNotificationAsync({
      content,
      trigger,
    });
  };

  const generateOtp = async () => {
    const token = await AsyncStorage.getItem("token");

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
        toast.show("OTP generated! ", {
          type: "success",
          placement: "top",
          animationType: "zoom-in",
        });
        setUserOtp(res.data.data.otp);
        sendNotification(
          "otp message",
          `Generated OTP is ${res.data.data.otp}`
        );

        navigation.navigate("OTP_LOGIN");
      } else {
        toast.show("Sorry there is no user! ", {
          type: "danger",
          placement: "top",
          animationType: "zoom-in",
        });
        console.log(err);
      }
    } catch (err) {
      toast.show("error:", err, {
        type: "danger",
        placement: "top",
        animationType: "zoom-in",
      });
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/BlissQuantsTM.png")}
        style={styles.logo}
      />
      <Text
        style={{
          fontWeight: "bold",
          color: "white",
          marginLeft: 20,
          marginTop: 20,
          fontSize: responsiveFontSize(3),
        }}
      >
        Login
      </Text>
      <Text style={styles.font}>Enter Your Mobile Number</Text>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#75706f",
          width: responsiveWidth(90),
          margin: 15,
          borderRadius: 10,
          elevation: 14, // or you can use the `shadow` property instead
          shadowColor: "rgb(132,194,37)",
          shadowOffset: {
            width: 20,
            height: 20,
          },
          shadowOpacity: 1,
          shadowRadius: 4,
        }}
      >
        <Input
          keyboardType="phone-pad"
          maxLength={10}
          style={{ color: "white", marginLeft: 14 }}
          leftIcon={<Icon name="phone" size={24} color="white" />}
          onChangeText={(number) => setUserPhone(number)}
        ></Input>
        {/* <TextInput
      
      placeholderTextColor={"#CCCCCC"}
      leftIcon={
        <Icon
          name='phone'
          
          size={24}
          color='white'
        />

        
        
      }
      maxLength={10}
      keyboardType="phone-pad"
      style={{
        height: 26,
        alignSelf: "center",
        margin: 15,
        fontSize: 18,
        color: "white",
      
        
      }}
      onChangeText={(number) => setUserPhone(number)}
      
      /> */}
      </View>
      <Text
        style={{
          fontWeight: "lighter",
          color: "grey",
          marginLeft: 20,
          fontSize: responsiveFontSize(1.9),
        }}
      >
        OTP Message will be sent to your Phone Number
      </Text>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.font}>Login with password </Text>
        <TouchableOpacity onPress={clickemail}>
          <Text
            style={{
              color: "lightblue",
              paddingLeft: 4,
              paddingTop: 5,
              fontSize: responsiveFontSize(1.7),
            }}
          >
            click here
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 30 }}>
        <Button
          title="NEXT"
          color="rgb(132,194,37)"
          onPress={generateOtp}
          buttonStyle={{
            // marginTop: 25,
            width: responsiveWidth(90),
            alignSelf: "center",
            borderRadius: 13,
          }}
        ></Button>
      </View>

      {/* <Image
        source={require("../assets/FooterLogo.png")}
        style={styles.footlogo}
        /> */}
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
    marginTop: 30,
    alignSelf: "center",
    width: 300,
    height: 80,
  },
  footlogo: {
    // marginBottom: 30,

    alignSelf: "center",
    width: 350,
    height: 175,
  },
  font: {
    color: "white",
    marginLeft: 20,
    marginTop: 5,

    fontSize: responsiveFontSize(1.7),
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

export default Login;
