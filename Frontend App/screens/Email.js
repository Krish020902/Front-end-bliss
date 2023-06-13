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
import { LOGIN_EMAIL } from "../constants/api";

const Email = ({ navigation }) => {
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
      const res = await axios.post(LOGIN_EMAIL, {
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
      {/* <TextInput
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
      />  */}
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
      <Text style={styles.font}>Enter Your Password</Text>
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
          leftIcon={
            <Icon
              onPress={handleTogglePassword}
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              type="ionicon"
              backgroundColor="#75706f"
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
        <Text style={{ color: "lightblue", paddingLeft: 17, paddingTop: 5 }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}
      <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 30 }}>
        <Button
          title="Go to dashboard"
          color="rgb(132,194,37)"
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
