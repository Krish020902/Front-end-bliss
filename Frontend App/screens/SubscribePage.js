import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Modal from "react-native-modal";

const companyData = [
  { id: "1", name: "Company A", stockPrice: "$100" },
  { id: "2", name: "Company B", stockPrice: "$150" },
  { id: "3", name: "Company C", stockPrice: "$120" },
  // Add more companies as needed
];

const SubscribePage = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => openDrawer(item)}>
      <View style={styles.itemContainer}>
        <Text style={styles.companyName}>{item.name}</Text>
        <Text style={styles.stockPrice}>{item.stockPrice}</Text>
        <TouchableOpacity
          onPress={() => alert(`Options for ${item.name}`)}
          style={styles.optionsButton}
        >
          <Text style={styles.optionsButtonText}>...</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const openDrawer = (item) => {
    setSelectedCompany(item);
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => alert("Add button pressed")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert("Three dots button pressed")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>...</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={companyData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />

      <Modal isVisible={isDrawerVisible} onBackdropPress={closeDrawer}>
        <View style={styles.drawerContainer}>
          {selectedCompany && (
            <>
              <Text style={styles.drawerTitle}>{selectedCompany.name}</Text>
              <Text style={styles.drawerSubtitle}>
                {selectedCompany.stockPrice}
              </Text>
              <TouchableOpacity
                onPress={() => alert(`Delete ${selectedCompany.name}`)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#3498db",
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#dcdcdc",
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  stockPrice: {
    fontSize: 16,
    color: "#27ae60",
  },
  optionsButton: {
    padding: 10,
  },
  optionsButtonText: {
    fontSize: 20,
    color: "#3498db",
  },
  drawerContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  drawerSubtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default SubscribePage;
