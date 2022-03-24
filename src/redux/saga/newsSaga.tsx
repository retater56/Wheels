import {call, put, takeEvery} from 'redux-saga/effects';
import INewsDetail from '../../components/News/types';
import {API_NEWS} from '../../constants';
import {
  requestNewsError,
  requestNewsSuccess,
} from '../actions/news';
import {FETCHED_NEWS} from '../constants';

function* fetchNewsAsync() {
  console.log('fetchNewsAsync');
  try {
    const newsData: INewsDetail[] = yield call(async () => {
      const data = await fetch(API_NEWS);
      const res = await data.json();
      return res.articles;
    });
    yield put(requestNewsSuccess(newsData));
  } catch (error) {
    yield put(requestNewsError());
  }
}

export function* watchFetchNews() {
  console.log('watchFetchNews');
  yield takeEvery(FETCHED_NEWS, fetchNewsAsync);
}
