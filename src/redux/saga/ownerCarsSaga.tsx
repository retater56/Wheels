import {call, put, takeEvery} from 'redux-saga/effects';
import {ICar} from '../../components/CreateAd/types';
import {API_CARS, API_GET_CAR_BY_ID} from '../../constants';
import {
  deleteOwnerCar,
  deleteOwnerCarFailed,
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
function* deleteOwnerCarAsync(action: ReturnType<typeof deleteOwnerCar>) {
  const id = action.payload;
  try {
    const response: ICar = yield call(async () => {
      const data = await fetch(API_GET_CAR_BY_ID(id), {
        method: 'DELETE',
      });
      const response = await data.json();
      console.log(response);
      return response;
    });
  } catch (error) {
    yield put(deleteOwnerCarFailed());
  }
}

export function* watchFetchOwnerCars() {
  console.log('watchFetchOwnerCars');
  yield takeEvery(fetchOwnerCars, fetchOwnerCarsAsync);
  yield takeEvery(deleteOwnerCar, deleteOwnerCarAsync);
}
