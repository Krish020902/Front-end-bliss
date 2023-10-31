import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useDashboardContext } from "../context/dashboard_context";
import DropdownCompany from "../components/DropdownCompany";
import DropdownGraph from "../components/DropdownGraph";
import DropdownTable from "../components/DropdownTable";
import Navbar from "../components/Navbar";
import PopupBox from "../components/PopupBox";
import SetPassword from "./SetPassword";
import { Button } from "@rneui/base";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import color from "../theme/Colour";
import TradingChart from "../components/Linegraph";
import WebView from "react-native-webview";

import WebViewGraph from "../components/WebViewGraph";
// import { ScreenOrientation } from "expo-screen-orientation";
const Dashboard = ({ navigation }) => {
  // const companyname = route.params;
  // console.log("recieving success", companyname);
  const webViewRef = useRef(null);
  // useEffect(() => {
  //   Orientation.lockToPortrait(); // or Orientation.lockToLandscape()

  //   const handleOrientationChange = (orientation) => {
  //     console.log("oreintation", orientation);
  //     if (orientation === "LANDSCAPE") {
  //       // Lock WebView to landscape mode
  //       Orientation.lockToLandscape();
  //     } else {
  //       // Lock WebView to portrait mode
  //       Orientation.lockToPortrait();
  //     }
  //   };

  //   Orientation.addOrientationListener(handleOrientationChange);

  //   return () => {
  //     Orientation.removeOrientationListener(handleOrientationChange);
  //   };
  // }, []);

  return (
    <View style={styles.container}>
      <PopupBox navigation={navigation} />
      <Navbar />

      <DropdownCompany />
      <WebViewGraph navigation={navigation} />
      <DropdownTable />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    // height: responsiveHeight(100),
    flex: 1,
    backgroundColor: color.bg_clr,
  },
});
