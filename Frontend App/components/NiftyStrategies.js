import { Icon } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";
import { WebView } from "react-native-webview";
import color from "../theme/Colour";
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveWidth,
} from "react-native-responsive-dimensions";
let Totalwidth;
export default function NiftyStrategies() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/UnderMaintenance.png")}
        style={styles.watermark}
      ></ImageBackground>
      <Text style={{ color: "white", marginTop: 300, fontSize: 25 }}>
        {" "}
        Coming Soon...
      </Text>
      {/* <Text style={{ color: color.txt_clr }}>Under Maintenance</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  watermark: {
    position: "absolute",
    top: 210,
    marginTop: 80,
    height: 270,
    width: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: color.bg_clr,

    alignItems: "center",
    justifyContent: "center",
  },
});
