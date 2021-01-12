import {messengerActionTypes} from './action-types';

export const setChatFriend = currentChatFriend => {
  return {
    type: messengerActionTypes.SET_CURRENT_CHAT_FRIEND,
    currentChatFriend: currentChatFriend,
  };
};

export const setChatRoomMessages = messages => {
  return {
    type: messengerActionTypes.SET_CHAT_ROOM_MESSAGES,
    chatRoomMessages: messages,
  };
};
