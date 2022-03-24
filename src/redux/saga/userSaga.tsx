import {call, put, takeEvery} from 'redux-saga/effects';
import {
  API_GET_USER_BY_EMAIL,
  API_USER_LOGIN,
  API_USER_REGISTER,
} from '../../constants';
import {
  IUserData,
  logInUserFailed,
  logInUserSuccess,
  registerUser,
  registerUserFailed,
  registerUserSuccess,
} from '../actions/users';
import {LOGIN_USER, REGISTER_USER} from '../constants';

export interface IUser {
  accessToken: string;
  user: {email: string; id: number};
}

function* registerUserAsync(action: ReturnType<typeof registerUser>) {
  console.log('registerUserAsync');
  const userData = {...action.payload};
  try {
    const response: IUser = yield call(async () => {
      console.log(userData);
      const data = await fetch(API_USER_REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const response = await data.json();
      console.log(response);
      return response;
    });
    const user: IUserData[] = yield call(async () => {
      const data = await fetch(API_GET_USER_BY_EMAIL(response.user.email));
      const res = await data.json();
      return res;
    });
    yield put(registerUserSuccess(user[0]));
  } catch (error: any) {
    yield put(registerUserFailed(error.message));
  }
}

function* logInUserAsync(payload: any) {
  console.log('logInUserAsync');
  const userData = {...payload.payload};
  try {
    const response: IUser = yield call(async () => {
      const data = await fetch(API_USER_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const res = await data.json();
      // console.log(res);
      return res;
    });
    const user: IUserData[] = yield call(async () => {
      const data = await fetch(API_GET_USER_BY_EMAIL(response.user.email));
      const res = await data.json();
      return res;
    });
    yield put(logInUserSuccess(user[0]));
  } catch (error: any) {
    yield put(logInUserFailed(error.message));
  }
}

export function* watchUser() {
  console.log('watchFetchUser');
  yield takeEvery(REGISTER_USER, registerUserAsync);
  yield takeEvery(LOGIN_USER, logInUserAsync);
}
