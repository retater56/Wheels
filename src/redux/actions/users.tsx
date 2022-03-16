import {ADD_USER} from '../constants';
import {LOGIN_USER} from '../constants';
import {LOGOUT_USER} from '../constants';

export function addUser(userName: string) {
  return {
    type: ADD_USER,
    payload: userName
  };
}
export function logInUser() {
  return {
    type: LOGIN_USER,
  };
}
export function logOutUser() {
  return {
    type: LOGOUT_USER,
    payload: ''
  };
}
