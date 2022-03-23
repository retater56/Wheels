import INewsDetail from '../../components/News/types';
import {
  FETCHED_NEWS,
  REQUESTED_NEWS_FAILED,
  REQUESTED_NEWS_SUCCEEDED,
} from '../constants';

const defaultState: {
  newsIsFetching: boolean,
  dataNews: INewsDetail[],
  error: boolean
} = {
  newsIsFetching: false,
  dataNews: [],
  error: false
};

export const newsReducer = (
  state = defaultState,
  action: {type: string; payload: []},
) => {
  switch (action.type) {
    case FETCHED_NEWS:
      return {
        ...state,
        newsIsFetching: true,
        error: false,
      };
    case REQUESTED_NEWS_SUCCEEDED:
      return {
        ...state,
        dataNews: action.payload,
        newsIsFetching: false,
        error: false,
      };
    case REQUESTED_NEWS_FAILED:
      return {
        ...state,
        newsIsFetching: false,
        error: true,
      };
    default:
      return state;
  }
};
