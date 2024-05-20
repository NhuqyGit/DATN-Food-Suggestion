import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: null,
}

export const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    },
  },
})

export const { setUserInfo } = userLoginSlice.actions

export const selectUserInfo = (state) => state.userLogin.userInfo

export default userLoginSlice.reducer

