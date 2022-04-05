import {all} from 'redux-saga/effects';
import {watchBookingCar} from './bookingCarSaga';
import {watchCancelBooking} from './cancelBookingSaga';
import {watchFetchCars} from './carsSaga';
import {watchCreateAd} from './createAdSaga';
import {watchFetchCustomerCars} from './customerCarsSaga';
import {watchFetchNews} from './newsSaga';
import {watchFetchOwnerCars} from './ownerCarsSaga';
import {watchUser} from './userSaga';

export function* rootWatcher() {
  yield all([
    watchFetchCars(),
    watchFetchNews(),
    watchUser(),
    watchCreateAd(),
    watchFetchOwnerCars(),
    watchFetchCustomerCars(),
    watchBookingCar(),
    watchCancelBooking(),
  ]);
}
