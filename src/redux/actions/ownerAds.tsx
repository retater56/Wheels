import { ICar } from '../../components/CreateAd/types';
import {
  FETCHED_OWNER_CARS,
  REQUESTED_OWNER_CARS_FAILED,
  REQUESTED_OWNER_CARS_SUCCEEDED,
} from '../constants';

export const fetchOwnerCars = (userName: string) => {
  return {type: FETCHED_OWNER_CARS, payload: userName};
};
export const requestOwnerCarsSuccess = (data: ICar[]) => {
  return {type: REQUESTED_OWNER_CARS_SUCCEEDED, payload: data};
};
export const requestOwnerCarsError = () => {
  return {type: REQUESTED_OWNER_CARS_FAILED};
};
