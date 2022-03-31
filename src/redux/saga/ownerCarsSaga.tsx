import {call, put, takeEvery} from 'redux-saga/effects';
import {ICar} from '../../components/CreateAd/types';
import {API_CARS} from '../../constants';
import {
  fetchOwnerCars,
  requestOwnerCarsError,
  requestOwnerCarsSuccess,
} from '../reducers/ownerCarsReducer';

function* fetchOwnerCarsAsync(action: ReturnType<typeof fetchOwnerCars>) {
  const owner = action.payload;

  try {
    console.log('fetchOwnerCarsAsync');
    const carsData: ICar[] = yield call(async () => {
      const response = await fetch(API_CARS);
      const responseData = await response.json();
      const ownerCars = [];
      for (let car of responseData) {
        if (car.owner === owner) {
          ownerCars.push(car);
        }
      }
      return ownerCars;
    });
    yield put(requestOwnerCarsSuccess(carsData));
  } catch (error) {
    yield put(requestOwnerCarsError());
  }
}

export function* watchFetchOwnerCars() {
  console.log('watchFetchOwnerCars');
  yield takeEvery(fetchOwnerCars, fetchOwnerCarsAsync);
}
