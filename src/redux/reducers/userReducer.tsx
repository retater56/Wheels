import {createSlice} from '@reduxjs/toolkit';

const defaultState = {
  isLoading: false,
  isLoggedIn: false,
  error: false,
  errorMessage: '',
  userName: '',
};

export interface IUserData {
  email: string;
  password: string;
  userName: string;
  id: number;
  booked: {};
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
    registerUserFailed(state, action) {
      state.error = true;
      state.errorMessage = action.payload;
    },
    logInUser(state, action) {
      state.isLoading = true;
    },
    logInUserSuccess(state, action) {
      state.userName = action.payload.userName;
      state.isLoggedIn = true;
      state.error = false;
    },
    logInUserFailed(state, action) {
      state.error = true;
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    logOutUser(state) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.userName = '';
    },
    clearError(state) {
      state.error = false;
      state.errorMessage = '';
      state.isLoading = false;
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
  clearError,
} = actions;

export default reducer;
