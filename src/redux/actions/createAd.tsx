import { ICar } from '../../components/CreateAd/types';
import {ADD_CAR, ADD_CAR_FAILED, ADD_CAR_SUCCESS} from '../constants';

export function addCar(data: ICar) {
  return {
    type: ADD_CAR,
    payload: data,
  };
}

export function addCarFailed(message: string) {
  return {type: ADD_CAR_FAILED, payload: message};
}
