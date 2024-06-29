import { StyleSheet, Text, View, Modal, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler';
import { theme } from '../../theme/index';
import { useMessage } from './MessageContext';

const ModalRename = ({menuItem, modalVisible, handleCloseModal, handleChangeNameTopic, handleDeleteTopic}) => {
    const { topic } = useMessage()
    const [newTitle, setNewTitle] = useState(topic.title)
    const [isLoading, setIsLoading] = useState(false)

    const handleRename = async () => {
        setIsLoading(true)
        const temp = await handleChangeNameTopic(topic.id, newTitle)
        if (temp){
            handleCloseModal()
        }
        setIsLoading(false)
    }
    
    const handleDelete = async () => {
        setIsLoading(true)
        const temp = await handleDeleteTopic(topic.id)
        if (temp){
            handleCloseModal()
        }
        setIsLoading(false)
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCloseModal}
        >
            <TouchableOpacity
                activeOpacity={1}
                onPress={handleCloseModal}
                style={styles.modalContainer}>
            </TouchableOpacity>
            <View style={styles.modalContent}>
                { menuItem === 'rename' ? 
                    <>
                        <TextInput
                            placeholder='Enter new title'
                            value={newTitle}
                            onChangeText={(value) => setNewTitle(value)}
                            style={{borderWidth: 1, borderColor: theme.colors.dark, padding: 10, borderRadius: 3}}/>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingVertical: 15}}>
                            <TouchableOpacity
                                disabled={isLoading}
                                onPress={handleCloseModal}
                            >
                                <Text style={{color: isLoading ? theme.colors.lightGray : theme.colors.dark}}>Cancel</Text>
                            </TouchableOpacity>

                            {isLoading ? (
                                <ActivityIndicator size="small" color={theme.colors.darkGray} style={{marginLeft: 15}}/>
                                ):    
                                <TouchableOpacity
                                    disabled={newTitle === topic.title}
                                    style={{marginLeft: 15}}
                                    onPress={handleRename}
                                >
                                    <Text style={{color: newTitle === topic.title ? theme.colors.lightGray : theme.colors.dark}}>Rename</Text>
                                </TouchableOpacity>
                                
                            }

                        </View>
                    </>
                    :
                    <>
                        <Text>Do you want to delete this suggestion ?</Text>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', paddingVertical: 15}}>
                            <TouchableOpacity
                                disabled={isLoading}
                                onPress={handleCloseModal}
                            >
                                <Text style={{color: isLoading ? theme.colors.lightGray : theme.colors.dark}}>No</Text>
                            </TouchableOpacity>

                            {isLoading ? (
                                <ActivityIndicator size="small" color={theme.colors.darkGray} style={{marginLeft: 15}}/>
                                ):    
                                <TouchableOpacity
                                    style={{marginLeft: 15}}
                                    onPress={handleDelete}
                                    >
                                    <Text style={{color: 'red'}}>Yes</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </>
            
                }
            </View>
        </Modal>
    )
}

export default ModalRename

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
        top: '50%',
        transform: [{translateY: -60}],
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