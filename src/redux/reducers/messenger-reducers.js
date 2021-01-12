import {messengerActionTypes} from '../actions/action-types';

let initialState = {
  currentChatFriend: null,
  chatRoomMessages: [],
};
export const MessengerReducer = (state = initialState, action) => {
  switch (action.type) {
    case messengerActionTypes.SET_CURRENT_CHAT_FRIEND:
      return {
        ...state,
        currentChatFriend: action.currentChatFriend,
      };
      break;
    case messengerActionTypes.SET_CHAT_ROOM_MESSAGES:
      return {
        ...state,
        chatRoomMessages: action.chatRoomMessages,
      };
      break;
  }
  return state;
};
