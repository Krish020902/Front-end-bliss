import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useDashboardContext } from "../context/dashboard_context";
// import DropdownCompany from "../components/DropdownCompany";
import DropdownGraph from "../components/DropdownGraph";
import DropdownTable from "../components/DropdownTable";
import Navbar from "../components/Navbar";
import PopupBox from "../components/PopupBox";
import SetPassword from "./SetPassword";
import { Button } from "@rneui/base";
import SearchComp from "./SearchComp";
import { responsiveHeight } from "react-native-responsive-dimensions";
import color from "../theme/Colour";
import WebViewGraph from "../components/WebViewGraph";
// import { CHANGE_SELECTED_IV_COMPANY } from "../action";
const CompScreen = ({ navigation }) => {
  // const companyname = route.params;
  // console.log("recieving success", companyname);
  return (
    <View style={styles.container}>
      <PopupBox navigation={navigation} />
      <Navbar />
      {/* <Button title="Solid" type="solid"  /> */}
      {/* <Button title="Solid" type="solid" loading={false} />; */}
      <SearchComp />
      <WebViewGraph navigation={navigation} />
      {/* <DropdownGraph /> */}
      <DropdownTable />
      {/* <Text>hello</Text> */}
    </View>
  );
};

export default CompScreen;

const styles = StyleSheet.create({
  container: {
    // height: responsiveHeight(100),
    flex: 1,
    backgroundColor: color.bg_clr,
  },
});
