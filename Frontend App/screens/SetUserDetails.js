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
import { UPDATE_USER_DATA } from "../constants/api";

const SetUserDetails = ({ navigation }) => {
  const { setUserEmail, setUserName, email, name, phone, setUserPhone } =
    useUserContext();
  const toast = useToast();

  const login = async () => {
    const token = await AsyncStorage.getItem("token");
    const infourl = `${UPDATE_USER_DATA}/${phone}`;
    try {
      // console.log(typeof setUserEmail);
      // console.log("email and aps5s", password);
      const res = await axios.put(
        infourl,
        {
          birthyear: "",
          company: "",
          country: "",
          email: email,
          email_org: "",
          first_date: "",
          interest: "",
          leader_name: "",
          mobile: phone,
          name: name,
          passreset: "",
          password: "",
          pincode: "",
          plan: "",
          register_date: "",
          role: "",
          session_id: "",
          status: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.valid) {
        console.log(res.data.message);
        toast.show("Details updated Successfully" + "! ", {
          type: "success",
        });
        navigation.navigate("MainDashboard");
      } else {
        toast.show(res.data.message + "! ", {
          type: "danger",
        });
        console.log("some error", err);
      }
    } catch (err) {
      toast.show(err + "! ", {
        type: "danger",
      });
      console.log("Outside catch", err);
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/BlissQuantsTM.jpg")}
        style={styles.logo}
      />

      <Text style={styles.font}>Name</Text>
      {/* <TextInput
        value={name}
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
        onChangeText={(change) => {
          setUserName(change);
        }}
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
          value={name}
          style={{
            height: 26,
            alignSelf: "center",
            marginLeft: 14,
            width: 350,
            fontSize: 18,
            color: "white",
          }}
          onChangeText={(change) => {
            setUserName(change);
          }}
        />
      </View>

      <Text style={styles.font}>Email</Text>
      {/* <TextInput
        value={email}
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
        onChangeText={(change) => {
          setUserEmail(change);
        }}
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
          value={email}
          style={{
            height: 26,
            alignSelf: "center",
            marginLeft: 14,
            width: 350,
            fontSize: 18,
            color: "white",
          }}
          onChangeText={(change) => {
            setUserEmail(change);
          }}
        />
      </View>
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
          Save changes
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
export default SetUserDetails;
