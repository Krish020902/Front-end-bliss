import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Touchable,
  Dimensions,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";

import color from "../theme/Colour";
import { Icon } from "@rneui/base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDashboardContext } from "../context/dashboard_context";
import { useUserContext } from "../context/user_context";
import { SUBSCRIPTION } from "../constants/api";
import axios from "axios";
import SubscriptionWarningModal from "./SubscriptionWarningModal";
const Navbar = () => {
  const { currCompany } = useDashboardContext();
  const [isChecked, setChecked] = useState(false);
  const windowHeight = Dimensions.get("window").height;
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [issubscribemodal, setIsSubscribeModal] = useState(false);

  const { phone } = useUserContext();
  const toggleCheckbox = () => {
    setChecked(!isChecked);
  };
  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  const handleSubscribed = () => {
    const AddCompanyToSubscribe = async () => {
      token = await AsyncStorage.getItem("token");
      console.log("token is :", token);
      try {
        const response1 = await axios.post(
          `${SUBSCRIPTION}${phone}`,
          {
            company: currCompany.toLowerCase(),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        if (error.response.status == 307) {
          setIsSubscribeModal(true);
        }
        console.log(error.message);
        console.error("Error fetching data:", error);
      }
    };
    AddCompanyToSubscribe();
  };
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {isChecked && (
          <Modal
            animationType="slide"
            transparent={true}
            // We use the state here to toggle visibility of Bottom Sheet
            visible={isChecked}
            // We pass our function as default function to close the Modal
            onRequestClose={handleCloseBottomSheet}
          >
            <View style={[styles.bottomSheet, { height: windowHeight * 0.25 }]}>
              {/* <Text>hello</Text> */}
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 10,
                  right: 25,

                  borderRadius: 100,
                  backgroundColor: "lightgrey",
                  justifyContent: "flex-end",
                }}
                onPress={handleCloseBottomSheet}
              >
                <Icon
                  name="close"
                  color={"black"}
                  type="ionicon"
                  size={25}
                  onPress={toggleCheckbox}
                />
              </TouchableOpacity>
              <View>
                <Text
                  style={{
                    color: color.txt_clr,
                    fontSize: 18,
                    // alignItems: "center",
                    marginTop: 20,
                    textAlign: "center",
                    // justifyContent: "center",
                  }}
                >
                  Are you sure you want to save subscription of {currCompany}?
                </Text>
                <View style={styles.drawerBtnContainer}>
                  <TouchableOpacity
                    style={[styles.button2, styles.deleteButton]}
                    onPress={toggleCheckbox}
                  >
                    <Text style={[styles.buttonText, styles.deleteText]}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.button1, styles.deleteButton]}
                    onPress={handleSubscribed}
                  >
                    <Text style={[styles.buttonText, styles.deleteText]}>
                      Subscribe
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
        <Image
          source={require("../assets/BlissQuantsTM.png")}
          style={styles.logo}
        />
        <TouchableOpacity onPress={toggleCheckbox}>
          <View
            style={[
              // styles.checkboxContainer,
              { padding: 8 }, // Change background color when checked
            ]}
          >
            <Icon
              name={isChecked ? "bookmark" : "bookmark-outline"}
              size={30}
              color="white"
            />
          </View>
        </TouchableOpacity>
        {issubscribemodal && (
          <SubscriptionWarningModal
            isVisible={issubscribemodal}
            setIsSubscribeModal={setIsSubscribeModal}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 37,
    width: responsiveWidth(100),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: color.bg_clr,
    height: 50,
    paddingHorizontal: 10,
  },
  button2: {
    flex: 1,

    marginHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D11A2A",
    // borderWidth: 2,
  },
  button1: {
    flex: 1,

    marginHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: color.btn_clr,
    // borderWidth: 2,
  },
  bottomSheet: {
    // flexDirection: "row",
    position: "absolute",
    left: 0,
    right: 0,
    // justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: color.bg_secondary_clr,
    opacity: 0.95,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 23,
    paddingHorizontal: 25,
    bottom: 0,
    // borderTopWidth: 1,
    // borderColor: color.bg_clr,
  },
  drawerBtnContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  deleteButton: {
    borderColor: "#D11A2A",
  },
  deleteText: {
    color: "white",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  logoContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    // alignItems: "flex-start",
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
