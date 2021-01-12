import {utilsActionTypes} from '../actions/action-types';

let initialState = {
  pk: null,
  token: null,
  isFirstSignup: false,
  isAccountSetuped: false, //first signup but not setuped
  ws: null,
};
export const UtilsReducer = (state = initialState, action) => {
  switch (action.type) {
    case utilsActionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case utilsActionTypes.CHECK_IS_FIRST_SIGN_UP:
      return {
        ...state,
        isFirstSignup: action.isFirstSignup,
      };
      break;

    case utilsActionTypes.CHECK_IS_ACCOUNT_SETUPED:
      return {
        ...state,
        isAccountSetuped: action.isAccountSetuped,
      };
      break;
    case utilsActionTypes.SET_PK:
      return {
        ...state,
        pk: action.pk,
      };
      break;
    case utilsActionTypes.SET_WEB_SOCKET:
      return {
        ...state,
        ws: action.ws,
      };
      break;
  }
  return state;
};
