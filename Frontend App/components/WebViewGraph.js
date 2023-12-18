import { Icon } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { responsiveScreenWidth } from "react-native-responsive-dimensions";
import { WebView } from "react-native-webview";
import { useDashboardContext } from "../context/dashboard_context";
import { useEffect, useRef, useState } from "react";

export default function WebViewGraph({ navigation }) {
  const { currCompany, currTypeOfGraph } = useDashboardContext();
  const { width, height } = Dimensions.get("window");
  const Relativeleft = width / 2.28;
  const [reload, setReload] = useState(1);
  const webViewRef = useRef();

  const ClickToFullScreen = () => {
    navigation.navigate("GraphMax");
  };
  //   useEffect(() => {
  // webViewRef.current.reload();
  //   }, [])
  useEffect(() => {
    navigation.navigate("Analysis");
    console.log(
      `https://www.blissquants.com/BlissDeltaChart?%20search1=${currCompany.toUpperCase()}&chart_type=${currTypeOfGraph}`
    );
  }, [currCompany, currTypeOfGraph]);
  const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.65, maximum-scale=0.99, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `;
  return (
    <>
      <WebView
        ref={(ref) => (webViewRef.current = ref)}
        key={currCompany - currTypeOfGraph}
        source={{
          uri: `https://www.blissquants.com/BlissDeltaChart?%20search1=${currCompany.toUpperCase()}&chart_type=${currTypeOfGraph.toLowerCase()}`,
        }}
        injectedJavaScript={INJECTEDJAVASCRIPT}
        style={[styles.webview]}
      />
      <TouchableOpacity
        style={{ position: "relative", left: Relativeleft, bottom: 40 }}
        onPress={ClickToFullScreen}
      >
        <Icon name="fullscreen" color="white"></Icon>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  webview: {
    flex: 1,
    marginLeft: 7,
    width: responsiveScreenWidth(100),
  },
});
