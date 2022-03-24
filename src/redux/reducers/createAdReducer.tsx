import {ICar} from '../../components/CreateAd/types';
import {ADD_CAR, ADD_CAR_FAILED, ADD_CAR_SUCCESS} from '../constants';

const defaultState: {
  createAdIsLoading: boolean;
  dataCar: ICar;
  error: boolean;
} = {
  createAdIsLoading: false,
  dataCar: {
    imgSourceBase64: '',
    mark: '',
    model: '',
    fuel: '',
    doors: '',
    transmission: '',
    seats: '',
    baggageCapacity: '',
    capacity: '',
    owner: ''
  },
  error: false,
};

export const createAdReducer = (
  state = defaultState,
  action: {
    type: string;
    payload: ICar;
  },
) => {
  switch (action.type) {
    case ADD_CAR:
      return {
        ...state,
        dataCar: action.payload,
        isLoading: true,
        error: false,
      };
    case ADD_CAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_CAR_FAILED:
      return {
        ...state,
        isLoading: false,
        error: true,
      };
    default:
      return state;
  }
};
