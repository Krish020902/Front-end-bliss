import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { GET_USER_DATA } from "../constants/api";
import { useUserContext } from "../context/user_context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import color from "../theme/Colour";
const PopupBox = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(true);
  const { phone } = useUserContext();

  const getUserData = async () => {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.get(`${GET_USER_DATA}${phone}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("here in useeffect of popupbox");
    console.log(res.data.data.mobile);
    if (res.data.data.password !== "") {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleCancel = () => {
    setIsVisible(false);
    // Add your cancel logic here
  };

  const handleChange = () => {
    setIsVisible(false);
    navigation.navigate("SetPassword");

    // Add your change logic here
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Text>Show Pop-up Box</Text>
      </TouchableOpacity> */}

      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Set Password</Text>
            <Text style={{ color: "white" }}>
              Setting password would be beneficial for future use.{" "}
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleCancel}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleChange}>
                <Text style={styles.buttonText}>Set password</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    opacity: 0.9,
    backgroundColor: color.bg_clr,
    padding: 20,
    borderRadius: 5,
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: color.btn_clr,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default PopupBox;
