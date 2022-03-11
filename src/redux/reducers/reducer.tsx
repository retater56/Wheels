import {ADD_USER, LOGIN_USER, LOGOUT_USER} from '../constants';

const initialState = {
  isLoggedIn: false,
};

const reducer = (state = initialState, action: {type: string}) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: true,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
export default reducer;
export type RootState = ReturnType<typeof reducer>;
