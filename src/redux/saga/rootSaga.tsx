import {all} from 'redux-saga/effects';
import {watchFetchCars} from './carsSaga';
import {watchCreateAd} from './createAdSaga';
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
  ]);
}
