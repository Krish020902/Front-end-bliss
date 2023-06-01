import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState } from "react";

const User = () => {
  const userData = {
    name: "Krish Mehta",
    email: "krish.mehta.3822@gmail.com",
    phoneNumber: "+91-8401265994",
  };
  const [buttonOpacity] = useState(new Animated.Value(1));

  const handleLogout = () => {
    // Animated.timing(buttonOpacity, {
    //   toValue: 0.5,
    //   duration: 200,
    //   useNativeDriver: true,
    // }).start(() => {
    //   // Handle logout functionality
    //   // ...
    //   // Reset button opacity
    //   Animated.timing(buttonOpacity, {
    //     toValue: 1,
    //     duration: 200,
    //     useNativeDriver: true,
    //   }).start();
    // });
    // Handle logout functionality
    // ...
  };

  const handleChangePassword = () => {
    // Animated.timing(buttonOpacity, {
    //   toValue: 0.5,
    //   duration: 200,
    //   useNativeDriver: true,
    // }).start(() => {
    //   // Handle change password functionality
    //   // ...
    //   // Reset button opacity
    //   Animated.timing(buttonOpacity, {
    //     toValue: 1,
    //     duration: 200,
    //     useNativeDriver: true,
    //   }).start();
    // });
    // Handle change password functionality
    // ...
  };

  const handleEditProfile = () => {
    // Animated.timing(buttonOpacity, {
    //   toValue: 0.5,
    //   duration: 200,
    //   useNativeDriver: true,
    // }).start(() => {
    //   // Handle edit profile functionality
    //   // ...
    //   // Reset button opacity
    //   Animated.timing(buttonOpacity, {
    //     toValue: 1,
    //     duration: 200,
    //     useNativeDriver: true,
    //   }).start();
    // });
    // Handle edit profile functionality
    // ...
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginBottom: 3,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            paddingTop: 20,
            paddingLeft: 7,
            fontWeight: "500",
            // margin: 5,
            // marginTop: 20,
            color: "white",
            backgroundColor: "#75706f",
          }}
        >
          My Account
        </Text>
      </View>
      <View style={styles.profileContainer}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.detail}>Krish Mehta</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.detail}>krish.mehta.3822@gmail.com</Text>

        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.detail}>+91-8401265994</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Animated.View
          style={[styles.buttonWrapper, { opacity: buttonOpacity }]}
        >
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={{ color: "white" }}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[styles.buttonWrapper, { opacity: buttonOpacity }]}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}
          >
            <Text style={{ color: "white" }}>Change Password</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[styles.buttonWrapper, { opacity: buttonOpacity }]}
        >
          <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
            <Text style={{ color: "white" }}>Edit Profile</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3a3332",
  },
  profileContainer: {
    // flex: 1,
    backgroundColor: "#75706f",
    marginBottom: "75%",
    // alignItems: "center",
    // justifyContent: "center",
    padding: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  detail: {
    marginBottom: 10,
    fontSize: 16,
    color: "white",
  },
  buttonContainer: {
    // padding: 20,
  },
  buttonWrapper: {
    // width: "100%",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "rgb(132,194,37)",
    color: "white",
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",

    fontWeight: "bold",
  },
});

export default User;
