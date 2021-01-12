import {contactActionTypes} from '../actions/action-types';

let initialState = {
  contacts: {
    friends: [],
    notFriends: [],
  },
};
export const ContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case contactActionTypes.SET_CONTACTS:
      return {
        ...state,
        contacts: action.data,
      };
      break;
  }
  return state;
};
