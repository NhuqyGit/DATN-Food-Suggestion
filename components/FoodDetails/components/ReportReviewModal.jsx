import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { theme } from '../../../theme/index'
import Toast from 'react-native-toast-message'
import { useCreateReportMutation } from '../../../slices/reportSlice'
import { useCreateReportReviewMutation } from '../../../slices/reportReviewSlice'

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

const ReportReviewModal = ({ reviewId, isReporting, cancelReporting }) => {
  const [selectedReason, setSelectedReason] = useState(null)
  const [otherReason, setOtherReason] = useState('')
  const [createReportReview] = useCreateReportReviewMutation()

  const toggleReason = (reason) => {
    setSelectedReason(reason === selectedReason ? null : reason)
  }

  const handleReportSubmission = async () => {
    if (!selectedReason) {
      Toast.show({
        type: 'error',
        text1: 'Report Error',
        text2: 'Please select at least one reason.',
        textStyle: { fontSize: 20 },
      })
      return
    }

    const reason =
      selectedReason === 'Others'
        ? `${selectedReason}: ${otherReason}`
        : selectedReason
    const response = await createReportReview({
      reviewId: parseInt(reviewId),
      reason,
    })

    if (response.error) {
      Toast.show({
        type: 'error',
        text1: 'Report Error',
        text2: 'You have already reported this review.',
        textStyle: { fontSize: 20 },
      })
      return
    }
    if (response.data?.id) {
      Toast.show({
        type: 'success',
        text1: 'Report Submitted',
        text2: 'Report issued successfully.',
        textStyle: { fontSize: 20 },
      })
    }

    cancelReporting()
    setOtherReason('')
    setSelectedReason(undefined)
  }

  return (
    <Modal transparent visible={isReporting} onRequestClose={cancelReporting}>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.overlay} onPress={cancelReporting} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.innerReportContainer}
        >
          <Text style={styles.modalTitle}>Select Reasons for Report</Text>
          <TouchableOpacity style={styles.closeIcon} onPress={cancelReporting}>
            <Icon name='close' size={22} color='black' />
          </TouchableOpacity>
          <ScrollView showsVerticalScrollIndicator={false}>
            {reportReasons.map((reason, index) => (
              <TouchableOpacity
                key={index}
                style={styles.reasonOptionContainer}
                onPress={() => toggleReason(reason)}
              >
                <Ionicons
                  name={
                    selectedReason === reason
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
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
                numberOfLines={3}
              />
            )}
          </ScrollView>
          <View style={styles.btnSaveContainer}>
            <TouchableOpacity
              style={styles.reportButton}
              onPress={handleReportSubmission}
            >
              <Text style={styles.reportButtonText}>Report</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  )
}

export default ReportReviewModal

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
  btnSaveContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reportButton: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    width: '30%',
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

  otherReasonInput: {
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    borderRadius: 5,
    padding: 10,
  },
})

