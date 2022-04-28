import {call, put, takeEvery} from 'redux-saga/effects';
import {setUserData} from '../../components/Intro/checkFirstInstall';
import {
  API_GET_USER_BY_EMAIL,
  API_USER_LOGIN,
  API_USER_REGISTER,
} from '../../constants';
import {fetchCustomerCars} from '../reducers/customerCarsReducer';
import {fetchOwnerCars} from '../reducers/ownerCarsReducer';
import {
  IUserData,
  logInUser,
  logInUserFailed,
  logInUserSuccess,
  registerUser,
  registerUserFailed,
  registerUserSuccess,
} from '../reducers/userReducer';

export interface IUser {
  accessToken: string;
  user: {email: string; id: number};
}

function* registerUserAsync(action: ReturnType<typeof registerUser>) {
  const userData = {...action.payload};
  try {
    const response: IUser = yield call(async () => {
      const data = await fetch(API_USER_REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const response = await data.json();
      if (!response.accessToken) {
        throw new Error(response);
      }
      return response;
    });
    const user: IUserData[] = yield call(async () => {
      const data = await fetch(API_GET_USER_BY_EMAIL(response.user.email));
      const res = await data.json();
      return res;
    });
    setUserData(JSON.stringify(userData));
    yield put(registerUserSuccess(user[0]));
  } catch (error: any) {
    yield put(registerUserFailed(error.message));
  }
}

function* logInUserAsync(payload: any) {
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
      if (!res.accessToken) {
        throw new Error(res);
      }
      return res;
    });
    const user: IUserData[] = yield call(async () => {
      const data = await fetch(API_GET_USER_BY_EMAIL(response.user.email));
      const res = await data.json();
      return res;
    });
    setUserData(JSON.stringify(userData));
    yield put(logInUserSuccess(user[0]));
    yield put(fetchOwnerCars(user[0].userName));
    yield put(fetchCustomerCars(user[0].userName));
  } catch (error: any) {
    yield put(logInUserFailed(error.message));
  }
}

export function* watchUser() {
  yield takeEvery(registerUser, registerUserAsync);
  yield takeEvery(logInUser, logInUserAsync);
}
