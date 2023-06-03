import React, { useState } from "react";
import {
  View,
  StatusBar,
  TextInput,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { ToastProvider, useToast } from "react-native-toast-notifications";

import axios from "axios";
import { VERIFY_LOGIN, VERIFY_REGISTER_API } from "../constants/api";
import { useUserContext } from "../context/user_context";
import Timer from "../components/Timer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OTP = ({ navigation }) => {
  //   const [flag, setFlag] = useState(false);
  //   const handleTimer = () => {
    //     setFlag(true);
    //   };
    
    
    const [isError, setIsError] = useState(false);
    const [inCode, setInCode] = useState("");
    
    const {phone, otp} = useUserContext();
    
    const toast = useToast();
    const handleOtp = async() => {
    try{
      console.log("phone numebr",phone)
      console.log("code " , inCode)
      const res = await axios.post(VERIFY_REGISTER_API,  {
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
        otp:inCode
      });

      if(res.data.valid){
        console.log("inside valid")
        await AsyncStorage.setItem("token", res.data.access_token);
         toast.show("Signed up Successfully", {
      type: "success",
       placement: "top",
      animationType: "zoom-in",
    })
        navigation.navigate("MainDashboard");
      }
      else{
        setIsError(true);
        // console.log(err);
      }
    }
    catch(err){
      console.log("error is",err)
      setIsError(true);
    }
  }
  return (
    <ToastProvider>

    <View style={{ flex: 1, padding: 30, backgroundColor: "#3a3332"}}>
      <Image
        source={require("../assets/BlissQuantsTM.jpg")}
        style={styles.logo}
        />
      <Text style={{ color: "white", height: 40, marginTop: 20 }}>
        Enter Verification code sent to your registered number
      </Text>
      <OTPInputView
        style={{ width: "100%", height: 250, marginTop: -60 }}
        pinCount={6}
        placeholderTextColor="white"
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={(code) => {
          console.log(`Code is ${code}, you are good to go!`);
          setInCode(code);
        }}
        />
      <Text style={{ color: "white", height: 15, marginTop: -60 }}>
        Resend OTP in
        <Timer></Timer>
      </Text>


      <Text style={{ color: "white", height: 20, marginTop: 15 }}>
        your OTP is {otp}
      </Text>
      {
        isError && 
        <Text style={{ color: "white", height: 20, marginTop: 15 }}>
          OTP is Wrong
        </Text>
      }
      
      
        <TouchableOpacity
        onPress={handleOtp}
        style={{ backgroundColor: "rgb(132,194,37)", padding: 10, marginTop: 20}}
        >
        <Text style={{ color: "white", textAlign:"center"}}>Go To Dashboard</Text>
      </TouchableOpacity>
        <Image
          source={require("../assets/FooterLogo.png")}
          style={styles.footlogo}
          />

      
    </View>
</ToastProvider>
  );
};
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
  },
  logo: {
    // marginLeft: 35,
    marginTop: 60,
    alignSelf: "center",
    width: 300,
    height: 80,
  },
  borderStyleHighLighted: {
    borderColor: "white",
  },
  footlogo: {
    marginTop: 150,
    alignSelf: "center",
    width: 350,
    height: 175,
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "rgb(132,194,37)",
  },
});


export default OTP;
