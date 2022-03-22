import {call, put, takeEvery} from 'redux-saga/effects';
import INewsDetail from '../../components/News/types';
import {API_NEWS} from '../../constants';
import {requestNews, requestNewsSuccess} from '../actions/news';
import {FETCHED_NEWS} from '../constants';

function* fetchNewsAsync() {
  console.log('fetchNewsAsync');
  try {
    yield put(requestNews());
    const newsData: INewsDetail[] = yield call(async () => {
      const data = await fetch(API_NEWS);
      const res = await data.json();
      return res.articles;
    });
    yield put(requestNewsSuccess(newsData));
  } catch (error) {
    console.log(error);
  }
}

export function* watchFetchNews() {
  console.log('watchFetchNews');
  yield takeEvery(FETCHED_NEWS, fetchNewsAsync);
}
