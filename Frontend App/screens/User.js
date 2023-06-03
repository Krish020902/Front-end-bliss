import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { useState , useEffect } from "react";
import { useToast } from "react-native-toast-notifications";
import { GET_USER_DATA } from "../constants/api";
import { useUserContext } from "../context/user_context";
import axios from "axios";

const User = ({navigation}) => {
    const {  name , email, phone , setUserEmail , setUserName } = useUserContext();

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
    })
    navigation.navigate("Login");
    
  };

  const handleChangePassword = () => {
    navigation.navigate("ResetPass");
    
  };

  const handleEditProfile = () => {
    navigation.navigate('SetUserDetails')
  };
  const getUserdata  = async () => {
    const resultUrl = `${GET_USER_DATA}/${phone}`;
    
    const token = await AsyncStorage.getItem("token");
    try {
      const result = await axios.get(resultUrl, {
        headers:{
          Authorization:`Bearer ${token}`
        } 
      });
      setUserEmail(result.data.data.email);
      setUserName(result.data.data.name);
      console.log("this is result",result.data.data.email)

      
    } catch (err) {
      console.log(err);
    }
  };
useEffect(() => {
    getUserdata();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginBottom: 3,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            paddingTop: 20,
            paddingLeft: 7,
            fontWeight: "500",
            // margin: 5,
            // marginTop: 20,
            color: "white",
            backgroundColor: "#75706f",
          }}
        >
          My Account
        </Text>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.label}>Name:</Text>
        
        <Text style={styles.detail}>{userData.name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.detail}>{userData.email}</Text>

        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.detail}>{userData.phone}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Animated.View
          style={[styles.buttonWrapper, { opacity: buttonOpacity }]}
        >
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={{ color: "white" }}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[styles.buttonWrapper, { opacity: buttonOpacity }]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}
          >
            <Text style={{ color: "white" }}>Change Password</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[styles.buttonWrapper, { opacity: buttonOpacity }]}
        >
          <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
            <Text style={{ color: "white" }}>Edit Profile</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3a3332",
  },
  profileContainer: {
    // flex: 1,
    backgroundColor: "#75706f",
    marginBottom: "75%",
    // alignItems: "center",
    // justifyContent: "center",
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  detail: {
    marginBottom: 10,
    fontSize: 16,
    color: "white",
  },
  buttonContainer: {
    // padding: 20,
  },
  buttonWrapper: {
    // width: "100%",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "rgb(132,194,37)",
    color: "white",
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",

    fontWeight: "bold",
  },
});

export default User
