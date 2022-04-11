import {call, put, takeEvery} from 'redux-saga/effects';
import {ICar} from '../../components/CreateAd/types';
import {
  bookingCar,
  bookingCarFailed,
  bookingCarSuccess,
  bookingDateData,
  bookingDateDataSuccess,
} from '../reducers/bookingCarReducer';
import {
  API_GET_CAR_BY_ID,
  API_GET_USER_BY_ID,
  API_GET_USER_NAME,
} from '../../constants';
import {rentData} from '../../components/Search/constants';
import { fetchCustomerCars } from '../reducers/customerCarsReducer';

function* bookingCarAsync(action: ReturnType<typeof bookingCar>) {
  console.log('bookingCarAsync');

  const customerData = action.payload;

  const {rentDate, rentTime, customerName, carId} = customerData;

  const customerRentData: {
    [desc: string]: string;
  } = {};

  const bookingData: {
    [desc: string]: any;
  } = {};

  customerRentData[`${rentTime}`] = customerName;

  bookingData[`${rentDate}`] = {...customerRentData};

  const customerRentDataCar: {
    [desc: string]: string;
  } = {};

  const bookingUserData: {
    [desc: string]: any;
  } = {};

  customerRentDataCar[`${rentTime}`] = carId;

  bookingUserData[`${rentDate}`] = {...customerRentDataCar};

  try {
    const userBookingData: ICar[] = yield call(async () => {
      console.log('userBookingData');
      const response = await fetch(API_GET_USER_NAME(customerName));
      const responseData = await response.json();
      const prevRentUserDate = responseData[0].booked[rentDate];
      console.log(prevRentUserDate);
      let commonBookings = {};
      if (prevRentUserDate) {
        if (prevRentUserDate[rentTime]) {
          throw new Error('You have car at this time');
        }
        commonBookings = {
          ...prevRentUserDate,
          ...customerRentDataCar,
        };
      } else {
        console.log(`no prevRentUserDate` + prevRentUserDate);
        commonBookings = {
          ...customerRentDataCar,
        };
      }
      bookingUserData[`${rentDate}`] = {...commonBookings};
      return bookingUserData;
    });
    console.log(JSON.stringify(userBookingData));
    const responseUser: ICar = yield call(async () => {
      const getUserData = await fetch(API_GET_USER_NAME(customerName));
      const userData = await getUserData.json();
      const userId = userData[0].id;
      const response = await fetch(API_GET_USER_BY_ID(userId));
      const responseData = await response.json();
      const prevRentUserDate = responseData.booked;
      const data = await fetch(API_GET_USER_BY_ID(userId), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booked: {...prevRentUserDate, ...userBookingData},
        }),
      });
      const res = await data.json();
      console.log(res);
      // return response;
    });
    const carBookingData: ICar[] = yield call(async () => {
      const response = await fetch(API_GET_CAR_BY_ID(carId));
      const responseData = await response.json();
      const rentCarDate = responseData.booking[rentDate];
      let commonBookings = {};
      if (rentCarDate) {
        commonBookings = {
          ...rentCarDate,
          ...customerRentData,
        };
      } else {
        console.log(`no rentCarDate` + rentCarDate);
        commonBookings = {
          ...customerRentData,
        };
      }
      bookingData[`${rentDate}`] = {...commonBookings};
      return bookingData;
    });
    const responseCar: ICar = yield call(async () => {
      const getCarData = await fetch(API_GET_CAR_BY_ID(customerData.carId));
      const carData = await getCarData.json();
      const prevBookingData = carData.booking;
      const data = await fetch(API_GET_CAR_BY_ID(customerData.carId), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          booking: {...prevBookingData, ...carBookingData},
        }),
      });
      const res = await data.json();
      console.log(res);
      // return response;
    });
    yield put(bookingCarSuccess());
    yield put(fetchCustomerCars(customerName))
  } catch (error) {
    console.log(error);
    yield put(bookingCarFailed());
  }
}

function* bookingDateDataAsync(action: ReturnType<typeof bookingDateData>) {
  console.log('bookingDateDataAsync');

  const {carId, rentDateFormat} = action.payload;

  const carBookingData: ICar[] = yield call(async () => {
    const response = await fetch(API_GET_CAR_BY_ID(carId));
    const responseData = await response.json();
    const rentCarDate = responseData.booking[rentDateFormat];
    if (rentCarDate) {
      const arrDates = Object.keys(rentCarDate);
      const freeTime = rentData.filter(time => !arrDates.includes(time.value));
      console.log(freeTime);
      return freeTime;
    } else {
      return rentData;
    }
  });
  yield put(bookingDateDataSuccess(carBookingData));
}

export function* watchBookingCar() {
  console.log('watchBookingCar');
  yield takeEvery(bookingCar, bookingCarAsync);
  yield takeEvery(bookingDateData, bookingDateDataAsync);
}
