import {useSelector} from 'react-redux';
import {call, put, takeEvery} from 'redux-saga/effects';
import {API_CARS, getUserName} from '../../constants';
import {addCarFailed} from '../actions/createAd';
import {ADD_CAR} from '../constants';

//   const accountName = useSelector(getUserName);

export interface IUser {
  accessToken: string;
  user: {email: string; id: number};
}

export interface IUserData {
  email: string;
  password: string;
  userName: string;
  id: number;
}

function* addCarAsync(payload: any) {
  console.log('addCarAsync');

  payload.capacity = `${payload.capacity} L`;
  payload.seats = `${payload.seats} Passangers`;

  const carData = {...payload.payload};

  try {
    const response: IUser = yield call(async () => {
      console.log(carData);
      const data = await fetch(API_CARS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...carData}),
        // body: JSON.stringify({...carData, user: accountName}),
      });
      const response = await data.json();
      console.log(response);
      return response;
    });
    // yield put(addCarSuccess(user));
  } catch (error: any) {
    yield put(addCarFailed(error.message));
  }
}

export function* watchCreateAd() {
  console.log('watchCreateAd');
  yield takeEvery(ADD_CAR, addCarAsync);
}
