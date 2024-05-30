import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalVisible: false,
  showPopup: false,
  collectionButtonText: "Add to Collection",
  addMealPlanBtnText: "Add to Meal Plan",
  popupMessage: ""
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleModal: state => {
      state.isModalVisible = !state.isModalVisible;
    },
    togglePopup: state => {
      state.showPopup = !state.showPopup;
    },
    setCollectionButtonText: (state, action) => {
      state.collectionButtonText = action.payload;
    },
    setAddMealPlanBtnText: (state, action) => {
      state.addMealPlanBtnText = action.payload;
    },
    setPopupMessage: (state, action) => {
      state.popupMessage = action.payload;
    },
  },
});

export const {
  toggleModal,
  togglePopup,
  setCollectionButtonText,
  setAddMealPlanBtnText,
  setPopupMessage,
} = modalSlice.actions;

export default modalSlice.reducer;
