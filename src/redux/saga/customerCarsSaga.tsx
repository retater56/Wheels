import {call, put, takeEvery} from 'redux-saga/effects';
import {ICar} from '../../components/CreateAd/types';
import {
  API_GET_CAR_BY_ID,
  API_GET_CUSTOMER_CARS_BY_NAME,
} from '../../constants';
import {
  fetchCustomerCars,
  requestCustomerCarsSuccess,
  requestCustomerCarsError,
} from '../reducers/customerCarsReducer';

function* fetchCustomerCarsAsync(action: ReturnType<typeof fetchCustomerCars>) {
  const customer = action.payload;

  try {
    console.log('fetchCustomerCarsAsync');
    const carsData: ICar[] = yield call(async () => {
      const response = await fetch(API_GET_CUSTOMER_CARS_BY_NAME(customer));
      const responseData = await response.json();
      const customerBooked = responseData[0].booked;
      console.log(customerBooked);
      let carsArray = [];
      for (let date in customerBooked) {
        let carId = '';
        let carData = {};
        const rentDate = date;
        const timeData = customerBooked[date];
        for (let time in timeData) {
          carId = timeData[time];
          const car = await fetch(API_GET_CAR_BY_ID(carId));
          const res = await car.json();
          carData = {...res, ...{rentTime: time}};
          carData = {...carData, ...{rentDate: rentDate}};
          carsArray.push(carData);
        }
      }
      return carsArray;
    });
    yield put(requestCustomerCarsSuccess(carsData));
  } catch (error) {
    yield put(requestCustomerCarsError());
  }
}

export function* watchFetchCustomerCars() {
  console.log('watchFetchCustomerCars');
  yield takeEvery(fetchCustomerCars, fetchCustomerCarsAsync);
}
