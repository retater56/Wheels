import {call, put, takeEvery} from 'redux-saga/effects';
import INewsDetail from '../../components/News/types';
import {API_NEWS} from '../../constants';
import {
  fetchNews,
  requestNewsError,
  requestNewsSuccess,
} from '../reducers/newsReducer';

function* fetchNewsAsync(action: ReturnType<typeof fetchNews>) {
  console.log('fetchNewsAsync');
  const keyword = action.payload;

  try {
    const newsData: INewsDetail[] = yield call(async () => {
      const data = await fetch(API_NEWS(keyword));
      const res = await data.json();
      return res.articles;
    });
    console.log(newsData);
    yield put(requestNewsSuccess(newsData));
  } catch (error) {
    yield put(requestNewsError());
  }
}

export function* watchFetchNews() {
  console.log('watchFetchNews');
  yield takeEvery(fetchNews, fetchNewsAsync);
}
