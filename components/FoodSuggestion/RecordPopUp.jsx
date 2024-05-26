import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { theme } from '../../theme/index'
import { useNavigation } from '@react-navigation/native'

const RecordPopUp = ({recordSelect, closePopUp, modalVisible}) => {
    const navigation = useNavigation()

    const handleEdit = () => {
        closePopUp()
        navigation.push("RecordDetail", {recordSelect, type: "PATCH"})
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                closePopUp();
            }}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPress={()=> closePopUp()}
                style={styles.modalContainer}>
            </TouchableOpacity>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        onPress={handleEdit}
                        style={styles.modalItem}>
                        <MaterialIcons name='edit' size={20} color='#231F20' />
                        <Text style={styles.modalItemText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalItem}>
                        <MaterialIcons name="delete-forever" size={20} color='red' />
                        <Text style={styles.modalItemText}>Delete</Text>
                    </TouchableOpacity>
                </View>

                {/* <View>
                </View> */}
        </Modal>
    )
}

export default RecordPopUp

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
    modalItem:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F3F3'
    },
    modalItemText: {
        fontSize: 16,
        marginLeft: 8,
        fontWeight: '500',
        color: '#231F20'
    }
})