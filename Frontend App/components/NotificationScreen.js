import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { responsiveWidth } from "react-native-responsive-dimensions";
import color from "../theme/Colour";
import { useRoute } from "@react-navigation/native";
const NotificationScreen = (Notify) => {
  // const route = useRoute();
  // const title =
  const title = Notify.route.params.title;
  const message = Notify.route.params.message;

  return (
    <View style={styles.container}>
      <View style={styles.notification}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line} />
        <ScrollView>
          <Text style={styles.message}>{message}</Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg_clr,
    // justifyContent: "center",
    alignItems: "center",
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: color.txt_clr,
    width: "100%",
    marginBottom: 20,
  },
  notification: {
    padding: 20,
    borderRadius: 10,
    width: "100%",
  },
  title: {
    // justifyContent: "flex-start",

    // marginTop: 130,
    fontSize: 24,
    fontWeight: "bold",
    color: color.txt_clr,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: color.txt_clr,
  },
});

export default NotificationScreen;
