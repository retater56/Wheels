import {call, put, takeEvery} from 'redux-saga/effects';
import {ICar} from '../../components/CreateAd/types';
import {API_CARS} from '../../constants';
import {addCar, addCarFailed, addCarSuccess} from '../actions/createAd';
import {ADD_CAR} from '../constants';

function* addCarAsync(action: ReturnType<typeof addCar>) {
  console.log('addCarAsync');

  action.payload.capacity = `${action.payload.capacity} L`;
  action.payload.seats = `${action.payload.seats} Passangers`;

  const carData = {...action.payload};

  try {
    const response: ICar = yield call(async () => {
      console.log(carData);
      const data = await fetch(API_CARS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...carData}),
      });
      const response = await data.json();
      console.log(response);
      return response;
    });
    yield put(addCarSuccess());
  } catch (error: any) {
    yield put(addCarFailed(error.message));
  }
}

export function* watchCreateAd() {
  console.log('watchCreateAd');
  yield takeEvery(ADD_CAR, addCarAsync);
}
