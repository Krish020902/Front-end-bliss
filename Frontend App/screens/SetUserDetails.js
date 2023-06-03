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

import FloatingLabelInput from "../components/FloatingLabelInput";
import { useUserContext } from "../context/user_context";
import axios from "axios";
import { UPDATE_USER_DATA } from "../constants/api";

const SetUserDetails = ({ navigation }) => {
  const { setUserEmail, setUserName, email, name, phone , setUserPhone} = useUserContext();
  const toast = useToast();



  const login = async () => {
   
   const token = await AsyncStorage.getItem("token");
const infourl = `${UPDATE_USER_DATA}/${phone}`
    try {
      // console.log(typeof setUserEmail);
      // console.log("email and aps5s", password);
      const res = await axios.put(infourl, {
        "birthyear": "",
        "company": "",
        "country": "",
        "email": email,
        "email_org": "",
        "first_date": "",
        "interest": "",
        "leader_name": "",
        "mobile": phone,
        "name": name,
        "passreset": "",
        "password": "",
        "pincode": "",
        "plan": "",
        "register_date": "",
        "role": "",
        "session_id": "",
        "status": ""
},{
        headers:{
          Authorization:`Bearer ${token}`
        } 
      });

      if (res.data.valid) {
        console.log(res.data.message);
         toast.show("Details updated Successfully!", {
      type: "success",
    })
        navigation.navigate("MainDashboard");
      } else {
        console.log("some error", err);
      }
    } catch (err) {
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
      <TextInput
              
        

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
        onChangeText={(change)=>{setUserName(change)}}
      />
     
      <Text style={styles.font}>Phone</Text>
      <TextInput
              
        

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
        onChangeText={(change)=>{setUserPhone(change)}}
      />
      <Text style={styles.font}>Email</Text>
      <TextInput
        
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
        onChangeText={(change)=>{setUserEmail(change)}}
      />
      <TouchableOpacity
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
      />
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
