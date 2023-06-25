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
import { Button, Input, Icon } from "@rneui/base";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import { useToast } from "react-native-toast-notifications";
const ForgotPass = ({ navigation }) => {
  const toast = useToast();
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
        toast.show(res.data.message + "! ", {
          type: "success",
          placement: "top",
          animationType: "zoom-in",
        });
        setUserOtp(res.data.data.otp);
        navigation.navigate("ForgotOtp");
      } else {
        toast.show(res.data.message + "! ", {
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
          marginLeft: 15,
          marginTop: 20,
        }}
      >
        Welcome,
      </Text>
      <Text style={styles.font}>
        Enter Your Mobile Number to recover password.
      </Text>
      {/* <TextInput
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
      /> */}
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
      </View>
      <Text style={{ fontWeight: "lighter", color: "grey", marginLeft: 15 }}>
        OTP Message will be sent to your Phone Number
      </Text>

      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 30 }}>
        <Button
          color="rgb(132,194,37)"
          onPress={generateOtp}
          buttonStyle={{
            marginTop: 25,
            width: responsiveWidth(80),
            alignSelf: "center",
            borderRadius: 13,
          }}
        >
          NEXT
        </Button>
      </View>
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
