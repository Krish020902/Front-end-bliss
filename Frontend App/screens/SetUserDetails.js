import React, { useState, useEffect } from "react";
import {
  View,
  StatusBar,
  TextInput,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  TouchableHighlight,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastProvider, useToast } from "react-native-toast-notifications";
import color from "../theme/Colour";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button, Input } from "@rneui/base";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from "react-native-responsive-dimensions";
import FloatingLabelInput from "../components/FloatingLabelInput";
import { useUserContext } from "../context/user_context";
import axios from "axios";
import { UPDATE_USER_DATA } from "../constants/api";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";

const SetUserDetails = ({ navigation }) => {
  const {
    setUserEmail,
    setUserName,
    email,
    name,
    phone,
    setUserPhone,
    birthyear,
    setUserBirthYear,
    pincode,
    setUserPinCode,
    country,
    setUserCountry,
    plan,

    setUserPlan,
  } = useUserContext();
  const toast = useToast();

  const login = async () => {
    const token = await AsyncStorage.getItem("token");
    const infourl = `${UPDATE_USER_DATA}/${phone}`;
    try {
      // console.log(typeof setUserEmail);
      // console.log("birthyear and plan", birthyear, " ", plan);
      const res = await axios.put(
        infourl,
        {
          birthyear: birthyear,
          company: "",
          country: country,
          email: email,
          email_org: "",
          first_date: "",
          interest: "",
          leader_name: "",
          mobile: phone,
          name: name,
          passreset: "",
          password: "",
          pincode: pincode,
          plan: plan,
          register_date: "",
          role: "",
          session_id: "",
          status: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.valid) {
        console.log(res.data.message);
        console.log(birthyear);
        toast.show("Details updated Successfully" + "! ", {
          type: "success",
        });
        navigation.navigate("MainDashboard");
      } else {
        toast.show(res.data.message + "! ", {
          type: "danger",
        });
        console.log("some error", err);
      }
    } catch (err) {
      toast.show(err + "! ", {
        type: "danger",
      });
      console.log("Outside catch", err);
    }
  }; //here
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const [yearSelected, setYearSelected] = useState(true);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, index) => currentYear - index);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const selectYear = (year) => {
    setYearSelected(false);

    setUserBirthYear(year);

    toggleDropdown();
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/BlissQuantsTM.png")}
        style={styles.logo}
      />
      <ScrollView>
        <Text style={styles.font}>Name</Text>

        <View style={styles.Viewbox}>
          <Input
            value={name}
            style={styles.TextBox}
            onChangeText={(change) => {
              setUserName(change);
            }}
          />
        </View>
        <Text style={styles.font}>Email</Text>

        <View style={styles.Viewbox}>
          <Input
            value={email}
            style={styles.TextBox}
            onChangeText={(change) => {
              setUserEmail(change);
            }}
          />
        </View>
        <Text style={styles.font}>Birth Year</Text>
        <View style={styles.Viewbox}>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={toggleDropdown}
          >
            <Text
              style={{
                // height: 40,

                fontSize: 18,
                color: "white",
              }}
            >
              {birthyear == "" ? "Select Birth Year" : birthyear}
              {yearSelected && (
                <Icon
                  style={{ width: 30, size: 20 }}
                  name="chevron-down"
                ></Icon>
              )}
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isDropdownVisible}
          onRequestClose={toggleDropdown}
        >
          <ScrollView>
            <View style={styles.modalContainer}>
              {years.map((year) => (
                <TouchableOpacity
                  key={year}
                  style={styles.yearItem}
                  onPress={() => selectYear(year)}
                >
                  <Text
                    style={{
                      height: 40,

                      fontSize: 18,
                      color: "white",
                    }}
                  >
                    {year}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </Modal>

        <Text style={styles.font}>Plan</Text>

        <View style={styles.Viewbox}>
          <Input
            value={plan}
            style={styles.TextBox}
            onChangeText={(change) => {
              setUserPlan(change);
            }}
          />
        </View>
        <Text style={styles.font}>Pin-Code</Text>

        <View style={styles.Viewbox}>
          <Input
            value={pincode}
            style={styles.TextBox}
            onChangeText={(change) => {
              setUserPinCode(change);
            }}
          />
        </View>
        <Text style={styles.font}>Country</Text>

        <View style={styles.Viewbox}>
          <Input
            value={country}
            style={styles.TextBox}
            onChangeText={(change) => {
              setUserCountry(change);
            }}
          />
        </View>

        <View style={styles.Viewbox}></View>

        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 30 }}>
          <Button
            title="Go to dashboard"
            color={color.btn_clr}
            onPress={login}
            buttonStyle={{
              marginTop: 25,
              width: responsiveWidth(80),
              alignSelf: "center",
              borderRadius: 13,
            }}
          >
            Save changes
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  dropdownButton: {
    flex: 1,
    padding: 10,

    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  yearItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    width: 200,
    alignItems: "center",
  },
  TextBox: {
    height: 40,
    alignSelf: "center",
    marginLeft: 14,
    width: 350,
    fontSize: 18,
    color: "white",
  },
  Viewbox: {
    flexDirection: "row",
    backgroundColor: color.bg_secondary_clr,
    width: responsiveWidth(90),
    margin: 15,
    borderRadius: 10,
    elevation: 14, // or you can use the `shadow` property instead
    shadowColor: color.btn_clr,
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  countryItem: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 10,
  },
  container: {
    flex: 1,
    // padding: 10,
    // position: "absolute",
    backgroundColor: color.bg_clr,
    color: "white",

    // marginLeft: 2,
  },
  logo: {
    // marginLeft: 35,
    marginTop: 40,
    alignSelf: "center",
    width: 300,
    height: 80,
  },
  footlogo: {
    marginTop: "59%",
    alignSelf: "center",
    width: 350,
    height: 175,
  },
  font: {
    color: "white",
    marginLeft: 15,
    marginTop: 5,
  },
  phoneInput: {
    color: "white",
    height: 40,
    width: 350,
    borderColor: color.btn_clr,
    borderWidth: 1,
    margin: 15,

    // marginBottom: 10,
  },
});
export default SetUserDetails;
