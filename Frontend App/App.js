import { StyleSheet, Text, View } from "react-native";
import { UserProvider } from "./context/user_context";
import Dashboard from "./screens/Dashboard";
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
import Email from "./screens/Email";
import SetPassword from "./screens/SetPassword";
import { ToastProvider, useToast } from "react-native-toast-notifications";
import NewPass from "./screens/NewPass";
import ForgotPass from "./screens/ForgotPass";
import ForgotOtp from "./screens/ForgotOtp";
import ResetPass from "./screens/ResetPass";
import SetUserDetails from "./screens/SetUserDetails";
import HighIV from "./screens/HighIV";
import LowIV from "./screens/LowIV";
const Stack = createStackNavigator();

export default function App() {
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
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="MobileNo" component={MobileNo} />
              <Stack.Screen name="Email" component={Email} />
              <Stack.Screen name="MainDashboard" component={MainDashboard} />
              <Stack.Screen name="HighIV" component={HighIV} />
              <Stack.Screen name="LowIV" component={LowIV} />

              <Stack.Screen name="OTP_REGISTER" component={OTP_REGISTER} />
              <Stack.Screen name="OTP_LOGIN" component={OTP_LOGIN} />
              <Stack.Screen name="SetPassword" component={SetPassword} />
              <Stack.Screen name="ForgotPass" component={ForgotPass} />
              <Stack.Screen name="NewPass" component={NewPass} />
              <Stack.Screen name="ForgotOtp" component={ForgotOtp} />
              <Stack.Screen name="ResetPass" component={ResetPass} />
              <Stack.Screen name="SetUserDetails" component={SetUserDetails} />
            </Stack.Navigator>
          </NavigationContainer>
        </DashboardProvider>
      </UserProvider>
    </ToastProvider>
  );
}
