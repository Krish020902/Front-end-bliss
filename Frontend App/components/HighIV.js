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
  ImageBackground,
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
import { HIGHIV } from "../constants/api";
import Spinner from "react-native-loading-spinner-overlay";
import color from "../theme/Colour";

const HighIV = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const { setSelectedIVcompany } = useDashboardContext();
  const [stockData, setStockData] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("9");
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
    setSelectedIVcompany(company.name);
    navigation.navigate("Dashboard");
  };

  const handleOptionSelect = async (value) => {
    setSelectedOption(value.value);
    setDropdownOpen(!isDropdownOpen);
    getAllCompanies();
  };

  const getAllCompanies = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const res = await axios.get(`${HIGHIV}/${selectedOption}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newStockData = res?.data?.data?.map((item) => ({
        name: item.name,
        price: item.atm_vol,
      }));
      setStockData(newStockData);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllCompanies();
  }, [selectedOption]);

  return (
    <View style={{ flex: 1, backgroundColor: color.bg_clr }}>
      <View style={styles.selectedbar}>
        <Text style={styles.barfont1}>High IV Stocks</Text>
        <View style={styles.TopCompany}>
          <TouchableOpacity
            onPress={toggleDropdown}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Text style={styles.barfont}>Top {selectedOption}</Text>
            <Icon name="chevron-down" color={color.bg_clr} />
          </TouchableOpacity>
        </View>

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

      <View style={styles.resultContainer}>
        <View style={styles.line} />
        <Text style={styles.resultText}>
          Total {stockData?.length} results found
        </Text>
        <View style={styles.line} />
      </View>

      <View style={styles.container}>
        {stockData &&
          stockData.map((stock, index) => (
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
  // ... (your existing styles)
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  watermark: {
    position: "absolute",
    top: 210,
    marginTop: 80,
    height: 270,
    width: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    position: "absolute",
    justifyContent: "flex-end",
    right: 0,
    top: 50,
    width: responsiveWidth(40),
    // left: 7,

    opacity: 0.93,
    backgroundColor: "#CCCCCC",
    borderRadius: 8,
    elevation: 4,
  },
  resultContainer: {
    paddingTop: 24,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: color.txt_clr, // Adjust the color as needed
  },
  resultText: {
    marginHorizontal: 10,
    color: color.txt_clr,
  },

  optionItem: {
    padding: 16,
    borderBottomWidth: 1,

    color: "white",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderBottomColor: color.bg_clr,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    // height: responsiveHeight(100),
    backgroundColor: color.bg_clr,
    justifyContent: "flex-start",
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
    flexDirection: "row",
    justifyContent: "space-between",

    // justifyContent: "space-between",
    fontSize: 20,
    marginTop: 40,

    width: responsiveWidth(90),
    left: 17,

    // backgroundColor: color.bg_clr,
  },
  barfont: {
    // marginRight: 40,
    fontSize: responsiveFontSize(2.5),
    // fontWeight: "bold",

    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  TopCompany: {
    // flexDirection: "row",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: color.txt_clr,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  barfont1: {
    // marginRight: 40,
    fontSize: responsiveFontSize(2.5),
    // fontWeight: "bold",
    backgroundColor: color.bg_clr,
    color: color.txt_clr,
  },
});

export default HighIV;
