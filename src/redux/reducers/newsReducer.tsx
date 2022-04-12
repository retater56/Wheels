import {createSlice} from '@reduxjs/toolkit';
import INewsDetail from '../../components/News/types';

const defaultState: {
  currentTheme: string;
  newsIsFetching: boolean;
  dataNews: INewsDetail[];
  error: boolean;
} = {
  currentTheme: '',
  newsIsFetching: false,
  dataNews: [],
  error: false,
};

export const newsSlice = createSlice({
  name: 'news',
  initialState: defaultState,
  reducers: {
    fetchNews(state, action) {
      state.currentTheme = action.payload;
      state.newsIsFetching = true;
      state.error = false;
    },
    requestNewsSuccess(state, action) {
      state.dataNews = action.payload;
      state.newsIsFetching = false;
      state.error = false;
    },
    requestNewsError(state) {
      state.newsIsFetching = false;
      state.error = true;
    },
  },
});

const {actions, reducer} = newsSlice;

export const {fetchNews, requestNewsSuccess, requestNewsError} = actions;

export default reducer;
