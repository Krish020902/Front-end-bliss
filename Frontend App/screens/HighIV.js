import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";

const HighIV = () => {
  // Sample data for demonstration
  const stockData = [
    { name: "Stock 1", price: 100 },
    { name: "Stock 2", price: 150 },
    { name: "Stock 3", price: 120 },
    { name: "Stock 4", price: 80 },
    { name: "Stock 5", price: 200 },
    { name: "Stock 6", price: 110 },
    { name: "Stock 7", price: 90 },
    { name: "Stock 8", price: 130 },
    { name: "Stock 9", price: 180 },
    { name: "Stock 9", price: 180 },
    { name: "Stock 9", price: 180 },
    { name: "Stock 9", price: 180 },
  ];

  const [selectedValue, setSelectedValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownHeight, setDropdownHeight] = useState(new Animated.Value(0));

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const openDropdown = () => {
    setIsOpen(true);
    Animated.timing(dropdownHeight, {
      toValue: 100, // Set the desired height of the dropdown
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const closeDropdown = () => {
    setIsOpen(false);
    Animated.timing(dropdownHeight, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleOptionSelect = (option) => {
    setSelectedValue(option);
    closeDropdown();
  };

  return (
    <View>
      <View style={{ marginTop: 50 }}>
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <View style={styles.dropdownButton}>
            <Text>{selectedValue || "Select an option"}</Text>
          </View>
        </TouchableWithoutFeedback>

        {isOpen && (
          <Animated.View
            style={[styles.dropdownContainer, { height: dropdownHeight }]}
          >
            <TouchableWithoutFeedback onPress={closeDropdown}>
              <View style={styles.overlay} />
            </TouchableWithoutFeedback>

            <View style={styles.optionsContainer}>
              <TouchableWithoutFeedback
                onPress={() => handleOptionSelect("Option 1")}
              >
                <View style={styles.option}>
                  <Text>Option 1</Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => handleOptionSelect("Option 2")}
              >
                <View style={styles.option}>
                  <Text>Option 2</Text>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback
                onPress={() => handleOptionSelect("Option 3")}
              >
                <View style={styles.option}>
                  <Text>Option 3</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </Animated.View>
        )}
      </View>
      <View style={styles.container}>
        {stockData.map((stock, index) => (
          <View
            key={index}
            style={{
              width: "33.33%",
              height: 100,
              backgroundColor:
                "#00" + String(index < 6 ? index * 1000 + 3000 : 9000),
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#FFFFFF",
              position: "relative",
            }}
          >
            <Text style={styles.stockName}>{stock.name}</Text>
            <Text style={styles.stockPrice}>{stock.price}</Text>
            <View style={styles.chartIconContainer}>
              <Icon name="arrow-up" size={12} color="#FFFFFF" />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    // height: responsiveHeight(100),
    backgroundColor: "#bbbbbb",
    justifyContent: "flex-end",
    // marginTop: 300,
  },

  stockName: {
    color: "#FFFFFF",
    fontSize: 14,

    // fontWeight: "bold",
  },
  stockPrice: {
    color: "#FFFFFF",
    fontSize: 18,
    // fontWeight: "bold",
    marginTop: 5,
  },
  chartIconContainer: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
  },
  dropdownContainer: {
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default HighIV;
