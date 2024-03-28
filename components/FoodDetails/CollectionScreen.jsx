import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import RadioButtonRN from "radio-buttons-react-native";
import { theme } from "../../theme/index";

const CollectionScreen = ({ navigation }) => {
  const [isAddingNewCollection, setIsAddingNewCollection] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { label: "All Saved Recipe" },
    { label: "Schedule and Made" },
    { label: "Dinner" },
    { label: "Breakfasts" },
    { label: "Drinks" },
    { label: "Side" },

  ];

  const handleAddNewCollection = () => {
    setIsAddingNewCollection(true);
  };

  const handleOk = () => {
    console.log("Add new collection:", newCollectionName);
    setNewCollectionName("");
    setIsAddingNewCollection(false);
  };

  const handleCancel = () => {
    setIsAddingNewCollection(false);
    setNewCollectionName("");
  };

  const handleDone = () => {
    console.log("Selected option:", selectedOption);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Collections</Text>
      <View style={styles.line} />
      <View style={styles.row}>
      <View style={styles.rowItem}>
      <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddNewCollection}
        >
           <Icon name='plus-circle' size={20} color={theme.colors.secondary} style={styles.icon} />
          <Text style={[styles.buttonText, styles.text]} >Add New Collection</Text>
        </TouchableOpacity>
      </View>
      </View>
      
      <View style={styles.line} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isAddingNewCollection}
        onRequestClose={() => setIsAddingNewCollection(false)}
      >
        <TouchableWithoutFeedback
          onPress={() => setIsAddingNewCollection(false)}
        >
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <TouchableOpacity style={styles.closeIcon} onPress={handleCancel}>
              <Icon name="close" size={20} color="black" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>New Collection Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter collection name"
              value={newCollectionName}
              onChangeText={setNewCollectionName}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.okButton]}
                onPress={handleOk}
              >
                <Text style={styles.buttonText}>ADD</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <RadioButtonRN
        data={options}
        box={false}
        selectedBtn={(e) => setSelectedOption(e)}
        activeColor={theme.colors.secondary}
      />

      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: 'white',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "semibold",
  },

  text: {
    color: "black",
    paddingLeft: 5,
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  innerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    height: 252,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 50,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
    marginLeft: 10,

  },
    rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.secondary,
    marginBottom: 20,
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  okButton: {
    backgroundColor: theme.colors.secondary,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "red",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: "15%",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  doneButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    alignItems: "center",
    padding: 15,
    marginBottom: 20,
    width: 150,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20, 
    zIndex: 1, 
  },
});

export default CollectionScreen;
