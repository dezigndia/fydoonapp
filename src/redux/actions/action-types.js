const defaultTypes = {
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE'
}
export const utilsActionTypes = {
  SET_TOKEN: 'SET_TOKEN',
  CHECK_IS_FIRST_SIGN_UP: 'CHECK_IS_FIRST_SIGN_UP',
  CHECK_IS_ACCOUNT_SETUPED: 'CHECK_IS_ACCOUNT_SETUPED',
  SET_PK: 'SET_PK',
  SET_WEB_SOCKET: 'SET_WEB_SOCKET',
};
export const messengerActionTypes = {
  SET_CURRENT_CHAT_FRIEND: 'SET_CURRENT_CHAT_FRIEND',
  SET_CHAT_ROOM_MESSAGES: 'SET_CHAT_ROOM_MESSAGES',
};
export const inboxActionTypes = {
  SET_CHAT_ROOMS: 'SET_CHAT_ROOMS',
  SET_BROADCAST: 'SET_BROADCAST',
};
export const userDetailsActionTypes = {
  SET_USER_DETAILS: 'SET_USER_DETAILS',
  SET_USER_ID: 'SET_USER_ID',
  SET_USER_DB_PK: 'SET_USER_DB_PK',
};

export const contactActionTypes = {
  SET_CONTACTS: 'SET_CONTACTS',
};

export const detectChangesTypes = {
  UPDATE_CHAT_LIST: 'UPDATE_CHAT_LIST',
};

export const SOCKET_IO = {
  ...defaultTypes,
  DISCONNECT: 'DISCONNECT'
}

export const MESSAGE = {
  SEND: 'SEND'
}

export const SUBSCRIPTIONS = {
  SUBSCRIPTIONS: 'SUBSCRIPTIONS'
}