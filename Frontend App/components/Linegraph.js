import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { PanGestureHandler, State } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;

const data = [
  // Sample trading data (price)
  100, 120, 110, 105, 125, 130, 135, 140, 150, 145, 160, 155,
  // ... more data ...
];

const TradingChart = () => {
  const [panX, setPanX] = useState(0);

  const onPanGestureEvent = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      setPanX((prevX) => prevX + nativeEvent.translationX);
    }
  };

  const chartData = {
    labels: data.map((_, index) => index.toString()),
    datasets: [
      {
        data: data,
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "white",
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    decimalPlaces: 2, // Adjust as needed
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onPanGestureEvent}>
        <View>
          <LineChart
            data={chartData}
            width={screenWidth + panX} // Adjust the width based on panning
            height={300}
            chartConfig={chartConfig}
            bezier
          />
        </View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default TradingChart;
