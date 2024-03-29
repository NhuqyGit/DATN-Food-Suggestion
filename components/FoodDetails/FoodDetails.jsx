import React, { useState } from 'react'
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import StarRating from 'react-native-star-rating'
import Icon from 'react-native-vector-icons/FontAwesome'
import MoreByCreator, {
  renderStarRating,
} from './components/MoreByCreator/MoreByCreator'

const foodDetails = {
  name: 'Delicious Dish',
  author: 'Chef Huu Nien :)',
  image: require('../../assets/monngon.jpg'),
  ingredients: [
    'Ingredient 1',
    'Ingredient 2',
    'Ingredient 3',
    'Ingredient 4',
    'Ingredient 5',
    'Ingredient 6',
  ],
  reviews: [
    { user: 'User1', comment: 'Delicious!', rating: 1 },
    { user: 'User2', comment: 'Amazing recipe!', rating: 4 },
    { user: 'User1', comment: 'Delicious!', rating: 5 },
    { user: 'User2', comment: 'Amazing recipe!', rating: 4.5 },
    { user: 'User1', comment: 'Delicious!', rating: 2 },
    { user: 'User2', comment: 'Amazing recipe!', rating: 3 },
    { user: 'User1', comment: 'Delicious!', rating: 3.4 },
    { user: 'User2', comment: 'Amazing recipe!', rating: 4 },
  ],
  rating: 4,
  totalTime: 40,
}
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

const moreByThisCreator = [
  {
    id: '1',
    name: 'Recipe 1',
    author: 'Chef Huu Nien :)',
    rating: 5,
    image: require('../../assets/monngon.jpg'),
  },
  {
    id: '2',
    name: 'Recipe 2',
    author: 'Chef Huu Nien :)',
    rating: 3,
    image: require('../../assets/monngon.jpg'),
  },
  {
    id: '3',
    name: 'Recipe 3',
    author: 'Chef Huu Nien :)',
    rating: 4.5,
    image: require('../../assets/monngon.jpg'),
  },
  {
    id: '4',
    name: 'Recipe 4',
    author: 'Chef Huu Nien :)',
    rating: 5,
    image: require('../../assets/monngon.jpg'),
  },
  {
    id: '5',
    name: 'Recipe 5',
    author: 'Chef Huu Nien :)',
    rating: 3,
    image: require('../../assets/monngon.jpg'),
  },
]

