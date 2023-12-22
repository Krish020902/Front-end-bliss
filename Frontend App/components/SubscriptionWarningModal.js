import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import color from "../theme/Colour";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { SUBSCRIPTIONPLANS } from "../constants/api";
const SubscriptionWarningModal = ({ isVisible, setIsSubscribeModal }) => {
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [onClose, setOnClose] = useState(true);
  const [subscriptionDetails, setSubscriptionDetails] = useState({
    status: "free",
    maxSubscriptions: 3,
  });

  useEffect(() => {
    fetchSubscriptionDetails();
  }, []);

  const fetchSubscriptionDetails = async () => {
    try {
      // Replace the following URL and headers with your actual API endpoint and headers
      const response = await axios.get(`${SUBSCRIPTIONPLANS}`);
      console.log("response", response?.data?.data);
      setSubscriptionDetails(response?.data?.data);
    } catch (error) {
      console.error("Error fetching subscription details:", error);
    }
  };

  const handleUpgrade = () => {
    console.log(`Upgrade to ${selectedPlan} plan`);
    setIsSubscribeModal(false);
  };

  const handleMaybeLater = () => {
    setIsSubscribeModal(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleOptionSelect = (option) => {
    setSelectedPlan(option);
    toggleDropdown();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            You have reached the maximum subscriptions as per your current plan.
          </Text>
          <Text style={styles.modalSubtitle}>
            Please upgrade your plan from here:
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableWithoutFeedback onPress={toggleDropdown}>
              <View style={styles.selectedbar}>
                <Text style={styles.barfont}>
                  {selectedPlan.toUpperCase()}
                  <Icon name={isDropdownOpen ? "chevron-up" : "chevron-down"} />
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: color.btn_clr,
                padding: 10,
                paddingHorizontal: 13,
                marginRight: 20,
                borderRadius: 15,
              }}
            >
              <Text style={{ alignItems: "center", color: color.txt_clr }}>
                100₹
              </Text>
            </View>
          </View>

          {isDropdownOpen && (
            <View style={styles.dropdownContainer}>
              {subscriptionDetails?.map((plan, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionItem}
                  onPress={() => handleOptionSelect(plan.plan_name)}
                >
                  <Text style={{ color: "black" }}>{plan.plan_name}</Text>
                  <Text
                    style={{ color: "black" }}
                  >{`${plan.script_limit} Subscriptions`}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.maybeLaterButton}
              onPress={handleMaybeLater}
            >
              <Text style={styles.buttonText}>Maybe Later</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.upgradeButton}
              onPress={handleUpgrade}
            >
              <Text style={styles.buttonText}>Upgrade</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
  selectedbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  barfont: {
    marginLeft: 15,
    fontSize: 16,
    color: "black",
  },
  dropdownContainer: {
    marginTop: 10,
    width: "100%",
  },
  optionItem: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: "space-between",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  maybeLaterButton: {
    flex: 1,
    padding: 10,
    backgroundColor: color.bg_secondary_clr,
    borderRadius: 5,
    marginRight: 5,
  },
  upgradeButton: {
    flex: 1,
    padding: 10,
    backgroundColor: color.btn_clr,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default SubscriptionWarningModal;
