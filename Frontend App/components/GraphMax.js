import { Icon } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
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
export default function GraphMax() {
  const { width, height } = Dimensions.get("screen");
  // console.log(typeof width);

  Totalwidth = 2 * width - width * 0.055;
  // console.log(Totalwidth);

  const INJECTEDJAVASCRIPT = `
  const meta = document.createElement('meta');
  meta.setAttribute('content', 'width=device-width, height=device-height, initial-scale=0.5, maximum-scale=6, user-scalable=0');
  meta.setAttribute('name', 'viewport');
  document.getElementsByTagName('head')[0].appendChild(meta);
`;

  return (
    <View style={[styles.graph, { width: Totalwidth - 2 }]}>
      <WebView
        source={{ uri: "https://www.blissquants.com/BlissDeltaChart" }}
        injectedJavaScript={INJECTEDJAVASCRIPT}
        style={{ flex: 1 }}
        scrollEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  graph: {
    backgroundColor: color.bg_clr,
    flex: 1,
    marginTop: 25,
    marginLeft: -367,

    // height: Totalwidth,
    transform: [{ rotate: "90deg" }],
  },
});
