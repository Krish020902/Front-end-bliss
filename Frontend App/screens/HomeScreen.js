import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import PopupBox from "../components/PopupBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Button, Input, Icon } from "@rneui/base";
import NetInfo from "@react-native-community/netinfo";
import * as Animatable from "react-native-animatable";

import React, { useState, useEffect, useRef } from "react";
import { useToast } from "react-native-toast-notifications";
import { GET_USER_DATA } from "../constants/api";
import { useUserContext } from "../context/user_context";
import axios from "axios";
import { Button, Input, Icon, Card } from "@rneui/base";
import { Text } from "@rneui/themed";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import Svg, { Path } from "react-native-svg";
import color from "../theme/Colour";
const HomeScreen = ({ navigation }) => {
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

  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const textArray = [
    "Options Delta Hedging",
    "Stocks and Options Trading ",
    "Derivatives Trading Strategies",
  ];
  const typingDelay = 100;
  const backspaceDelay = 50;
  const pauseDelay = 1000;
  useEffect(() => {
    const currentText = textArray[textIndex];
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentIndex === currentText.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          startBackspace();
        }, pauseDelay);
        return;
      }
      setDisplayText((prevText) => prevText + currentText[currentIndex]);
      currentIndex++;
    }, typingDelay);

    const startBackspace = () => {
      let backspaceIndex = currentText.length - 1;

      const backspaceInterval = setInterval(() => {
        if (backspaceIndex === -1) {
          clearInterval(backspaceInterval);
          setTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
          return;
        }
        setDisplayText((prevText) => prevText.slice(0, -1));
        backspaceIndex--;
      }, backspaceDelay);
    };

    return () => {
      clearInterval(typingInterval);
    };
  }, [textIndex]);

  //   return (
  //     <Text style={styles.text}>{displayText}</Text>
  //   );
  // };

  const buttons = [
    { title: "High IV", icon: "trending-up" },
    { title: "Huge IV Gap Up", icon: "bar-chart" },
    { title: "Low IV", icon: "trending-down" },
    { title: "Index Spreads", icon: "lightbulb-outline" },
  ];
  const [button, setButton] = useState(0);
  const ClickHighIV = () => {
    navigation.navigate("HighIV");
  };
  const ClickLowIV = () => {
    navigation.navigate("LowIV");
  };
  const HugeGapUp = () => {
    navigation.navigate("HugeGapUp");
  };
  const ClickNifty = () => {
    navigation.navigate("NiftyStrategies");
  };
  return isConnected ? (
    // <View style={styles.container}>
    //   <Svg
    //     // height="24.0215%"
    //     // width="100%"
    //     xmlns="http://www.w3.org/2000/svg"
    //     viewBox="0 0 1440 320"
    //   >
    //     <Path
    //       fill="#3a3332"
    //       fill-opacity="1"
    //       d="M0,256L60,234.7C120,213,240,171,360,160C480,149,600,171,720,192C840,213,960,235,1080,229.3C1200,224,1320,192,1380,176L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
    //     ></Path>
    //   </Svg>
    // </View>
    <>
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: color.bg_clr,
            height: 160,
          }}
        >
          <Image
            source={require("../assets/BlissQuantsTM.png")}
            style={styles.logo}
          />

          <Svg
            height="60%"
            width="100%"
            viewBox="0 0 1440 320"
            style={{
              position: "absolute",
              top: 130,
            }}
          >
            <Path
              fill="#3a3332"
              fill-opacity="1"
              d="M0,256L60,234.7C120,213,240,171,360,160C480,149,600,171,720,192C840,213,960,235,1080,229.3C1200,224,1320,192,1380,176L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            ></Path>
          </Svg>
        </View>
        <Text style={styles.text}>{displayText}</Text>
        <View
          style={{
            flexDirection: "row",
            marginTop: 50,
            //   width: responsiveWidth(100),
          }}
        >
          <View style={styles.buttonGroup}>
            <Button
              key={0}
              onPress={ClickHighIV}
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
            >
              <Icon name={buttons[0].icon} size={50} color="#008000" />

              <Text style={styles.label}>{buttons[0].title}</Text>
            </Button>
            <Button
              key={1}
              onPress={HugeGapUp}
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
            >
              <Icon name={buttons[1].icon} size={50} color="#0000FF" />
              <Text style={styles.label}>{buttons[1].title}</Text>
            </Button>
          </View>
          <View style={styles.buttonGroup}>
            <Button
              key={2}
              onPress={ClickLowIV}
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
            >
              <Icon name={buttons[2].icon} size={50} color="#8B0000" />
              <Text style={styles.label}>{buttons[2].title}</Text>
            </Button>
            <Button
              key={3}
              onPress={ClickNifty}
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
            >
              <Icon name={buttons[3].icon} size={50} color="#FFC300" />
              <Text style={styles.label}>{buttons[3].title}</Text>
            </Button>
          </View>
        </View>
      </View>
    </>
  ) : (
    <View style={styles.container}>
      <View style={{ backgroundColor: color.bg_clr, height: 160 }}>
        <Image
          source={require("../assets/BlissQuantsTM.png")}
          style={styles.logo}
        />

        <Svg
          height="60%"
          width="100%"
          viewBox="0 0 1440 320"
          style={{
            position: "absolute",
            top: 130,
          }}
        >
          <Path
            fill="#3a3332"
            fill-opacity="1"
            d="M0,256L60,234.7C120,213,240,171,360,160C480,149,600,171,720,192C840,213,960,235,1080,229.3C1200,224,1320,192,1380,176L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></Path>
        </Svg>
      </View>

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
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginTop: 55,
    justifyContent: "flex-start",
    alignSelf: "center",
    fontSize: responsiveFontSize(3),
  },
  logo: {
    // marginLeft: 35,
    marginTop: 60,
    alignSelf: "center",
    width: 300,
    height: 80,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  buttonGroup: {
    // backgroundColor: "black",
    // borderWidth: 2,
    borderColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    padding: 40,
    backgroundColor: "white",
    color: "red",
    flexDirection: "column",
    borderRadius: 15,
  },

  label: {
    // fontWeight: "bold",
    marginBottom: 5,
    color: color.bg_clr,
  },
  buttonContainer: {
    borderWidth: 1,
    borderColor: color.bg_clr,
    borderRadius: 15,

    // backgroundColor: "black",
    elevation: 10,
    shadowColor: color.bg_clr,
    shadowOpacity: 0,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    // height: responsiveHeight(20),
    width: responsiveWidth(35),
    justifyContent: "flex-end",
    marginBottom: 30,
  },
});

export default HomeScreen;
