import {contactActionTypes} from './action-types';

export const setContacts = data => {
  return {
    type: contactActionTypes.SET_CONTACTS,
    data,
  };
};
