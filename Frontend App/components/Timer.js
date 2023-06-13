import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

const Timer = () => {
  const [time, setTime] = useState(120);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (time > 0) {
        setTime(time - 1);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    // <View>
    <Text style={{ color: "white" }}>{`  ${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}  MIN`}</Text>
    // </View>
  );
};

export default Timer;
