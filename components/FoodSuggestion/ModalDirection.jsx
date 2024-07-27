import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React from 'react'

const ModalDirection = ({modalDirection, handleCloseModalDirection}) => {
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={modalDirection}
        onRequestClose={handleCloseModalDirection}
    >
        <TouchableOpacity
            activeOpacity={1}
            onPress={handleCloseModalDirection}
            style={styles.modalContainer}>
        </TouchableOpacity>
    </Modal>
  )
}

export default ModalDirection

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
        left: '5%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
    },
})