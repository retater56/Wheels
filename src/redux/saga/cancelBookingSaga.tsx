import {call, put, takeEvery} from 'redux-saga/effects';
import {ICar} from '../../components/CreateAd/types';
import {
  API_GET_CAR_BY_ID,
  API_GET_USER_BY_ID,
  API_GET_USER_NAME,
} from '../../constants';
import {
  cancelBooking,
  cancelBookingFailed,
  cancelBookingSuccess,
} from '../reducers/cancelBookingReducer';
import { fetchCustomerCars } from '../reducers/customerCarsReducer';

function* cancelBookingAsync(action: ReturnType<typeof cancelBooking>) {
  console.log('cancelBookingAsync');

  const carData = action.payload.item;
  const userName = action.payload.userName;

  const {rentDate, rentTime, id} = carData;

  try {
    const updateUserBooking: ICar = yield call(async () => {
      const getUserData = await fetch(API_GET_USER_NAME(userName));
      const userData = await getUserData.json();
      const userDataBooked = {...userData[0].booked};
      let newUserData: any = {};
      let newBookedData: any = {};
      const dateBooked = userDataBooked[rentDate];
      if (dateBooked[rentTime]) {
        newBookedData = {...dateBooked};
        if (Object.keys(dateBooked).length === 1) {
          delete userDataBooked[rentDate];
          return userDataBooked;
        }
        delete newBookedData[rentTime];
        newUserData[rentDate] = newBookedData;
        return {...userDataBooked, ...newUserData};
      }
    });
    const responseUser: ICar = yield call(async () => {
      const getUserData = await fetch(API_GET_USER_NAME(userName));
      const userData = await getUserData.json();
      const userId = userData[0].id;
      const data = await fetch(API_GET_USER_BY_ID(userId), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booked: {...updateUserBooking},
        }),
      });
      const res = await data.json();
      // return response;
    });
    const updateCarBooking: ICar = yield call(async () => {
      const response = await fetch(API_GET_CAR_BY_ID(id));
      const carData = await response.json();
      let newBookingData: any = {};
      const newCarData = {...carData.booking};
      let bookingData = carData.booking[rentDate];
      if (bookingData[rentTime]) {
        newBookingData = {...bookingData};
        if (Object.keys(bookingData).length === 1) {
          delete newCarData[rentDate];
          return newCarData;
        }
        delete newBookingData[rentTime];
        newCarData[rentDate] = newBookingData;
        return newCarData;
      }
    });
    const responseCar: ICar = yield call(async () => {
      const data = await fetch(API_GET_CAR_BY_ID(id), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking: {...updateCarBooking},
        }),
      });
      const res = await data.json();
      // return responseCar;
    });
    yield put(cancelBookingSuccess());
    yield put(fetchCustomerCars(userName))
  } catch (error) {
    yield put(cancelBookingFailed());
  }
}

export function* watchCancelBooking() {
  console.log('watchCancelBooking');
  yield takeEvery(cancelBooking, cancelBookingAsync);
}
