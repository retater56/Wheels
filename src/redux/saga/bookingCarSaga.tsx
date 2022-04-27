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
import {fetchCustomerCars} from '../reducers/customerCarsReducer';

function* bookingCarAsync(action: ReturnType<typeof bookingCar>) {
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
      const response = await fetch(API_GET_USER_NAME(customerName));
      const responseData = await response.json();
      const prevRentUserDate = responseData[0].booked[rentDate];
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
        commonBookings = {
          ...customerRentDataCar,
        };
      }
      bookingUserData[`${rentDate}`] = {...commonBookings};
      return bookingUserData;
    });
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
      // return response;
    });
    yield put(bookingCarSuccess());
    yield put(fetchCustomerCars(customerName));
  } catch (error: any) {
    yield put(bookingCarFailed(error.message));
  }
}

function* bookingDateDataAsync(action: ReturnType<typeof bookingDateData>) {
  const {carId, rentDateFormat} = action.payload;

  const carBookingData: ICar[] = yield call(async () => {
    const response = await fetch(API_GET_CAR_BY_ID(carId));
    const responseData = await response.json();
    const rentCarDate = responseData.booking[rentDateFormat];
    if (rentCarDate) {
      const arrDates = Object.keys(rentCarDate);
      const freeTime = rentData.filter(
        (time) => !arrDates.includes(time.value),
      );
      return freeTime;
    } else {
      return rentData;
    }
  });
  yield put(bookingDateDataSuccess(carBookingData));
}

export function* watchBookingCar() {
  yield takeEvery(bookingCar, bookingCarAsync);
  yield takeEvery(bookingDateData, bookingDateDataAsync);
}
