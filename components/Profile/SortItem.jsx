import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setSearchCollectionIndex } from '../../slices/searchSlice'

const SortItem = ({ props, index, checkBoxIndex, setCheckBoxIndex }) => {
  const dispatch = useDispatch()
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setCheckBoxIndex(index)
          dispatch(setSearchCollectionIndex(index))
        }}
        style={[
          styles.checkBox,
          checkBoxIndex === index ? { backgroundColor: '#231F20' } : null,
        ]}
      >
        <View style={checkBoxIndex === index ? styles.focus : null} />
      </TouchableOpacity>
      <Text style={styles.name}>{props.name}</Text>
    </View>
  )
}
// ,
export default SortItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F3F3',
  },
  checkBox: {
    width: 18,
    height: 18,
    marginRight: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#231F20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  focus: {
    backgroundColor: 'white',
    width: '45%',
    height: '45%',
    borderRadius: 50,
  },
  name: {
    // fontSize: 11,
    fontWeight: '500',
    color: '#231F20',
  },
})

