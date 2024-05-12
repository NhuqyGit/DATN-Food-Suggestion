import React, { useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { theme } from "../../../theme/index";
import Icon from "react-native-vector-icons/FontAwesome";
function InitNotTab() {
  return (
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
  );
}
function NoteList({ notes }) {
  return (
    <ScrollView>
      {notes.map((note) => (
        <View key={note.id} style={styles.component}>
          <Text style={styles.mainText}>{note.id}</Text>
          <Text style={styles.subText}>{note.noteContent}</Text>
          <View style={styles.icons}>
          <TouchableOpacity>
            <Icon name="pencil" size={18} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="trash" size={18} color="#000" />
          </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
function NoteTab({ notes }) {
  const handleAddNote = () => {};
  useEffect(() => {
    console.log("Note tab:", notes);
  });
  return (
    <View style={styles.container}>
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
      {notes ? NoteList({ notes }) : InitNotTab()}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
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

  containerNote: {
    flex: 1,
    padding: 10,
  },
  component: {
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#F5F5F5",
  
  },
  mainText: {
    fontSize: 16,
    color: "black",
    marginBottom: 5
  },
  subText: {
    fontSize: 14,
    color: "gray",
    marginBottom: 15,
  },
  icons: {
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 25,
  },
});
export default NoteTab;
