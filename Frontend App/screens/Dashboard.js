import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useDashboardContext } from "../context/dashboard_context";
import DropdownCompany from "../components/DropdownCompany";
import DropdownGraph from "../components/DropdownGraph";
import DropdownTable from "../components/DropdownTable";
import Navbar from "../components/Navbar";
import PopupBox from "./PopupBox";
import SetPassword from "./SetPassword";

const Dashboard = ({navigation}) => {


  return (
    <View style={styles.container}>
      <PopupBox navigation={navigation}/>

      <Navbar />

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
    backgroundColor: "#3a3332",
  },
});
