import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useDashboardContext } from "../context/dashboard_context";
import DropdownCompany from "../components/DropdownCompany";
import DropdownGraph from "../components/DropdownGraph";
import DropdownTable from "../components/DropdownTable";
import Navbar from "../components/Navbar";
import PopupBox from "../components/PopupBox";
import SetPassword from "./SetPassword";
import { Button } from "@rneui/base";
import { responsiveHeight } from "react-native-responsive-dimensions";
import color from "../theme/Colour";
const Dashboard = ({ navigation }) => {
  // const companyname = route.params;
  // console.log("recieving success", companyname);

  return (
    <View style={styles.container}>
      <PopupBox navigation={navigation} />
      <Navbar />
      {/* <Button title="Solid" type="solid"  /> */}
      {/* <Button title="Solid" type="solid" loading={false} />; */}
      <DropdownCompany />
      <DropdownGraph />
      <DropdownTable />
      {/* <Text>hello</Text> */}
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
