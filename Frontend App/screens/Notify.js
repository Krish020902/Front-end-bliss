import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import * as Animatable from "react-native-animatable";
import NotificationBar from "../components/Notificationbar";
import { ScrollView, RefreshControl } from "react-native-gesture-handler";
import NetInfo from "@react-native-community/netinfo";
import { GET_USER_NOTIFICATION } from "../constants/api";
import axios from "axios";
import { useUserContext } from "../context/user_context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import {
  responsiveHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import color from "../theme/Colour";
const Notify = ({ navigation }) => {
  // var jwtdecode = require("jwt-decode");
  // var data;
  const { setUserPhone } = useUserContext();

  const [loading, setLoading] = useState(true);

  function convertDateFormat(inputDate) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dateParts = inputDate.split(" ");
    const day = dateParts[1];
    const month = months.indexOf(dateParts[2]) + 1;
    const year = dateParts[3];
    const totaltime = dateParts[4].split(":");
    const hour = totaltime[0];
    const min = totaltime[1];

    return `${day}/${month}/${year}      ${hour}:${min}`;
  }

  const [isConnected, setIsConnected] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const { phone } = useUserContext();
  const GetUserNotification = async () => {
    const token = await AsyncStorage.getItem("token");
    // data = jwtdecode(token);
    // setUserPhone(data.mobile);
    // console.log("phone is ", phone);
    const NotificationUrl = `${GET_USER_NOTIFICATION}${phone}`;

    // console.log("url is ", NotificationUrl);
    try {
      const notification = await axios.get(NotificationUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("date", notification.data.data[0].created_at);
      const formattedDate = convertDateFormat(
        notification.data.data[0].created_at
      );
      // console.log(formattedDate);
      setNotifications(notification.data.data);
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
      // setLoading(false);
      // notifications1 = notification.data.data;
      // console.log(notification.data.data[0].message_title);
    } catch (err) {
      console.log("this is error", err);
    }
  };
  useEffect(() => {
    const checkConnectivity = async () => {
      const netInfoState = await NetInfo.fetch();
      setIsConnected(netInfoState.isConnected);
    };

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    checkConnectivity();
    GetUserNotification();
    setLoading(false);

    return () => {
      unsubscribe();
    };
  }, [isConnected]);
  useEffect(() => {
    if (refreshing) {
      // console.log("get data");

      GetUserNotification();
    }
  }, [refreshing]);
  const [notifications, setNotifications] = useState([]);

  const handleClose = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return isConnected ? (
    <>
      <Text
        style={{
          fontSize: 25,
          paddingTop: 25,
          paddingLeft: 20,
          fontWeight: "500",
          // margin: 5,
          // marginLeft: 20,
          color: "white",
          backgroundColor: color.bg_clr,
          // backgroundColor: "#2d343c",
        }}
      >
        Notification
      </Text>
      <Spinner visible={loading} color="green" />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
            tintColor="#FF5733"
          />
        }
      >
        {notifications.map((notification) => {
          const newDate = convertDateFormat(notification.created_at);
          return (
            <NotificationBar
              key={notification.id}
              title={notification.message_title}
              message={notification.notification_message}
              date={newDate}
              onClose={() => handleClose(notification.id)}
              navigation={navigation}
            />
          );
        })}
        {notifications.length == 0 && (
          <View style={styles.Nonoti}>
            <Text style={{ fontSize: 20, color: "white" }}>
              No Notifications
            </Text>
          </View>
        )}
      </ScrollView>
    </>
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
  Nonoti: {
    height: responsiveHeight(80),
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // padding: 100,
    backgroundColor: color.bg_clr,
  },
});

export default Notify;
