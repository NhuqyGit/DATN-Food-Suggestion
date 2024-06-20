import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import SortItem from './SortItem'

const SortPopUp = ({ closePopUp, modalVisible }) => {
  const [checkBoxIndex, setCheckBoxIndex] = useState(0)
  const listSortItem = [
    {
      name: 'Last Modified',
    },
    {
      name: 'Collection Name',
    },
    {
      name: 'Last Created',
    },
  ]

  const listComponentSortItem = listSortItem.map((item, index) => {
    return (
      <SortItem
        key={index.toString()}
        props={item}
        index={index}
        checkBoxIndex={checkBoxIndex}
        setCheckBoxIndex={setCheckBoxIndex}
      />
    )
  })

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={modalVisible}
      // onRequestClose={() => {
      //     closePopUp();
      // }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => closePopUp()}
        style={styles.modalContainer}
      ></TouchableOpacity>
      <View style={styles.modalContent}>{listComponentSortItem}</View>
    </Modal>
  )
}

export default SortPopUp

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    position: 'absolute',
    width: '90%',
    bottom: 20,
    left: '5%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
})

