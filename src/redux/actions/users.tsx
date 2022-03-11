import {ADD_USER} from '../constants';
import {LOGIN_USER} from '../constants';
import {LOGOUT_USER} from '../constants';

export function addUser() {
  return {
    type: ADD_USER,
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
  };
}
