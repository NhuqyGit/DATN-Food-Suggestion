import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { theme } from '../../../theme/index'
import { setCollectionButtonText } from '../../../slices/modalSlice'
import { useGetRelatedDishQuery } from '../../../slices/foodDetailsSlice'
import SmallRecommendItem from '../../RecommendItem/SmallRecommendItem'
import RecommendSmallSkeleton from '../../../screens/Search/ViewImageScreen/RecommendSmallSkeleton'
import {
  useCreateReportMutation,
  useGetReportByUserIdAndDishIdQuery,
} from '../../../slices/reportSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

const reportReasons = [
  'Inappropriate Content',
  'Spam',
  'Harassment',
  'False Information',
  'Bad Content',
  'Wordy',
  'False Image',
  "I don't like it",
  'Others',
]

function OverviewTab({ foodDetails, navigation }) {
  const collectionButtonText = useSelector(
    (state) => state.modal.collectionButtonText
  )
  const [isReporting, setReporting] = useState(false)
  const [selectedReason, setSelectedReason] = useState(null)
  const [otherReason, setOtherReason] = useState('')
  const [userId, setUserId] = useState(null)
  const [createReport] = useCreateReportMutation()
  const { data: existingReport, refetch } = useGetReportByUserIdAndDishIdQuery(
    { userId: parseInt(userId), dishId: foodDetails?.id },
    { skip: !userId }
  )
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id')
        if (storedUserId) {
          setUserId(storedUserId)
        }
      } catch (error) {
        console.error('Failed to fetch userId from AsyncStorage:', error)
      }
    }

    fetchUserId()
  }, [])

  useEffect(() => {
    if (userId) {
      refetch()
    }
  }, [userId, refetch])

  const {
    data: relatedDishs,
    isLoading: relatedLoading,
    isError: relatedError,
  } = useGetRelatedDishQuery(foodDetails?.id)

  const cancelReporting = () => {
    setReporting(false)
    setSelectedReason([])
    setOtherReason('')
    refetch()
  }

  const toggleReason = (reason) => {
    setSelectedReason(reason === selectedReason ? null : reason)
  }

  const handleReportSubmission = async () => {
    if (selectedReason?.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Report Error',
        text2: 'Please select at least one reason.',
        textStyle: { fontSize: 20 },
      })
      return
    }
    refetch()
    if (existingReport && existingReport?.length > 0) {
      Toast.show({
        type: 'error',
        text1: 'Report Error',
        text2: 'You have already reported this dish.',
        textStyle: { fontSize: 20 },
      })
      cancelReporting()
      return
    }
    const content =
      selectedReason === 'Others'
        ? `${selectedReason}: ${otherReason}`
        : selectedReason
    const response = await createReport({
      userId: parseInt(userId),
      dishId: parseInt(foodDetails?.id),
      content,
    })

    if (response.data?.userId) {
      Toast.show({
        type: 'success',
        text1: 'Report Submitted',
        text2: 'Report issued successfully.',
        textStyle: { fontSize: 20 },
      })
    }

    cancelReporting()
  }

  const startReporting = () => {
    setReporting(true)
  }

  const renderReportModal = () => (
    <Modal
      animationType='slide'
      transparent
      visible={isReporting}
      onRequestClose={cancelReporting}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.overlay} onPress={cancelReporting} />
        <View style={styles.innerReportContainer}>
          <Text style={styles.modalTitle}>Select Reasons for Report</Text>
          <TouchableOpacity style={styles.closeIcon} onPress={cancelReporting}>
            <Icon name='close' size={22} color='black' />
          </TouchableOpacity>
          {reportReasons.map((reason, index) => (
            <TouchableOpacity
              key={index}
              style={styles.reasonOptionContainer}
              onPress={() => toggleReason(reason)}
            >
              <Icon
                name={selectedReason === reason ? 'dot-circle-o' : 'circle-o'}
                size={24}
                color={theme.colors.secondary}
              />
              <Text style={styles.reasonOptionText}>{reason}</Text>
            </TouchableOpacity>
          ))}
          {selectedReason === 'Others' && (
            <TextInput
              style={styles.otherReasonInput}
              placeholder='Enter your reason'
              value={otherReason}
              onChangeText={setOtherReason}
            />
          )}
          <TouchableOpacity
            style={styles.reportButton}
            onPress={handleReportSubmission}
          >
            <Text style={styles.reportButtonText}>Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollViewContainer}
      >
        <View style={styles.infoItem}>
          <Icon
            name='star'
            size={20}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <Text style={styles.label}>Rating</Text>
          <Text style={styles.value}>{foodDetails?.rating}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.infoItem}>
          <Ionicons
            name='timer'
            size={20}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <Text style={styles.label}>Total time</Text>
          <Text style={styles.value}>
            {(Number(foodDetails?.cookingTime) / 60).toFixed(0) < 120
              ? `${(Number(foodDetails?.cookingTime) / 60).toFixed(0)}m`
              : `${(Number(foodDetails?.cookingTime) / 60 / 60).toFixed(0)}h ${(Number(foodDetails?.cookingTime) / 60).toFixed(0) - (Number(foodDetails?.cookingTime) / 60 / 60).toFixed(0) * 60}m`}
          </Text>
        </View>
        <View style={styles.line} />
        <View style={styles.infoItem}>
          <Ionicons
            name='server'
            size={20}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <Text style={styles.label}>Servings</Text>
          <Text style={styles.value}>{foodDetails?.servings}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.infoItem}>
          <Ionicons
            name='flame'
            size={20}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <Text style={styles.label}>Calories per serving</Text>
          <Text style={styles.value}>{foodDetails?.calories}</Text>
        </View>

        <View>
          {relatedDishs && relatedDishs.length > 0 && (
            <>
              <Text style={styles.relatedTxt}>Related dishes</Text>
              <ScrollView
                style={styles.listItem}
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {relatedLoading || relatedError ? (
                  <RecommendSmallSkeleton total={5} />
                ) : (
                  <>
                    {relatedDishs.map((item) => (
                      <SmallRecommendItem key={item.id} item={item} />
                    ))}
                  </>
                )}
              </ScrollView>
            </>
          )}
        </View>

        <View style={styles.reportButtonContainer}>
          {existingReport && existingReport.length > 0 ? (
            <Text style={styles.alreadyReportedText}>
              * Thank you. You have reported this dish!
            </Text>
          ) : (
            <TouchableOpacity onPress={startReporting}>
              <Text style={styles.reportIssuer}>Report Issuer</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      {renderReportModal()}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    flexDirection: 'column',
  },
  scrollViewContainer: {
    marginTop: 5,
    flex: 1,
  },
  // addToCollectionButton: {
  //   flexDirection: "row",
  //   alignItems: "center",
  //   marginVertical: 25,
  // },
  collectionButtonText: {
    color: theme.colors.secondary,
    fontSize: 16,
    marginLeft: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  label: {
    marginLeft: 5,
    fontSize: 16,
  },
  value: {
    marginLeft: 5,
    fontSize: 16,
    textAlign: 'right',
    flex: 3,
    paddingRight: 15,
  },
  icon: {
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.secondary,
  },
  reportIssuer: {
    color: theme.colors.secondary,
    fontSize: 16,
    marginVertical: 20,
    paddingLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  innerReportContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: 500,
  },
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  reasonOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  reasonOptionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  reportButton: {
    backgroundColor: theme.colors.secondary,
    padding: 15,
    width: '40%',
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  reportButtonText: {
    color: 'white',
    fontSize: 16,
  },
  listItem: {
    marginTop: 10,
    paddingLeft: 5,
  },
  reportButtonContainer: {
    justifyContent: 'flex-end',
    marginBottom: 20,
  },

  alreadyReportedText: {
    color: 'red',
    fontSize: 15,
    marginVertical: 20,
    fontStyle: 'italic',
  },
  relatedTxt: {
    fontSize: 22,
    marginLeft: 5,
    marginTop: 10,
    fontWeight: '500',
    color: theme.colors.secondary,
  },
})
export default OverviewTab

