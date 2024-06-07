import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ingredientIds: [],
  cookingTime: 0,
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
  },
})

export const { setIngredientIds, setCookingTime } = searchSlice.actions

export const selectIngredientIds = (state) => state.search.ingredientIds
export const selectCookingTime = (state) => state.search.cookingTime

export default searchSlice.reducer

