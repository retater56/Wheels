import {
  REGISTER_USER,
  LOGIN_USER,
  LOGOUT_USER,
  REGISTER_USER_FAILED,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
} from '../constants';


export interface IUserData {
  email: string;
  password: string;
  userName: string;
  id?: number
}

export function registerUser(data: IUserData) {
  return {
    type: REGISTER_USER,
    payload: data,
  };
}

export function registerUserSuccess(data: IUserData) {
  return {
    type: REGISTER_USER_SUCCESS,
    payload: data,
  };
}

export function registerUserFailed(message: string) {
  return {type: REGISTER_USER_FAILED, payload: message};
}

export function logInUser(data: {email: string; password: string}) {
  return {
    type: LOGIN_USER,
    payload: data,
  };
}

export function logInUserSuccess(data: IUserData) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data,
  };
}

export function logInUserFailed(message: string) {
  return {type: LOGIN_USER_FAILED, payload: message};
}

export function logOutUser() {
  return {
    type: LOGOUT_USER,
    payload: '',
  };
}
