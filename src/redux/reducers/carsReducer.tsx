import {
  REQUESTED_CARS,
  REQUESTED_CARS_FAILED,
  REQUESTED_CARS_SUCCEEDED,
} from '../constants';

const defaultState = {
  carsIsFething: false,
  dataCars: [],
  error: false,
};

export const carsReducer = (
  state = defaultState,
  action: {type: string; payload: []},
) => {
  switch (action.type) {
    case REQUESTED_CARS:
      return {
        ...state,
        dataCars: action.payload,
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
