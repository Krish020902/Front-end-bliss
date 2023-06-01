import React, { useState, useRef, useEffect } from "react";
import { View, StatusBar, TextInput, Animated } from "react-native";

function FloatingLabelInput(props) {
  const [isFocused, setIsFocused] = useState(false);
  const animatedIsFocused = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      // useNativeDriver: true,
    }).start();
  }, [animatedIsFocused, isFocused]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const labelStyle = {
    position: "absolute",
    left: 0,
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [18, 0],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12],
    }),
    color: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: ["white", "rgb(132,194,37)"],
    }),
    margin: 15,
  };

  return (
    <View style={{ paddingTop: 18 }}>
      <Animated.Text style={labelStyle}>{props.label}</Animated.Text>
      <TextInput
        maxLength={10}
        keyboardType="phone-pad"
        {...props}
        style={{
          height: 26,
          alignSelf: "center",
          margin: 15,
          width: 350,
          fontSize: 20,
          color: "white",
          borderBottomWidth: 1,
          borderBottomColor: "#555",
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        blurOnSubmit
      />
    </View>
  );
}

export default FloatingLabelInput;
