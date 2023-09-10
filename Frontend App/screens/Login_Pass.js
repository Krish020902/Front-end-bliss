import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  TextInput,
  Text,
  Keyboard,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
// import Icon from "react-native-vector-icons/FontAwesome";
import { useToast } from "react-native-toast-notifications";

import { Button, Input, Icon } from "@rneui/base";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import FloatingLabelInput from "../components/FloatingLabelInput";
import { useUserContext } from "../context/user_context";
import axios from "axios";
import { LOGIN_PASS } from "../constants/api";
import color from "../theme/Colour";
const Email = ({ navigation }) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const clickotp = () => {
    navigation.navigate("Login");
  };
  const onPressSignup = () => {
    navigation.navigate("MobileNo");
  };
  const {
    setUserEmail,
    setUserPassword,
    email,
    password,
    setUserPhone,
    phone,
  } = useUserContext();
  const forgotpass = () => {
    navigation.navigate("ForgotPass");
  };
  const [showPassword, setShowPassword] = useState(true);

  const toast = useToast();
  const login = async () => {
    try {
      // console.log(typeof setUserEmail);
      // console.log("email and aps5s", password);
      // console.log("💥", phone, password);
      const res = await axios.post(LOGIN_PASS, {
        mobile: `${phone}`,
        password: `${password}`,
      });
      console.log(res.data.message);
      if (res.data.valid) {
        console.log(res.data.message);
        toast.show("Logged in Successfull! ", {
          type: "success",
          placement: "top",
          animationType: "zoom-in",
        });
        navigation.navigate("MainDashboard");
      } else {
        toast.show(res.data.message + "! ", {
          type: "danger",
          placement: "top",
          animationType: "zoom-in",
        });
        console.log("💥💥💥some error", err);
      }
    } catch (err) {
      toast.show(res.data.message, {
        type: "danger",
        placement: "top",
        animationType: "zoom-in",
      });
      console.log("💥💥💥Outside catch", err);
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
        Login
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
      <Text style={styles.font}>Enter Your Password</Text>
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
          leftIcon={
            <Icon
              onPress={handleTogglePassword}
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              type="ionicon"
              backgroundColor={color.bg_secondary_clr}
              color="white"
            />
          }
          secureTextEntry={showPassword}
          maxLength={10}
          style={{
            height: 26,
            alignSelf: "center",
            marginLeft: 14,
            width: 350,
            fontSize: 24,
            color: "white",
          }}
          onChangeText={(pass) => setUserPassword(pass)}
        />
      </View>
      <TouchableOpacity onPress={forgotpass}>
        <Text style={{ color: "lightblue", marginLeft: 20, marginTop: 5 }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.font}>Login with OTP </Text>
        <TouchableOpacity onPress={clickotp}>
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
        {isKeyboardOpen && (
          <TouchableOpacity style={styles.roundButton} onPress={login}>
            <Icon name="chevron-right" size={32} color="white" />
          </TouchableOpacity>
        )}
      </View>
      {!isKeyboardOpen && (
        <>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.separator} />
            <Text style={styles.text}>OR</Text>
            <View style={styles.separator} />
          </View>
          <Button
            title="Signup"
            color={color.btn_clr}
            onPress={onPressSignup}
            buttonStyle={{
              // marginTop: 25,
              width: responsiveWidth(90),
              alignSelf: "center",
              borderRadius: 13,
            }}
          ></Button>

          <View
            style={{ flex: 1, justifyContent: "flex-end", marginBottom: 20 }}
          >
            <Button
              title="Go to dashboard"
              color={color.btn_clr}
              onPress={login}
              buttonStyle={{
                marginTop: 25,
                width: responsiveWidth(80),
                alignSelf: "center",
                borderRadius: 13,
              }}
            >
              Go to dashboard
              <Icon name="log-in-outline" color="white" type="ionicon" />
            </Button>
          </View>
        </>
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
    position: "absolute",
    right: 30,
    bottom: -7,

    backgroundColor: color.btn_clr,
    borderRadius: 50,
    padding: 10,
  },
  separator: {
    height: 1,
    width: responsiveWidth(45),
    backgroundColor: "#CCCCCC",
    marginVertical: 30,
  },
  text: {
    marginHorizontal: 10,
    color: "white",
    fontSize: 16,
    // color: "#000000",
    alignSelf: "center",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#000000",
  },
  logo: {
    // marginLeft: 35,
    marginTop: 25,
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
export default Email;
