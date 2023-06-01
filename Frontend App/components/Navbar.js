import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
const Navbar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/BlissQuantsTM.jpg")}
          style={styles.logo}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 45,
    width: 390,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#3a3332",
    height: 50,
    paddingHorizontal: 10,
  },
  logoContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  logo: {
    height: 50,
    width: 190,
  },
  adminContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  adminLogo: {
    marginRight: 20,
    height: 35,
    width: 35,
  },
});

export default Navbar;
