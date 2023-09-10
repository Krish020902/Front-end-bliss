import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Dashboard from "./Dashboard";
import HomeScreen from "./HomeScreen";
// import Notify from "./Notify";
import Notify from "../screens/Notify";
import Icon from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { createBottomTabNavigator } from "@rn-wave-bottom-bar";
import color from "../theme/Colour";
import DropdownCompany from "../components/DropdownCompany";
import User from "./User";

const MainDashboard = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, colorname, size }) => {
          let iconName;

          if (route.name === "Analysis") {
            iconName = "line-chart";
            size = focused ? 25 : 20;
            colorname = focused ? color.btn_clr : "black";
          } else if (route.name === "Profile") {
            iconName = "user";
            size = focused ? 25 : 20;
            colorname = focused ? color.btn_clr : "black";
          } else if (route.name === "Home") {
            iconName = "home";
            size = focused ? 25 : 20;
            colorname = focused ? color.btn_clr : "black";
          } else if (route.name === "Notification") {
            iconName = "bell";
            size = focused ? 25 : 20;
            colorname = focused ? color.btn_clr : "black";
          }

          return <Icon name={iconName} size={size} color={colorname} />;
        },
        headerShown: false,
      })}
      tabBarOptions={{
        activeTintColor: color.btn_clr,
        inactiveTintColor: "gray",
        activeBackgroundColor: "grey",
        inactiveBackgroundColor: "white",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Analysis" component={Dashboard} />
      <Tab.Screen name="Notification" component={Notify} />
      <Tab.Screen name="Profile" component={User} />
    </Tab.Navigator>
  );
};

export default MainDashboard;
