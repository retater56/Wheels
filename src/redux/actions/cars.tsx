import { ICar } from "../../components/Search/types";
import { FETCHED_CARS, REQUESTED_CARS, REQUESTED_CARS_FAILED, REQUESTED_CARS_SUCCEEDED } from "../constants";


export const requestCars = () => {
  return {type: REQUESTED_CARS};
};
export const requestCarsSuccess = (data: ICar[]) => {
  return {type: REQUESTED_CARS_SUCCEEDED, payload: data};
};
export const requestCarsError = () => {
  return {type: REQUESTED_CARS_FAILED};
};
export const fetchCars = () => {
  return {type: FETCHED_CARS};
};
