import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "../constants";


export const logInUser = (data: string) => {
  return {type: LOGIN_USER, payload: data};
};
export const registerUser = (data: string) => {
  return {type: LOGOUT_USER, payload: data};
};
export const logOutUser = () => {
  return {type: REGISTER_USER};
};


// export const userError = () => {
//   return {type: FETCHED_CARS};
// };
