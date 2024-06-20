import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ingredientIds: [],
  cookingTime: 0,
  step: 1,
  ingredientNames: [],
  searchCollectionIndex: 0,
}

export const searchSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setIngredientIds: (state, action) => {
      state.ingredientIds = action.payload
    },
    setCookingTime: (state, action) => {
      state.cookingTime = action.payload
    },
    setSearchStep: (state, action) => {
      state.step = action.payload
    },
    setIngredientNames: (state, action) => {
      state.ingredientNames = action.payload
    },
    setSearchCollectionIndex: (state, action) => {
      state.searchCollectionIndex = action.payload
    },
  },
})

export const {
  setIngredientIds,
  setCookingTime,
  setSearchStep,
  setIngredientNames,
  setSearchCollectionIndex,
} = searchSlice.actions

export const selectIngredientIds = (state) => state.search.ingredientIds
export const selectCookingTime = (state) => state.search.cookingTime
export const selectStep = (state) => state.search.step
export const selectIngredientNames = (state) => state.search.ingredientNames
export const selectSearchCollectionIndex = (state) =>
  state.search.searchCollectionIndex

export default searchSlice.reducer

