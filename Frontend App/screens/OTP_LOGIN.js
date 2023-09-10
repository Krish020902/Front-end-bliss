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
import { Button, Input, Icon } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { registerIndieID } from "native-notify";
import color from "../theme/Colour";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import axios from "axios";
import { VERIFY_LOGIN, VERIFY_REGISTER_API } from "../constants/api";
import { useUserContext } from "../context/user_context";
import Timer from "../components/Timer";

const OTP_LOGIN = ({ navigation }) => {
  //   const [flag, setFlag] = useState(false);
  //   const handleTimer = () => {
  //     setFlag(true);
  //   };

  const [isError, setIsError] = useState(false);
  const [inCode, setInCode] = useState("");

  const { phone, otp } = useUserContext();

  const toast = useToast();
  const handleOtp = async () => {
    try {
      console.log("phone numebr", phone);
      console.log("code ", inCode);
      const res = await axios.post(VERIFY_LOGIN, {
        mobile: phone,
        otp: inCode,
      });

      if (res.data.valid) {
        await AsyncStorage.setItem("token", res.data.access_token);
        // registerIndieID(`${phone}`, 10536, 'VbOlb9uQLyJKJsVilsiAZY');
        // const noti = await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
        //       subID: `${phone}`,
        //       appId: 10536,
        //       appToken: 'VbOlb9uQLyJKJsVilsiAZY',
        //       title: 'testing bliss 123',
        //       message: 'testing bliss 123'
        // });

        // console.log("after notification adasdasda");

        toast.show("Logged in Successfull! ", {
          type: "success",
          placement: "top",
          animationType: "zoom-in",
        });
        navigation.navigate("MainDashboard");
      } else {
        toast.show("Incorrect Otp", {
          type: "danger",
          placement: "top",
          animationType: "zoom-in",
        });
        setIsError(true);
        console.log(err);
      }
    } catch (err) {
      console.log("error is", err);
      toast.show("error:", err, {
        type: "danger",
        placement: "top",
        animationType: "zoom-in",
      });
      setIsError(true);
    }
  };
  return (
    <ToastProvider>
      <View style={{ flex: 1, padding: 30, backgroundColor: color.bg_clr }}>
        <Image
          source={require("../assets/BlissQuantsTM.png")}
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
        <Text style={{ color: "white", height: 20, marginTop: -60 }}>
          Resend OTP in
          <Timer></Timer>
        </Text>

        <Text style={{ color: "white", height: 20, marginTop: 15 }}>
          your OTP is {otp}
        </Text>
        {isError && (
          <Text style={{ color: "white", height: 20, marginTop: 15 }}>
            OTP is Wrong
          </Text>
        )}

        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 30 }}>
          <Button
            title="Go to dashboard"
            color={color.btn_clr}
            onPress={handleOtp}
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
    backgroundColor: color.bg_secondary_clr,
  },

  underlineStyleHighLighted: {
    borderColor: color.btn_clr,
  },
});

export default OTP_LOGIN;
