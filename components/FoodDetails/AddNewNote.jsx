import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { theme } from '../../theme/index'
import {
  useCreateNoteMutation,
  useUpdateNoteMutation,
} from '../../slices/noteSlice'

const AddNoteScreen = ({ navigation, route }) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }
  const [noteTitle, setNoteTitle] = useState('')
  const [noteContent, setNoteContent] = useState('')
  const [createNote, { isLoading: isCreating }] = useCreateNoteMutation()
  const [updateNote, { isLoading: isUpdating }] = useUpdateNoteMutation()

  const { dishId, userId, note } = route.params || {}

  useEffect(() => {
    if (note) {
      setNoteTitle(note.noteTitle)
      setNoteContent(note.noteContent)
    }
  }, [note])

  const handleOk = async () => {
    try {
      if (note) {
        await updateNote({
          id: note.id,
          noteTitle,
          noteContent,
        }).unwrap()
      } else {
        await createNote({
          noteTitle,
          noteContent,
          dishId,
          userId,
        }).unwrap()
      }
      setNoteTitle('')
      setNoteContent('')
      navigation.goBack()
    } catch (error) {
      console.error('Failed to save note:', error)
    }
  }

  const handleCancel = () => {
    navigation.goBack()
  }

  console.log('note', noteContent, noteTitle)

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleCancel} style={styles.header}>
          <Ionicons name='close-circle-outline' size={30} color='gray' />
        </TouchableOpacity>
        <Text style={styles.title}>{note ? 'Edit Note' : 'Add a Note'}</Text>
        <View style={styles.subcontainer}>
          <TextInput
            style={styles.input}
            placeholder='Note title'
            value={noteTitle}
            onChangeText={setNoteTitle}
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder='Write your note (required)'
            multiline={true}
            numberOfLines={6}
            value={noteContent}
            onChangeText={setNoteContent}
          />
        </View>
        <TouchableOpacity
          style={[
            styles.saveButton,
            {
              backgroundColor:
                isCreating || isUpdating || !noteTitle || !noteContent
                  ? theme?.colors?.grayBackground
                  : theme.colors.secondary,
            },
          ]}
          onPress={handleOk}
          disabled={isCreating || isUpdating || !noteTitle || !noteContent}
        >
          <Text style={styles.buttonText}>
            {isCreating || isUpdating ? 'Saving...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 30,
  },
  subcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#F5F5F5',
    width: '100%',
  },
  descriptionInput: {
    height: 150,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    alignSelf: 'center',
  },
  cancelButton: {
    backgroundColor: 'gray',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default AddNoteScreen