function FoodDetailsScreen() {
  const [selectedTab, setSelectedTab] = useState('overview')

  const [isModalVisible, setModalVisible] = useState(false)
  const [isAddingReview, setAddingReview] = useState(false)
  const [newReview, setNewReview] = useState({
    user: '',
    rating: 0,
    comment: '',
  })
  const [selectedReasons, setSelectedReasons] = useState([])
  const [isReporting, setReporting] = useState(false)

  const startReporting = () => {
    setReporting(true)
  }

  const cancelReporting = () => {
    setReporting(false)
    setSelectedReasons([])
  }

  const toggleReason = (reason) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter((r) => r !== reason))
    } else {
      setSelectedReasons([...selectedReasons, reason])
    }
  }

  const handleReportSubmission = () => {
    alert(`Report Issued for Reasons: ${selectedReasons.join(', ')}`)
    cancelReporting()
  }

  const startAddingReview = () => {
    setAddingReview(true)
  }

  const cancelAddingReview = () => {
    setAddingReview(false)
  }

  const addReview = () => {
    alert(`New Review: ${JSON.stringify(newReview)}`)
    setNewReview({ user: '', rating: 0, comment: '' })
    cancelAddingReview()
  }
  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const handleAddToMealPlan = () => {
    toggleModal()
    alert('Food added to Meal Plan!')
  }

  const handleAddToCollection = () => {
    toggleModal()
    alert('Food added to Collection!')
  }

  const handleTabPress = (tab) => {
    setSelectedTab(tab)
  }

  const renderOverviewTab = () => (
    <View style={styles.containter}>
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Icon name='star' size={20} color='#FF6321' style={styles.icon} />
          <Text style={{ fontWeight: 'semibold' }}>Rating:</Text>
          <Text style={styles.value}>{foodDetails.rating}</Text>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Icon name='clock-o' size={20} color='black' style={styles.icon} />
          <Text style={{ fontWeight: 'semibold' }}>Total time:</Text>
          <Text style={styles.value}>{foodDetails.totalTime} mins</Text>
        </View>
      </View>
      <View style={styles.line} />
      <MoreByCreator author={foodDetails.author} recipes={moreByThisCreator} />
      <TouchableOpacity onPress={startReporting}>
        <Text style={styles.reportIssuer}>Report Issuer</Text>
      </TouchableOpacity>
    </View>
  )

  const renderIngredientsTab = () => (
    <ScrollView style={styles.containter}>
      {foodDetails.ingredients.map((ingredient, index) => (
        <View>
          <View key={index} style={styles.ingredientRow}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => alert(`Add ${ingredient} to shopping list!`)}
            >
              <Icon name='cutlery' size={20} color='white' />
            </TouchableOpacity>
            <Text style={styles.ingredientText}>{ingredient}</Text>
          </View>
          <View style={styles.line} />
        </View>
      ))}
    </ScrollView>
  )

  const renderReviewsTab = () => (
    <View>
      <TouchableOpacity
        style={styles.addReviewButton}
        onPress={startAddingReview}
      >
        <Icon name='comment' size={20} color='green' />
        <Text style={styles.addReviewText}>Add Review</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <ScrollView style={styles.containter}>
        {foodDetails.reviews.map((review, index) => (
          <View key={index} style={styles.reviewContainer}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{review.user[0]}</Text>
            </View>

            <View style={styles.reviewDetails}>
              <Text style={styles.userName}>{review.user}</Text>
              <View style={styles.ratingContainer}>
                <View style={styles.ratingContainer}>
                  {renderStarRating(review.rating)}
                </View>
                <Text style={styles.ratingText}>{review.rating}</Text>
              </View>
              <Text>{review.comment}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )

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
          <TouchableOpacity style={styles.closeIcon} onPress={cancelReporting}>
            <Icon name='close' size={20} color='black' />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Select Reasons for Report</Text>
          {reportReasons.map((reason, index) => (
            <TouchableOpacity
              key={index}
              style={styles.reasonOptionContainer}
              onPress={() => toggleReason(reason)}
            >
              {selectedReasons.includes(reason) ? (
                <Icon name='check-square-o' size={20} color='green' />
              ) : (
                <Icon name='square-o' size={20} color='green' />
              )}
              <Text style={styles.reasonOptionText}>{reason}</Text>
            </TouchableOpacity>
          ))}
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
    <View style={{ flex: 1 }}>
      <Image
        source={foodDetails.image}
        style={{ width: '100%', height: 300 }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 10,
        }}
      >
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            {foodDetails.name}
          </Text>
          <Text style={{ fontSize: 16 }}>{`By ${foodDetails.author}`}</Text>
        </View>

        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            backgroundColor: 'green',
          }}
          onPress={toggleModal}
        >
          <Icon name='plus' size={20} color='white' />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => handleTabPress('overview')}
          style={{
            padding: 10,
            borderBottomColor: 'green',
            borderBottomWidth: selectedTab === 'overview' ? 2 : 0,
          }}
        >
          <Text>Overview</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabPress('ingredients')}
          style={{
            padding: 10,
            borderBottomColor: 'green',
            borderBottomWidth: selectedTab === 'ingredients' ? 2 : 0,
          }}
        >
          <View>
            <Text>Ingredients</Text>
            <Text style={{ fontSize: 12 }}>
              {foodDetails.ingredients.length} Items
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabPress('reviews')}
          style={{
            padding: 10,
            borderBottomColor: 'green',
            borderBottomWidth: selectedTab === 'reviews' ? 2 : 0,
          }}
        >
          <View>
            <Text>Reviews</Text>
            <Text style={{ fontSize: 12 }}>
              {foodDetails.reviews.length} Items
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, marginTop: 20 }}>
        {selectedTab === 'overview' && renderOverviewTab()}
        {selectedTab === 'ingredients' && renderIngredientsTab()}
        {selectedTab === 'reviews' && renderReviewsTab()}
      </ScrollView>

      <Modal
        animationType='slide'
        transparent
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.overlay} onPress={toggleModal} />
          <View style={styles.innerContainer}>
            <TouchableOpacity style={styles.closeIcon} onPress={toggleModal}>
              <Icon name='close' size={20} color='black' />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleAddToMealPlan}
            >
              <Icon name='file' size={20} color='#4CAF50' />
              <Text style={styles.modalOptionText}>Add to Meal Plan</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleAddToCollection}
            >
              <Icon name='plus' size={20} color='#4CAF50' />
              <Text style={styles.modalOptionText}>Add to Collection</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType='slide'
        transparent
        visible={isAddingReview}
        onRequestClose={cancelAddingReview}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.overlay}
            onPress={cancelAddingReview}
          />
          <View style={styles.innerContainer}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={cancelAddingReview}
            >
              <Icon name='close' size={20} color='black' />
            </TouchableOpacity>
            <View style={styles.addReviewContainer}>
              <View style={styles.starRating}>
                <StarRating
                  maxStars={5}
                  rating={newReview.rating}
                  starSize={20}
                  fullStarColor='#FF6321'
                  selectedStar={(rating) =>
                    setNewReview({ ...newReview, rating })
                  }
                />
              </View>

              <TextInput
                style={styles.yourReview}
                placeholder='Your Review'
                multiline
                value={newReview.comment}
                onChangeText={(text) =>
                  setNewReview({ ...newReview, comment: text })
                }
              />
              <TouchableOpacity
                style={styles.addButtonReview}
                onPress={addReview}
              >
                <Text style={styles.addButtonText}>Add Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {renderReportModal()}
    </View>
  )
}

const styles = StyleSheet.create({
  containter: {
    marginLeft: 10,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 5,
  },
  value: {
    marginLeft: 5,
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'green',
    marginBottom: 20,
    paddingBottom: 20,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 16,
  },
  addReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  addReviewText: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: 'semibold',
  },
  reviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  avatarContainer: {
    backgroundColor: 'lightgray',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
  },
  reviewDetails: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  ratingText: {
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  innerContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: 252,
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    padding: 5,
    marginTop: 15,
  },
  modalOptionText: {
    marginLeft: 10,
  },

  addReviewContainer: {
    padding: 10,
  },
  addButtonReview: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginTop: 45,
  },
  addButtonText: {
    color: 'white',
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: 'white',
  },
  starRating: {
    marginRight: 50,
    marginTop: 20,
  },
  yourReview: {
    marginTop: 25,
  },

  reportIssuer: {
    color: '#4CAF50',
    fontSize: 16,

    marginTop: 10,
    marginBottom: 30,
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
    backgroundColor: '#FF6321',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  reportButtonText: {
    color: 'white',
    fontSize: 16,
  },
})
export default FoodDetailsScreen
