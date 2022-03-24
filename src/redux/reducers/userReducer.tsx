import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
} from '../constants';

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

export const userReducer = (
  state = defaultState,
  action: {
    type: string;
    payload: IUserData;
  },
) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        userName: action.payload.userName,
        isLoggedIn: true,
        error: false,
      };
    case REGISTER_USER_FAILED:
      return {
        ...state,
        error: true,
      };
    case LOGIN_USER:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        userName: action.payload.userName,
        isLoggedIn: true,
        error: false,
      };
    case LOGIN_USER_FAILED:
      return {
        ...state,
        error: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
        userName: '',
      };
    default:
      return state;
  }
};
