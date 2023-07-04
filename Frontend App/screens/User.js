import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import * as Animatable from "react-native-animatable";
import React, { useState, useEffect } from "react";
import { useToast } from "react-native-toast-notifications";
import { GET_USER_DATA } from "../constants/api";
import { useUserContext } from "../context/user_context";
import axios from "axios";
import { Button, Input, Icon, Card } from "@rneui/base";
// import { Svg, LinearGradient, Stop } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const User = ({ navigation }) => {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const checkConnectivity = async () => {
      const netInfoState = await NetInfo.fetch();
      setIsConnected(netInfoState.isConnected);
    };

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    checkConnectivity();

    return () => {
      unsubscribe();
    };
  }, []);
  const { name, email, phone, setUserEmail, setUserName } = useUserContext();

  const toast = useToast();
  const userData = {
    name: `${name}`,
    email: `${email}`,
    phone: `${phone}`,
  };
  const [buttonOpacity] = useState(new Animated.Value(1));

  const handleLogout = () => {
    toast.show("Logged out Successfully! ", {
      type: "success",
      placement: "top",
      animationType: "zoom-in",
    });
    navigation.navigate("Login");
  };

  const handleChangePassword = () => {
    navigation.navigate("ResetPass");
  };

  const handleEditProfile = () => {
    navigation.navigate("SetUserDetails");
  };
  const getUserdata = async () => {
    const resultUrl = `${GET_USER_DATA}/${phone}`;

    const token = await AsyncStorage.getItem("token");
    try {
      const result = await axios.get(resultUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserEmail(result.data.data.email);
      setUserName(result.data.data.name);
      console.log("this is result", result.data.data.email);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserdata();
  }, []);
  return isConnected ? (
    <View style={styles.container}>
      <View
        style={{
          marginBottom: 3,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            paddingTop: 20,
            paddingLeft: 20,
            fontWeight: "500",
            // margin: 5,
            // marginLeft: 20,
            color: "white",
            // backgroundColor: "#2d343c",
          }}
        >
          My Account
        </Text>
      </View>
      <View style={styles.profileContainer}>
        <LinearGradient
          // Background Linear Gradient
          colors={["rgb(132,194,37)", "transparent"]}
          style={styles.background1}
        />
        <Text style={styles.label}>Name:</Text>

        <Text style={styles.detail}>{userData.name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.detail}>{userData.email}</Text>

        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.detail}>{userData.phone}</Text>
      </View>

      <View style={styles.buttonContainer}>
        {/* <Animated.View
          style={[styles.buttonWrapper, { opacity: buttonOpacity }]}
        >
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={{ color: "white" }}>Logout</Text>
          </TouchableOpacity>
        </Animated.View> */}
        <Button
          color="rgb(132,194,37)"
          onPress={handleLogout}
          buttonStyle={{
            marginTop: 25,
            width: responsiveWidth(80),
            alignSelf: "center",
            borderRadius: 13,
          }}
        >
          Logout
          <Icon
            name="log-out"
            color="white"
            type="ionicon"
            style={{ marginLeft: 7 }}
          />
        </Button>

        {/* <Animated.View
          style={[styles.buttonWrapper, { opacity: buttonOpacity }]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}
          >
            <Text style={{ color: "white" }}>Change Password</Text>
          </TouchableOpacity>
        </Animated.View> */}
        <Button
          color="rgb(132,194,37)"
          onPress={handleChangePassword}
          buttonStyle={{
            marginTop: 25,
            width: responsiveWidth(80),
            alignSelf: "center",
            borderRadius: 13,
          }}
        >
          Change Password
          <Icon
            name="create"
            color="white"
            type="ionicon"
            style={{ marginLeft: 10 }}
          />
        </Button>
        {/* <Animated.View
          style={[styles.buttonWrapper, { opacity: buttonOpacity }]}
        >
          <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
            <Text style={{ color: "white" }}>Edit Profile</Text>
          </TouchableOpacity>
        </Animated.View> */}
        <Button
          color="rgb(132,194,37)"
          onPress={handleEditProfile}
          buttonStyle={{
            marginTop: 25,
            width: responsiveWidth(80),
            alignSelf: "center",
            borderRadius: 13,
          }}
        >
          Edit Profile
          <Icon
            name="pencil"
            color="white"
            type="ionicon"
            style={{ marginLeft: 10 }}
          />
        </Button>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      {/* <LinearGradient
        // Button Linear Gradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.button}
      >
        <Text style={styles.text}>Sign in with Facebook</Text>
      </LinearGradient> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    // backgroundColor: "#28c76f",
    backgroundColor: "#3a3332",
    // backgroundColor: "#202830",
    // backgroundColor: "black",

    // backgroundImage: "linear-gradient(#2d343c, #FFFFFF)",

    // backgroundGradient: "vertical",
    // backgroundGradientTop: "#2d343c",
    // backgroundGradientBottom: "#2d343c",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 900,
  },
  background1: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 150,
    borderRadius: 25,
  },
  gradient: {
    flex: 1,
  },
  profileContainer: {
    // flex: 1,

    // backgroundColor: "#2d388a",
    backgroundColor: "#d7f205",
    // marginBottom: "95%",
    // alignItems: "center",
    // justifyContent: "center",
    borderRadius: 25,
    padding: 20,
    margin: 7,
    elevation: 50,
    shadowColor: "white",
    shadowOpacity: 0,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 2,
    },
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "black",
  },
  detail: {
    marginBottom: 10,
    fontSize: 16,
    color: "grey",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30,
    // padding: 20,
  },
  buttonWrapper: {
    // width: "100%",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "rgb(132,194,37)",
    // backgroundColor: "#e07a5f",
    color: "white",
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",

    fontWeight: "bold",
  },
  // container: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  //   backgroundColor: "white",
  // },
  // background: {
  //   position: "absolute",
  //   left: 0,
  //   right: 0,
  //   top: 0,
  //   height: 300,
  // },
  // button: {
  //   padding: 15,
  //   alignItems: "center",
  //   borderRadius: 5,
  // },
  // text: {
  //   backgroundColor: "transparent",
  //   fontSize: 15,
  //   color: "#fff",
  // },
});

export default User;
