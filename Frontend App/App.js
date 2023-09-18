import { StyleSheet, Text, View } from "react-native";
import { UserProvider } from "./context/user_context";
import SearchComp from "./screens/SearchComp";
import { DashboardProvider } from "./context/dashboard_context";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import Home from "./screens/Home";
import MobileNo from "./screens/MobileNo";
import OTP_REGISTER from "./screens/OTP_REGISTER";
import OTP_LOGIN from "./screens/OTP_LOGIN";
import MainDashboard from "./screens/MainDashboard";
import Icon from "react-native-vector-icons/FontAwesome";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login_Pass from "./screens/Login_Pass";
import SetPassword from "./screens/SetPassword";
import { ToastProvider, useToast } from "react-native-toast-notifications";
import NewPass from "./screens/NewPass";
import ForgotPass from "./screens/ForgotPass";
import Notify from "./screens/Notify";
import ForgotOtp from "./screens/ForgotOtp";
import ResetPass from "./screens/ResetPass";
import SetUserDetails from "./screens/SetUserDetails";
import HighIV from "./components/HighIV";
import LowIV from "./components/LowIV";
import NotificationBar from "./components/Notificationbar";
import CompScreen from "./screens/CompScreen";
import HugeGapUp from "./components/HugeGapUp";
const Stack = createStackNavigator();
import registerNNPushToken from "native-notify";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function App() {
  registerNNPushToken(10536, "VbOlb9uQLyJKJsVilsiAZY");
  const Tab = createBottomTabNavigator();
  const Check = () => {
    return (
      <View styles={styles.container}>
        <Text>hello</Text>
      </View>
    );
  };
  return (
    <ToastProvider offsetTop={30}>
      <UserProvider>
        <DashboardProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {/* <Stack.Screen name="Home" component={Home} /> */}
              <Stack.Screen name="MainDashboard" component={MainDashboard} />
              <Stack.Screen name="Login_Pass" component={Login_Pass} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="MobileNo" component={MobileNo} />
              <Stack.Screen name="HighIV" component={HighIV} />
              <Stack.Screen name="LowIV" component={LowIV} />
              <Stack.Screen name="HugeGapUp" component={HugeGapUp} />

              <Stack.Screen name="OTP_REGISTER" component={OTP_REGISTER} />
              <Stack.Screen name="OTP_LOGIN" component={OTP_LOGIN} />
              <Stack.Screen name="SetPassword" component={SetPassword} />
              <Stack.Screen name="ForgotPass" component={ForgotPass} />
              <Stack.Screen name="NewPass" component={NewPass} />
              <Stack.Screen name="ForgotOtp" component={ForgotOtp} />
              <Stack.Screen name="ResetPass" component={ResetPass} />
              <Stack.Screen name="SetUserDetails" component={SetUserDetails} />
              <Stack.Screen name="Notify" component={Notify} />
              <Stack.Screen name="Dashboard" component={CompScreen} />

              {/* <Stack.Screen name="SearchComp" component={SearchComp} /> */}
              <Stack.Screen
                name="NotificationBar"
                component={NotificationBar}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </DashboardProvider>
      </UserProvider>
    </ToastProvider>
  );
}
