import { ADD_CAR, ADD_CAR_FAILED, ADD_CAR_SUCCESS } from "../constants";

const defaultState = {
    imgSourceBase64: '',
    mark: '',
    model: '',
    fuel: '',
    doors: '',
    transmission: '',
    seats: '',
    baggageCapacity: '',
    capacity: '',
};

export interface ICar {
    imgSourceBase64: string,
    mark: string,
    model: string,
    fuel: string,
    doors: string,
    transmission: string,
    seats: string,
    baggageCapacity: string,
    capacity: string,
  }

export const userReducer = (
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
          isLoading: true,
        };
      case ADD_CAR_SUCCESS:
        return {
          ...state,
          userName: action.payload,
          isLoggedIn: true,
          error: false,
        };
      case ADD_CAR_FAILED:
        return {
          ...state,
          error: true,
        };
    default:
        return state;
  }
};
