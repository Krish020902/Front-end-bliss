import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Image,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

import * as Animatable from "react-native-animatable";
import React, { useState, useEffect } from "react";
import { useToast } from "react-native-toast-notifications";
import { GET_USER_DATA } from "../constants/api";
import axios from "axios";
import { useUserContext } from "../context/user_context";
import { Button, Input, Icon, Card } from "@rneui/base";
import { CommonActions } from "@react-navigation/native";

// import { Svg, LinearGradient, Stop } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import color from "../theme/Colour";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";

const User = ({ navigation }) => {
  let token;
  let count = 0;
  const { setUserPhone } = useUserContext();

  var jwtdecode = require("jwt-decode");
  const [isConnected, setIsConnected] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // navigation.addListener("focus", () => {
    //   console.log("inside focus");
    // });
    console.log("phone in user!!!!!", phone);
    console.log("here in user useeffect");
    getUserdata();
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
    // });
  }, [isConnected]);
  const {
    name,
    email,
    phone,
    setUserEmail,
    setUserName,
    pincode,
    setUserPinCode,
    country,
    setUserCountry,
    plan,
    setUserPlan,
    birthyear,
    setUserBirthYear,
  } = useUserContext();

  const toast = useToast();
  const userData = {
    name: `${name}`,
    email: `${email}`,
    phone: `${phone}`,
    plan: `${plan}`,
    country: `${country}`,
    pincode: `${pincode}`,
    birthyear: `${birthyear}`,
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setUserName("");
    setUserEmail("");
    setUserBirthYear("");
    setUserBirthYear("");
    setUserPinCode("");
    setUserPlan("");
    setUserPhone("");
    toast.show("Logged out Successfully! ", {
      type: "success",
      placement: "top",
      animationType: "zoom-in",
    });
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [
        {
          name: "Login_Pass", // the name of the screen to navigate to
          // you can also pass params if needed, like: params: { someParam: 'value' }
        },
      ],
    });

    navigation.dispatch(resetAction);

    // navigation.navigate("Login_Pass");
  };

  const handleChangePassword = () => {
    navigation.navigate("ResetPass");
  };
  // useEffect(() => {
  //   setTimeout(() => {
  //     setUserName(" ");
  //     setUserBirthYear(" ");
  //     setUserPlan(" ");
  //     setUserPinCode(" ");
  //   }, 3500);
  // }, []);

  const handleEditProfile = () => {
    navigation.navigate("SetUserDetails");
  };

  const getUserdata = async () => {
    token = await AsyncStorage.getItem("token");
    // count++;
    // console.log(count);
    data = jwtdecode(token);
    setUserPhone(data.mobile);
    // const data = jwtdecode(token);
    const resultUrl = `${GET_USER_DATA}${phone}`;
    // console.log("data in user", data.mobile);

    // console.log("token in user", token);
    try {
      const result = await axios.get(resultUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("this is result", result);
      setUserEmail(result.data.data.email);
      // console.log("name", result.data.data.name);
      result.data.data.name == ""
        ? setUserName(" ")
        : setUserName(result.data.data.name);

      result.data.data.birthyear == 0
        ? setUserBirthYear(" ")
        : setUserBirthYear(result.data.data.birthyear);
      result.data.data.pincode == ""
        ? setUserPinCode(" ")
        : setUserPinCode(result.data.data.pincode);
      result.data.data.country == ""
        ? "India"
        : setUserCountry(result.data.data.country);
      result.data.data.plan == ""
        ? setUserPlan(" ")
        : setUserPlan(result.data.data.plan);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
      // setLoading(false);
      // console.log("this is result", result.data.data.email);
    } catch (err) {
      console.log("error ", err);
    }
  };

  // useEffect(() => {
  //   getUserdata();
  // }, [isConnected]);
  // useEffect(() => {
  //   navigation.addListener("focus", () => {
  //     // console.log("count");
  //     getUserdata();
  //   });
  // }, []);
  // useEffect(() => {
  //   getUserdata();
  // }, [phone]);
  // useEffect(() => {
  //   getUserdata();
  // }, [token]);

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
          colors={[color.btn_clr, "transparent"]}
          style={styles.background1}
        />
        <Text style={styles.label}>Name:</Text>
        {!userData.name ? (
          // getname()
          <ActivityIndicator
            style={{ alignSelf: "flex-start", marginBottom: 10 }}
            size="small"
            color="black"
          />
        ) : (
          <Text style={styles.detail}>{userData.name}</Text>
        )}

        <Text style={styles.label}>Email:</Text>
        {!userData.email ? (
          <ActivityIndicator
            style={{ alignSelf: "flex-start", marginBottom: 10 }}
            size="small"
            color="black"
          />
        ) : (
          <Text style={styles.detail}>{userData.email}</Text>
        )}

        <Text style={styles.label}>Phone Number:</Text>
        {!userData.phone ? (
          <ActivityIndicator
            size="small"
            color="black"
            style={{ alignSelf: "flex-start", marginBottom: 10 }}
          />
        ) : (
          <Text style={styles.detail}>{userData.phone}</Text>
        )}

        {/* here */}
        <View style={styles.row}>
          <View style={styles.gridItem}>
            <View style={styles.row}>
              <Text style={styles.labelDown}>Birth Year:</Text>
              {!userData.birthyear ? (
                <ActivityIndicator
                  style={{ alignSelf: "flex-start", marginBottom: 10 }}
                  size="small"
                  color="black"
                />
              ) : (
                <Text style={styles.detail}>{userData.birthyear}</Text>
              )}
            </View>
          </View>
          <View style={styles.gridItem}>
            <View style={styles.row}>
              <Text style={styles.labelDown}>Plan:</Text>
              {!userData.plan ? (
                <ActivityIndicator
                  style={{ alignSelf: "flex-start", marginBottom: 10 }}
                  size="small"
                  color="black"
                />
              ) : (
                <Text style={styles.detail}>{userData.plan}</Text>
              )}
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.gridItem}>
            <View style={styles.row}>
              <Text style={styles.labelDown}>Country:</Text>
              <Text style={styles.detail}>{userData.country}</Text>
            </View>
          </View>
          <View style={styles.gridItem}>
            <View style={styles.row}>
              <Text style={styles.labelDown}>Pin Code:</Text>
              {!userData.pincode ? (
                <ActivityIndicator
                  style={{ alignSelf: "flex-start", marginBottom: 10 }}
                  size="small"
                  color="black"
                />
              ) : (
                <Text style={styles.detail}>{userData.pincode}</Text>
              )}
            </View>
          </View>
        </View>
        {/* here */}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          color={color.btn_clr}
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
        <Button
          color={color.btn_clr}
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
        <Button
          color={color.btn_clr}
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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Animatable.Text
        animation="bounceIn"
        // easing="ease-in-out"
        iterationCount="infinite"
        style={{
          fontSize: 50,
          marginBottom: 10,
          height: 60,
        }}
      >
        <Image source={require("../assets/wifi_low.png")}></Image>
      </Animatable.Text>
      <Text>No Internet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg_clr,
  },
  gridItem: {
    width: responsiveWidth(45),
    height: responsiveHeight(7),
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 900,
  },
  row: {
    flexDirection: "row",
  },
  background1: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: 250,
    borderRadius: 25,
  },
  gradient: {
    flex: 1,
  },
  profileContainer: {
    backgroundColor: color.card_secondary_clr,
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

    width: responsiveWidth(30),
  },
  labelDown: {
    fontWeight: "bold",

    color: "black",

    width: responsiveWidth(20),
  },
  detail: {
    width: responsiveWidth(100),
    marginBottom: 10,
    fontSize: 16,
    color: "#383838",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  buttonWrapper: {
    marginBottom: 15,
  },
  button: {
    backgroundColor: color.btn_clr,

    color: "white",
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",

    fontWeight: "bold",
  },
});

export default User;
