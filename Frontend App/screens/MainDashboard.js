import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Dashboard from "./Dashboard";
import Icon from "react-native-vector-icons/FontAwesome";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DropdownCompany from "../components/DropdownCompany";
import User from "./User";
const MainDashboard = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = "home";
            size = focused ? 25 : 20;
            color = focused ? "rgb(132,194,37)" : "black";
          } else if (route.name === "Profile") {
            iconName = "user";
            size = focused ? 25 : 20;
            color = focused ? "rgb(132,194,37)" : "black";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        headerShown: false,
      })}
      tabBarOptions={{
        activeTintColor: "rgb(132,194,37)",
        inactiveTintColor: "gray",
        activeBackgroundColor: "grey",
        inactiveBackgroundColor: "white",
      }}
    >
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Profile" component={User} />
    </Tab.Navigator>
    // </View>
  );
};

export default MainDashboard;
