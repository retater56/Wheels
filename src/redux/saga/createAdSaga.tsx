import {call, put, takeEvery} from 'redux-saga/effects';
import {ICar} from '../../components/CreateAd/types';
import {API_CARS, API_GET_CAR_BY_ID} from '../../constants';
import {fetchCars} from '../reducers/carsReducer';
import {
  addCar,
  addCarFailed,
  addCarSuccess,
  updateCar,
} from '../reducers/createAdReducer';

function* addCarAsync(action: ReturnType<typeof addCar>) {
  console.log('addCarAsync');

  let carData = {};

  if (action.payload.fuel === 'Electric') {
    carData = {
      ...action.payload,
      ...{capacity: `${action.payload.capacity} kWh`},
    };
  } else {
    carData = {
      ...action.payload,
      ...{capacity: `${action.payload.capacity} L`},
    };
  }

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
    yield put(fetchCars());
  } catch (error) {
    yield put(addCarFailed());
  }
}

function* updateCarAsync(action: ReturnType<typeof updateCar>) {
  console.log('updateCarAsync');

  action.payload.capacity = `${action.payload.capacity} L`;

  const carData = {...action.payload};

  try {
    const response: ICar = yield call(async () => {
      const data = await fetch(API_GET_CAR_BY_ID(carData.id), {
        method: 'PATCH',
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
    yield put(fetchCars());
  } catch (error) {
    yield put(addCarFailed());
  }
}

export function* watchCreateAd() {
  console.log('watchCreateAd');
  yield takeEvery(addCar, addCarAsync);
  yield takeEvery(updateCar, updateCarAsync);
}
