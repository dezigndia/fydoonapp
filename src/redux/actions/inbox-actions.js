import {inboxActionTypes} from './action-types';

export const setChatRooms = chatRooms => {
  return {
    type: inboxActionTypes.SET_CHAT_ROOMS,
    chatRooms,
  };
};

export const setBroadcastsRooms = rooms => {
  return {
    type: inboxActionTypes.SET_BROADCAST,
    broadcastRooms: rooms,
  };
};
