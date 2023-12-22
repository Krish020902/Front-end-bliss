import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
  Modal,
  ActivityIndicator,
} from "react-native";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";

import { useUserContext } from "../context/user_context";

import axios from "axios";
// import Modal from "react-native-modal";
import color from "../theme/Colour";
// import Drawer from "react-native-drawer";

import { Button, Input, Icon, Card, BackButton } from "@rneui/base";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { API_GET_ALL_COMPANIES, SUBSCRIPTION } from "../constants/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SubscriptionWarningModal from "../components/SubscriptionWarningModal";

const SubscribePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allcompany, setAllCompany] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLayerVisible, setIsLayerVisible] = useState(false);
  const [filteredCompany, setFilteredCompany] = useState([]);
  const [reload, setReload] = useState(true);
  const [issubscribemodal, setIsSubscribeModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [todeletecompany, setToDeleteCompany] = useState("");
  const windowHeight = Dimensions.get("window").height;
  const { phone } = useUserContext();

  // This state would determine if the drawer sheet is visible or not
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [subscribed, setSubscribed] = useState({});

  const handleOpenBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };
  const deletedone = () => {
    const filteredData = async () => {
      token = await AsyncStorage.getItem("token");
      console.log("token is :", token);
      try {
        console.log("company", todeletecompany);
        const response1 = await axios.delete(
          `${SUBSCRIPTION}${phone}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            data: {
              company: todeletecompany,
            },
          }
        );
        setIsLoading(!isLoading);
        setReload(!reload);
      } catch (error) {
        console.log(error.message);
        console.error("Error fetching data:", error);
      }
    };
    filteredData();
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };
  // useEffect(() => {
  //   if (refreshing) {
  //     // console.log("get data");
  //     setReload(!reload);
  //   }
  // }, [refreshing]);
  // Function to close the bottom sheet
  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };
  const AlreadySubscribed = ({ item }) => (
    <>
      <TouchableOpacity>
        <View style={styles.itemContainer}>
          <Text style={styles.companyName}>{item.c_name}</Text>
          <TouchableOpacity
            style={styles.optionsButton}
            onPress={() => {
              setToDeleteCompany(item.c_name);
              handleOpenBottomSheet();
            }}
          >
            <Icon name="remove-circle" color={"#D11A2A"} type="ionicon" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </>
  );

  const ToAddSubscribe = ({ item }) => (
    <>
      <View style={styles.itemContainer1}>
        <Text style={styles.companyName}>{item?.c_name}</Text>
        <TouchableOpacity
          onPress={() => {
            const AddCompanyToSubscribe = async () => {
              token = await AsyncStorage.getItem("token");
              console.log("token is :", token);
              try {
                const response1 = await axios.post(
                  `${SUBSCRIPTION}${phone}`,
                  {
                    company: item.c_name.toLowerCase(),
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                console.log("this is resposne : ", response1);
              } catch (error) {
                if (error?.response?.status == 307) {
                  // console.log("response id ,jdnf", error.response.status);
                  setIsSubscribeModal(true);
                }
                console.log(error.message);
                console.error("Error fetching data:", error);
              }
            };
            AddCompanyToSubscribe();

            setFilteredCompany(
              filteredCompany.map((el) => {
                if (el.c_name === item.c_name) {
                  return { ...el, included: true };
                } else {
                  return el;
                }
              })
            );
          }}
          style={styles.button}
        >
          {item.included ? (
            issubscribemodal ? (
              <Icon name="add" color={color.btn_clr} type="ionicon" />
            ) : (
              <Icon name="remove-circle" color={"#D11A2A"} type="ionicon" />
            )
          ) : (
            <Icon name="add" color={color.btn_clr} type="ionicon" />
          )}
        </TouchableOpacity>
      </View>
    </>
  );

  const toggleLayer = () => {
    setReload(!reload);
    setIsLayerVisible(!isLayerVisible);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    const filteredData = allcompany.filter(
      (item) =>
        item.c_name.toLowerCase().includes(query.toLowerCase()) ||
        item.d_name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredCompany(filteredData);
  };

  useEffect(() => {
    const fetchData = async () => {
      token = await AsyncStorage.getItem("token");
      try {
        console.log(phone);
        console.log(`${SUBSCRIPTION}${phone}`);
        const response1 = await axios.get(`${SUBSCRIPTION}${phone}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await axios.get(`${API_GET_ALL_COMPANIES}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response?.data?.data);
        setSubscribed(
          response1?.data?.data.map((el, index) => {
            return {
              c_name: el,
              id: index,
            };
          })
        );
        setAllCompany(response?.data?.data);
        setFilteredCompany(
          response?.data?.data.map((el, index) => {
            return {
              c_name: el.c_name,
              d_name: el.d_name,
              id: index,
              included: false,
            };
          })
        );
        setIsLoading(!isLoading);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [reload]);

  return (
    <View style={styles.container}>
      {!isLayerVisible && (
        <>
          <View style={styles.header}>
            <Text style={styles.headerText}>Subscription</Text>
            <TouchableOpacity onPress={toggleLayer} style={styles.button}>
              <Icon name="add" color="white" type="ionicon" />
            </TouchableOpacity>
          </View>

          {subscribed.length !== 0 ? (
            isLoading ? (
              // <ScrollView
              //   refreshControl={
              //     <RefreshControl
              //       refreshing={refreshing}
              //       onRefresh={() => {
              //         setRefreshing(true);
              //       }}
              //       tintColor="green"
              //     />
              //   }
              // >
              <ActivityIndicator
                size="large"
                color={color.btn_clr}
                style={{ marginTop: 30 }}
              />
            ) : (
              <>
                <FlatList
                  data={subscribed}
                  renderItem={AlreadySubscribed}
                  keyExtractor={(item) => item?.id}
                />
              </>
            )
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                }}
              >
                There are no Subscriptions please add from
              </Text>
              <TouchableOpacity onPress={toggleLayer}>
                <Text style={{ color: "blue", fontSize: 18 }}>here</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
      {isLayerVisible && (
        <>
          <View style={styles.backButtonContainer}>
            <TouchableOpacity onPress={toggleLayer} style={styles.backButton}>
              <Icon name="arrow-back" color="black" type="ionicon" />
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              onChangeText={(text) => handleSearch(text)}
              value={searchQuery}
            />
          </View>
          <FlatList
            data={filteredCompany}
            renderItem={ToAddSubscribe}
            keyExtractor={(item) => item.id}
          />
          {issubscribemodal && (
            <SubscriptionWarningModal
              isVisible={issubscribemodal}
              setIsSubscribeModal={setIsSubscribeModal}
            />
          )}
        </>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        // We use the state here to toggle visibility of Bottom Sheet
        visible={isBottomSheetOpen}
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
            <Icon name="close" color={"black"} type="ionicon" size={25} />
          </TouchableOpacity>
          <View>
            <Text
              style={{
                color: color.txt_clr,
                fontSize: 18,
                // alignItems: "center",
                textAlign: "center",
                // justifyContent: "center",
              }}
            >
              Are you sure you want to delete subscription of {todeletecompany}?
            </Text>
            <View style={styles.drawerBtnContainer}>
              <TouchableOpacity
                style={[styles.button2, styles.deleteButton]}
                onPress={deletedone}
              >
                <Text style={[styles.buttonText, styles.deleteText]}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* <Drawer
        ref={drawerRef}
        content={
          <View style={styles.drawerContent}>
            <Text>Bottom Drawer Content</Text>
          </View>
        }
        side="bottom"
        openDrawerOffset={50}
        tapToClose
        type="static"
        styles={styles.drawer}
      >
        <View style={styles.container}>
          <TouchableOpacity onPress={openDrawer} style={styles.button}>
            <Text>Open Bottom Drawer</Text>
          </TouchableOpacity>
        </View>
      </Drawer> */}
    </View>
  );
};

const styles = StyleSheet.create({
  drawerBtnContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  deleteButton: {
    borderColor: "#D11A2A",
  },
  deleteText: {
    color: "white",
  },
  drawerbtn: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  close: {
    borderWidth: 2,
    borderColor: "#000080",

    padding: 50,
    // paddingHorizontal: 50,
    borderRadius: 10,

    backgroundColor: "white",
  },
  delete: {
    borderWidth: 2,
    borderColor: "#D11A2A",

    // padding: 50,
    // paddingHorizontal: 50,
    borderRadius: 10,

    backgroundColor: "#D11A2A",
  },
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 8,
    backgroundColor: "#ffffff",
  },
  drawerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgray",
  },
  header: {
    paddingTop: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingLeft: 19,
    backgroundColor: color.bg_clr,
  },
  headerText: {
    fontSize: 25,
    color: "white",
  },
  button: {
    padding: 10,
  },

  backButtonContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  backButton: {
    marginLeft: 20,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    height: 50,
    borderRadius: 30,
    color: color.bg_clr,
    width: responsiveWidth(80),
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#dcdcdc",
  },
  itemContainer1: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#dcdcdc",
  },
  companyName: {
    fontSize: 20,
    color: "black",
  },
  optionsButton: {
    padding: 10,
    color: "black",
  },
  confirmationModalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  confirmationModalText: {
    fontSize: 15,
    marginBottom: 20,
  },
  confirmationModalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  confirmationModalButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: color.btn_clr,
  },
  confirmationModalButtonText: {
    color: "#fff",
    textAlign: "center",
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
});

export default SubscribePage;
