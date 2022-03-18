import { RootState } from "./redux/reducers/reducer";

export const API_CARS = 'http://localhost:3000/cars';
export const API_MARKS = 'http://localhost:3000/marks';
export const API_MODELS = (mark: string) => {
    return `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/${mark}/modelyear/2021?format=json`;
}

export const getName = (state: RootState) => state.userName