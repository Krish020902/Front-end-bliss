import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Icon from "react-native-vector-icons/FontAwesome";
// import Icon from "react-native-vector-icons/MaterialIcons";

const LowIV = () => {
  // Sample data for demonstration
  const stockData = [
    {
      name: "AARTIIND",
      price: 100,
    },
    { name: "ABFRL", price: 150 },
    { name: "ACC", price: 120 },
    { name: "ALKEM", price: 80 },
    { name: "ATUL", price: 200 },
    { name: "BEL", price: 110 },
    { name: "BHEL", price: 90 },
    { name: "BPCL", price: 130 },
    { name: "CIPLA", price: 180 },
    { name: "CUB", price: 180 },
    { name: "DABUR", price: 180 },
    { name: "DLF", price: 180 },
  ];
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Schemas");

  const options = [
    { label: "Option 1", value: "Option1" },
    { label: "Option 2", value: "Option2" },
    { label: "Option 3", value: "Option3" },
    { label: "Option 4", value: "Option4" },
    { label: "Option 5", value: "Option5" },
    { label: "Option 6", value: "Option6" },
  ];

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
    setDropdownOpen(false);
  };

  return (
    <View>
      <View style={styles.selectedbar}>
        <TouchableOpacity onPress={toggleDropdown}>
          <Text style={styles.barfont}>
            {selectedOption}
            <Icon name="chevron-down" />
          </Text>
        </TouchableOpacity>

        <Modal
          visible={isDropdownOpen}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setDropdownOpen(false)}
        >
          <TouchableWithoutFeedback onPress={() => setDropdownOpen(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>

          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleOptionSelect(item.value)}
                >
                  <Text style={{ color: "black" }}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </View>

      <View style={styles.container}>
        {stockData.map((stock, index) => (
          <TouchableOpacity
            key={index}
            style={{
              width: "33.33%",
              height: 100,
              // backgroundColor: "#5e0c" + String(index + 1 * 10 + 2 * index),
              backgroundColor:
                "rgb(" +
                String(120 + index * 10) +
                "," +
                String(index + index * 5) +
                "," +
                String(index + index * 5) +
                ")",
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
              <Icon name="arrow-down" size={12} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    // right: 0,
    top: 30,
    width: 200,
    left: 7,

    opacity: 0.93,
    backgroundColor: "#CCCCCC",
    borderRadius: 8,
    elevation: 4,
  },

  optionItem: {
    padding: 16,
    borderBottomWidth: 1,

    color: "white",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomColor: "#3a3332",
  },
  selectedbar: {
    fontSize: 20,
    marginTop: 20,
    width: responsiveWidth(100),
    left: 17,
  },
  barfont: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
  },
  container: {
    // marginTop: 100,
    height: responsiveHeight(100),
    backgroundColor: "black",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridItem: {
    width: "33.33%",
    height: 100,
    backgroundColor: "#008000",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    position: "relative",
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
});

export default LowIV;
