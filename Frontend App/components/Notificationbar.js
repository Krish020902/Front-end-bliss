import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import color from "../theme/Colour";
const NotificationBar = ({ title, message, date, onClose }) => {
  const shortmessage = message.substring(0, 100);
  const [more, setMore] = useState(true);
  const ClickMore = () => {
    setMore(!more);
  };
  return (
    <View
      style={{
        ...styles.container,
        height: more ? responsiveHeight(12) : responsiveHeight(20),
      }}
    >
      <View style={styles.notificationContent}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {message.length > 180 && more ? (
            <Text style={styles.message}>{shortmessage}</Text>
          ) : (
            <Text style={styles.message}>{message}</Text>
          )}
          {message.length > 180 ? (
            <>
              <TouchableOpacity onPress={() => ClickMore()}>
                {more && <Text style={styles.clickmore}>Read more</Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => ClickMore()}>
                {!more && <Text style={styles.clickclose}>close</Text>}
              </TouchableOpacity>
            </>
          ) : null}
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    opacity: 0.8,
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    borderRadius: 20,
    width: responsiveWidth(97),
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: -10,

    // paddingVertical: 12,
    // height: more ? responsiveHeight(12) : responsiveHeight(20),
    margin: 8,
  },
  clickmore: {
    color: "blue",
  },
  clickclose: {
    color: "red",
  },
  notificationContent: {
    flexDirection: "row",
    flex: 1,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
  },
  dateContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
  },
  date: {
    fontSize: 12,
    color: "#888",
    position: "absolute",
    right: 70,
    top: 4,
  },
  closeButton: {
    backgroundColor: "#e6e6e6",
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default NotificationBar;
