import {createSlice} from '@reduxjs/toolkit';

const defaultState = {
  isLoading: false,
  isLoggedIn: false,
  error: false,
  userName: '',
};

export interface IUserData {
  email: string;
  password: string;
  userName: string;
  id: number;
}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState: defaultState,
  reducers: {
    registerUser(state, action) {
      state.isLoading = true;
    },
    registerUserSuccess(state, action) {
      state.userName = action.payload.userName;
      state.isLoggedIn = true;
      state.error = false;
    },
    registerUserFailed(state) {
      state.error = true;
    },
    logInUser(state, action) {
      state.isLoading = true;
    },
    logInUserSuccess(state, action) {
      state.userName = action.payload.userName;
      state.isLoggedIn = true;
      state.error = false;
    },
    logInUserFailed(state) {
      state.error = true;
    },
    logOutUser(state) {
      state.isLoggedIn = false;
      state.userName = '';
    },
  },
});

const {actions, reducer} = userSlice;

export const {
  registerUser,
  registerUserSuccess,
  registerUserFailed,
  logInUser,
  logInUserSuccess,
  logInUserFailed,
  logOutUser,
} = actions;

export default reducer;
