import {inboxActionTypes} from '../actions/action-types';

let initialState = {
  chatRooms: [],
  broadcastRooms: [],
};
export const InboxReducer = (state = initialState, action) => {
  switch (action.type) {
    case inboxActionTypes.SET_CHAT_ROOMS:
      return {
        ...state,
        chatRooms: action.chatRooms,
      };
      break;
    case inboxActionTypes.SET_BROADCAST:
      return {
        ...state,
        broadcastRooms: action.broadcastRooms,
      };
      break;
  }
  return state;
};
