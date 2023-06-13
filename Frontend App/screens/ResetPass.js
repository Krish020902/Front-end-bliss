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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastProvider, useToast } from "react-native-toast-notifications";
import { Button, Input, Icon } from "@rneui/base";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import FloatingLabelInput from "../components/FloatingLabelInput";
import { useUserContext } from "../context/user_context";
import axios from "axios";
import { RESET_PASSWORD } from "../constants/api";

const ResetPass = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [showPassword1, setShowPassword1] = useState(true);
  const [showPassword2, setShowPassword2] = useState(true);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleTogglePassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const handleTogglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };

  const {
    setUserEmail,
    setUserPassword,
    email,
    password,
    phone,
    setUserPhone,
    oldpassword,
    setUserOldPassword,
  } = useUserContext();
  const toast = useToast();
  const [password1, setPassword1] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const setoldpass = (change) => {
    setUserOldPassword(change);
    console.log("old pass", oldpassword);
  };
  const setnewpass = (change) => {
    setUserPassword(change);
    setPassword1(change);
    console.log(password);
  };
  const setconfirmpass = (change) => {
    setConfirmPassword(change);
  };
  const login = async () => {
    if (password1 === confirmPassword) {
      const token = await AsyncStorage.getItem("token");
      const numberurl = `${RESET_PASSWORD}/${phone}`;
      try {
        // console.log(typeof setUserEmail);
        // console.log("email and aps5s", password);
        const res = await axios.put(
          numberurl,
          {
            old_password: `${oldpassword}`,
            new_password: `${password}`,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.valid) {
          console.log("isvalid", oldpassword);

          console.log(res.data.message);
          toast.show("Password reset Successfully!", {
            type: "success",
          });
          navigation.navigate("MainDashboard");
        } else {
          toast.show(res.data.message + "! ", {
            type: "danger",
            placement: "top",
            animationType: "zoom-in",
          });
          console.log("some error", err);
        }
      } catch (err) {
        toast.show("error" + err, {
          type: "danger",
          placement: "top",
          animationType: "zoom-in",
        });
        console.log("Outside catch", err);
      }
    } else {
      console.log("unsuccessfull");
      toast.show("Passwords don't match ", {
        type: "danger",
        placement: "top",
        animationType: "zoom-in",
      });
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/BlissQuantsTM.jpg")}
        style={styles.logo}
      />

      <Text style={styles.font}>Enter Old Password</Text>
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
          onChangeText={setoldpass}
        />
      </View>
      {/* <TextInput
              
        secureTextEntry={true}

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
        onChangeText={setoldpass}
      /> */}
      <Text style={styles.font}>Set new Password</Text>
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
              onPress={handleTogglePassword1}
              name={showPassword1 ? "eye-outline" : "eye-off-outline"}
              type="ionicon"
              backgroundColor="#75706f"
              color="white"
            />
          }
          secureTextEntry={showPassword1}
          maxLength={10}
          style={{
            height: 26,
            alignSelf: "center",
            marginLeft: 14,
            width: 350,
            fontSize: 24,
            color: "white",
          }}
          onChangeText={setnewpass}
        />
      </View>
      {/* <TextInput
        secureTextEntry={true}
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
        onChangeText={setnewpass}
      /> */}
      <Text style={styles.font}>Confirm Your Password</Text>
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
              onPress={handleTogglePassword2}
              name={showPassword2 ? "eye-outline" : "eye-off-outline"}
              type="ionicon"
              backgroundColor="#75706f"
              color="white"
            />
          }
          secureTextEntry={showPassword2}
          maxLength={10}
          style={{
            height: 26,
            alignSelf: "center",
            marginLeft: 14,
            width: 350,
            fontSize: 24,
            color: "white",
          }}
          onChangeText={setconfirmpass}
        />
      </View>
      {/* <TextInput
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
        onChangeText={setconfirmpass}
      /> */}
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
      </TouchableOpacity>
      <Image
        source={require("../assets/FooterLogo.png")}
        style={styles.footlogo}
      /> */}
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
export default ResetPass;
