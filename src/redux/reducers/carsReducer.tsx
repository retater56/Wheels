import { ICar } from '../../components/Search/types';
import {
  FETCHED_CARS,
  REQUESTED_CARS_FAILED,
  REQUESTED_CARS_SUCCEEDED,
} from '../constants';

const defaultState: {
  carsIsFething: boolean,
  dataCars: ICar[],
  error: boolean,
} = {
  carsIsFething: false,
  dataCars: [],
  error: false,
};

export const carsReducer = (
  state = defaultState,
  action: {type: string; payload: []},
) => {
  switch (action.type) {
    case FETCHED_CARS:
      return {
        ...state,
        carsIsFething: true,
        error: false,
      };
    case REQUESTED_CARS_SUCCEEDED:
      return {
        ...state,
        dataCars: action.payload,
        carsIsFething: false,
        error: false,
      };
    case REQUESTED_CARS_FAILED:
      return {
        ...state,
        dataCars: action.payload,
        carsIsFething: false,
        error: true,
      };
    default:
      return state;
  }
};
