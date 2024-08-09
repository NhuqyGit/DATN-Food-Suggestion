import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  Dimensions,
} from "react-native";
import React from "react";
import YoutubePlayer from "react-native-youtube-iframe";
import { COLORS } from "../../../theme/theme";
import { theme } from "../../../theme";

const { width, height } = Dimensions.get("window");

const DirectionVideoModal = ({ youtubeId, open, setOpen }) => {
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setOpen(!open);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <YoutubePlayer
              height={height * 0.3}
              width={width * 0.9}
              play={false}
              videoId={`${youtubeId}`}
            />

            <View>
              <TouchableOpacity
                onPress={() => {
                  setOpen(!open);
                }}
                style={[styles.button, styles.buttonClose]}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DirectionVideoModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 50,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: theme.colors.secondary,
  },
});
