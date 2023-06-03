import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

const PopupBox = ({navigation}) => {
  const [isVisible, setIsVisible] = useState(true);

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
            <Text style={{color:"white"}}>Setting password would be beneficial for future use. </Text>
            
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  modalContent: {
    opacity:0.9,
    backgroundColor: '#3a3332',
    padding: 20,
    borderRadius: 5,
  },
  title: {
    color:"white",
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'rgb(132,194,37)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    
  },
});

export default PopupBox;
