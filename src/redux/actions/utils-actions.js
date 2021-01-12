import {utilsActionTypes} from './action-types';

export const setToken = token => {
  return {
    type: utilsActionTypes.SET_TOKEN,
    token: token,
  };
};
export const setPK = pk => {
  return {
    type: utilsActionTypes.SET_PK,
    pk: pk,
  };
};
export const checkIsFirstSignup = isFirstSignup => {
  return {
    type: utilsActionTypes.CHECK_IS_FIRST_SIGN_UP,
    isFirstSignup,
  };
};

export const checkIsAccountSetuped = isAccountSetuped => {
  return {
    type: utilsActionTypes.CHECK_IS_ACCOUNT_SETUPED,
    isAccountSetuped,
  };
};

export const setWebSocket = ws => {
  return {
    type: utilsActionTypes.SET_WEB_SOCKET,
    ws,
  };
};
