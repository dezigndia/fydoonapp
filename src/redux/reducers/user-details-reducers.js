import {userDetailsActionTypes} from '../actions/action-types';

let initialState = {
  userData: null,
  userId: null, //username
  id: null, //id from otp verification api-->DB primary key
};
export const UserDetailsReducers = (state = initialState, action) => {
  switch (action.type) {
    case userDetailsActionTypes.SET_USER_ID:
      return {
        ...state,
        userId: action.id,
      };
      break;
    case userDetailsActionTypes.SET_USER_DETAILS:
      return {
        ...state,
        userData: action.data,
      };
      break;
    case userDetailsActionTypes.SET_USER_DB_PK:
      return {
        ...state,
        id: action.id,
      };
      break;
  }
  return state;
};
