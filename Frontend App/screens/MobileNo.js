import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { ToastProvider, useToast } from "react-native-toast-notifications";
import color from "../theme/Colour";
import FloatingLabelInput from "../components/FloatingLabelInput";
import { useUserContext } from "../context/user_context";
import axios from "axios";
import { REGISTER_API } from "../constants/api";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

import { Button, Input, Icon } from "@rneui/base";
const MobileNo = ({ navigation }) => {
  const toast = useToast();
  const { setUserPhone, setUserOtp, phone } = useUserContext();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const generateOtp = async () => {
    try {
      const res = await axios.post(REGISTER_API, {
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
        toast.show("OTP generated ", {
          type: "success",
          placement: "top",
          animationType: "zoom-in",
        });
        console.log("otp is :");
        console.log(res.data.data.otp);
        setUserOtp(res.data.data.otp);
        navigation.navigate("OTP_REGISTER");
      } else {
        toast.show(res.data.message + "  ! ", {
          type: "danger",
          placement: "top",
          animationType: "zoom-in",
        });
        console.log(err);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // Listen for keyboard events
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setIsKeyboardOpen(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsKeyboardOpen(false)
    );

    // Cleanup listeners when the component unmounts
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
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
        Signup
      </Text>
      <Text style={styles.font}>Enter Your Mobile Number</Text>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: color.bg_secondary_clr,
          width: responsiveWidth(90),
          margin: 15,
          borderRadius: 10,
          elevation: 14, // or you can use the `shadow` property instead
          shadowColor: color.btn_clr,
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
      {isKeyboardOpen && (
        <TouchableOpacity style={styles.roundButton} onPress={generateOtp}>
          <Text
            style={{
              color: "white",

              fontSize: 18,
            }}
          >
            Get OTP
          </Text>
          <Icon name="chevron-right" size={32} color="white" />
        </TouchableOpacity>
      )}
      {!isKeyboardOpen && (
        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 30 }}>
          <Button
            title="NEXT"
            color={color.btn_clr}
            onPress={generateOtp}
            buttonStyle={{
              marginTop: 25,
              width: responsiveWidth(90),
              alignSelf: "center",
              borderRadius: 13,
            }}
          ></Button>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    // position: "absolute",
    backgroundColor: color.bg_clr,
    color: "white",

    // marginLeft: 2,
  },
  roundButton: {
    flexDirection: "row",
    position: "absolute",
    right: 30,
    bottom: 140,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: color.btn_clr,
    borderRadius: 50,
    padding: 10,
  },
  logo: {
    // marginLeft: 35,
    marginTop: 60,
    alignSelf: "center",
    width: 300,
    height: 80,
  },
  footlogo: {
    marginTop: 290,
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
    borderColor: color.btn_clr,
    borderWidth: 1,
    margin: 15,

    // marginBottom: 10,
  },
});
export default MobileNo;
