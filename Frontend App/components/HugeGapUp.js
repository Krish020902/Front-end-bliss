import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDashboardContext } from "../context/dashboard_context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";
import LinearGradient from "react-native-linear-gradient";
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "react-native-vector-icons/AntDesign";
import { HUGE_GAP } from "../constants/api";
import Spinner from "react-native-loading-spinner-overlay";
// import styles from "./HugeGapUpStyles";
const HugeGapUp = ({ navigation }) => {
  // Sample data for demonstration
  const [loading, setLoading] = useState(true);
  const { setSelectedIVcompany } = useDashboardContext();
  const [stockData, setStockData] = useState([
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
  ]);
  // Sample data for demonstration

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("12");

  const [options, setOptions] = useState([
    { label: "Top 3", value: "3" },
    { label: "Top 6", value: "6" },
    { label: "Top 9", value: "9" },
    { label: "Top 12", value: "12" },
    { label: "Top 15", value: "15" },
    { label: "Top 18", value: "18" },
  ]);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const handleRedirection = (company) => {
    // console.log(company.name);
    setSelectedIVcompany(company.name);
    navigation.navigate("Dashboard");
  };
  const handleOptionSelect = async (value) => {
    // console.log(value.value);
    // console.log("value is ", value.value);
    setSelectedOption(value.value);
    setDropdownOpen(!isDropdownOpen);
    getAllCompanies();
  };
  const getAllCompanies = async () => {
    // console.log("this is all companies");
    try {
      // setLoading(true);
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`${HUGE_GAP}/${selectedOption}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("res is", res.data);
      const newstockdata = res?.data?.data?.map((item) => {
        return { name: item.name, price: item.atm_vol };
      });
      // console.log("new stock data", newstockdata);
      // console.log("selected option ", selectedOption);
      // console.log("stock data is ", stockData);
      setStockData(newstockdata);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // setStockData(newstockdata);
    // setCurrCompany(companyname);
    getAllCompanies();
  }, []);
  useEffect(() => {
    // setLoading(true);
    getAllCompanies();
    // setLoading(false);
  }, [stockData]);
  return (
    <View>
      {/* <Spinner visible={loading} color="green" /> */}
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
          onRequestClose={() => setDropdownOpen(!isDropdownOpen)}
        >
          <TouchableWithoutFeedback
            onPress={() => setDropdownOpen(!isDropdownOpen)}
          >
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>

          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionItem}
                  onPress={() => handleOptionSelect(item)}
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
              backgroundColor:
                "#00" + String(index < 6 ? index * 1000 + 3000 : 9000),
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 1,
              borderColor: "#FFFFFF",
              position: "relative",
            }}
            onPress={() => handleRedirection(stock)}
          >
            {loading ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <>
                <View>
                  <Text style={styles.stockName}>{stock.name}</Text>
                  <Text style={styles.stockPrice}>{stock.price}</Text>
                </View>
                <View style={styles.chartIconContainer}>
                  <Icon name="arrow-up" color="#FFFFFF" />
                </View>
              </>
            )}
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
});
export default HugeGapUp;
