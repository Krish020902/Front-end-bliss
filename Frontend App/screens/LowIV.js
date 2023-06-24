import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
// import Icon from "react-native-vector-icons/MaterialIcons";

const LowIV = () => {
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
  var greencolour = 1;

  return (
    <View style={styles.container}>
      {stockData.map((stock, index) => (
        <View
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
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
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
