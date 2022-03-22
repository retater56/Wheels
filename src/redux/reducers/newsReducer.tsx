import {
  REQUESTED_NEWS,
  REQUESTED_NEWS_FAILED,
  REQUESTED_NEWS_SUCCEEDED,
} from '../constants';

const defaultState = {
  newsIsFething: false,
  dataNews: [],
  error: false
};

export const newsReducer = (
  state = defaultState,
  action: {type: string; payload: []},
) => {
  switch (action.type) {
    case REQUESTED_NEWS:
      return {
        ...state,
        newsIsFething: true,
        error: false,
      };
    case REQUESTED_NEWS_SUCCEEDED:
      return {
        ...state,
        dataNews: action.payload,
        newsIsFething: false,
        error: false,
      };
    case REQUESTED_NEWS_FAILED:
      return {
        ...state,
        newsIsFething: false,
        error: true,
      };
    default:
      return state;
  }
};
