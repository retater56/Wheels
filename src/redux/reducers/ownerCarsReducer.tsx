import {ICar} from '../../components/CreateAd/types';
import {
  FETCHED_OWNER_CARS,
  REQUESTED_OWNER_CARS_FAILED,
  REQUESTED_OWNER_CARS_SUCCEEDED,
} from '../constants';

const defaultState: {
  owner: string;
  carsIsFething: boolean;
  dataCars: ICar[];
  error: boolean;
} = {
  owner: '',
  carsIsFething: false,
  dataCars: [],
  error: false,
};

export const ownerCarsReducer = (
  state = defaultState,
  action: {type: string; payload: any},
) => {
  switch (action.type) {
    case FETCHED_OWNER_CARS:
      return {
        ...state,
        owner: action.payload,
        carsIsFething: true,
        error: false,
      };
    case REQUESTED_OWNER_CARS_FAILED:
      return {
        ...state,
        dataCars: action.payload,
        carsIsFething: false,
        error: false,
      };
    case REQUESTED_OWNER_CARS_SUCCEEDED:
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
