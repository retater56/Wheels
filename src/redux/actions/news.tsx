import INewsDetail from "../../components/News/types";
import { FETCHED_NEWS, REQUESTED_NEWS, REQUESTED_NEWS_FAILED, REQUESTED_NEWS_SUCCEEDED } from "../constants";


export const requestNews = () => {
  return {type: REQUESTED_NEWS};
};
export const requestNewsSuccess = (data: INewsDetail[]) => {
  return {type: REQUESTED_NEWS_SUCCEEDED, payload: data};
};
export const requestNewsError = () => {
  return {type: REQUESTED_NEWS_FAILED};
};
export const fetchNews = () => {
  return {type: FETCHED_NEWS};
};
