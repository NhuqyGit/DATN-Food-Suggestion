import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  isDonePersonalization: false,
  userInfo: {},
};

export const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.isLogin = false;
      state.userInfo = {};
    },
    setIsDonePersonalization: (state, action) => {
      state.isDonePersonalization = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setIsDonePersonalization } =
  userLoginSlice.actions;

export const selectLogin = (state) => state.userLogin.isLogin;
export const selectUserInfo = (state) => state.userLogin.userInfo;
export const selectIsDonePersonalization = (state) =>
  state.userLogin.isDonePersonalization;

export default userLoginSlice.reducer;
