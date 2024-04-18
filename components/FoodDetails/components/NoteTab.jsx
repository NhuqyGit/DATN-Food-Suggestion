import React from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { theme } from "../../../theme/index";
function NoteTab({ foodDetails }) {
  const handleAddNote = () => {};
  return (
    <View style ={styles.container}>
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <TouchableOpacity style={styles.addNoteBtn} onPress={handleAddNote}>
            <SimpleLineIcons
              name="note"
              size={20}
              color={theme.colors.secondary}
              style={styles.iconAdd}
            />
            <Text style={[styles.buttonText, styles.text]}>Add Note</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.containerInitNote}>
        <Image
          source={require("../../../assets/images/FoodDetails/notesInit.png")}
          style={styles.imageNote}
        />
        <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: 5 }}>
          Jot it down
        </Text>
        <Text style={{ textAlign: "center", color: "gray", marginTop: 10 }}>
          Got an idea, reminder, or some inspiration?
        </Text>
        <Text style={{ textAlign: "center", color: "gray" }}>
          {" "}
          Save a private note here for next time.
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
container:{
    backgroundColor:"white",
    flex: 1,
},
  containerInitNote: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  addNoteBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  iconAdd: {
    marginLeft: 10,
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.secondary,
  },
  buttonText: {
    marginLeft: 10,
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  text: {
    color: "black",
    paddingLeft: 10,
  },
  imageNote: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
});
export default NoteTab;
