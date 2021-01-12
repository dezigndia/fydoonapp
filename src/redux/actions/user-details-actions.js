import {userDetailsActionTypes} from './action-types';

export const setUserDetails = data => {
  return {
    type: userDetailsActionTypes.SET_USER_DETAILS,
    data,
  };
};

export const setUserId = id => {
  return {
    type: userDetailsActionTypes.SET_USER_ID,
    id,
  };
};

export const setUserPrimaryKey = pk => {
  return {
    type: userDetailsActionTypes.SET_USER_DB_PK,
    id: pk,
  };
};
