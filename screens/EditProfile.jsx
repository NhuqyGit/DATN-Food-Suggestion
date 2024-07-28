import { MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker'
import { COLORS, FONTS } from '../theme/theme'

const img = require('../constants/knike-fork')

function EditProfile({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(img)
  const [name, setName] = useState('Melissa Peters')
  const [email, setEmail] = useState('metperters@gmail.com')
  const [password, setPassword] = useState('randompassword')
  const [country, setCountry] = useState('Nigeria')

  const [openStartDatePicker, setOpenStartDatePicker] = useState(false)
  const today = new Date()
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    'YYYY/MM/DD'
  )
  const [selectedStartDate, setSelectedStartDate] = useState('01/01/1990')
  const [startedDate, setStartedDate] = useState('12/12/2023')

  const handleChangeStartDate = (propDate) => {
    setStartedDate(propDate)
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker)
  }

  const handleImageSelection = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
    }
  }

  function renderDatePicker() {
    return (
      <Modal animationType='slide' transparent visible={openStartDatePicker}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              margin: 20,
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
              padding: 35,
              width: '90%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}
          >
            <DatePicker
              mode='calendar'
              minimumDate={startDate}
              selected={startedDate}
              onDateChanged={handleChangeStartDate}
              onSelectedChange={(date) => setSelectedStartDate(date)}
              options={{
                backgroundColor: COLORS.primary,
                textHeaderColor: '#469ab6',
                textDefaultColor: COLORS.white,
                selectedTextColor: COLORS.white,
                mainColor: '#469ab6',
                textSecondaryColor: COLORS.white,
                borderColor: 'rgba(122,146,165,0.1)',
              }}
            />

            <TouchableOpacity onPress={handleOnPressStartDate}>
              <Text style={{ ...FONTS.body3, color: COLORS.white }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 22,
      }}
      edges={['right', 'left', 'top']}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            left: 0,
          }}
        >
          <MaterialIcons
            name='keyboard-arrow-left'
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>

        <Text style={{ ...FONTS.h3 }}>Edit Profile</Text>
      </View>

      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            marginVertical: 22,
          }}
        >
          <TouchableOpacity onPress={handleImageSelection}>
            <Image
              source={{ uri: selectedImage }}
              style={{
                height: 170,
                width: 170,
                borderRadius: 85,
                borderWidth: 2,
                borderColor: COLORS.primary,
              }}
            />

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                right: 10,
                zIndex: 9999,
              }}
            >
              <MaterialIcons
                name='photo-camera'
                size={32}
                color={COLORS.primary}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <View
            style={{
              flexDirection: 'column',
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Name</Text>
            <View
              style={{
                height: 44,
                width: '100%',
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={name}
                onChangeText={(value) => setName(value)}
                editable
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Email</Text>
            <View
              style={{
                height: 44,
                width: '100%',
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={email}
                onChangeText={(value) => setEmail(value)}
                editable
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Password</Text>
            <View
              style={{
                height: 44,
                width: '100%',
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8,
              }}
            >
              <TextInput
                value={password}
                onChangeText={(value) => setPassword(value)}
                editable
                secureTextEntry
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              marginBottom: 6,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Date or Birth</Text>
            <TouchableOpacity
              onPress={handleOnPressStartDate}
              style={{
                height: 44,
                width: '100%',
                borderColor: COLORS.secondaryGray,
                borderWidth: 1,
                borderRadius: 4,
                marginVertical: 6,
                justifyContent: 'center',
                paddingLeft: 8,
              }}
            >
              <Text>{selectedStartDate}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginBottom: 6,
          }}
        >
          <Text style={{ ...FONTS.h4 }}>Country</Text>
          <View
            style={{
              height: 44,
              width: '100%',
              borderColor: COLORS.secondaryGray,
              borderWidth: 1,
              borderRadius: 4,
              marginVertical: 6,
              justifyContent: 'center',
              paddingLeft: 8,
            }}
          >
            <TextInput
              value={country}
              onChangeText={(value) => setCountry(value)}
              editable
            />
          </View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            height: 44,
            borderRadius: 6,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.white,
            }}
          >
            Save Change
          </Text>
        </TouchableOpacity>

        {renderDatePicker()}
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditProfile

