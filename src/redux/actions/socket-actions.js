import {io} from 'socket.io-client';

import {HOST} from '../../apis/constants';
import {SOCKET_IO} from './action-types';
import AsyncStorage from '@react-native-community/async-storage';
import {SUBSCRIPTIONS} from './action-types';
import {ChatEvent} from '../../socket.io/constant';
import {setChatRoomMessages} from './messenger-actions';
import {setContacts} from './contact-action';
import {getContacts} from '../../utils/contacts-update';

const {CONNECT, DISCONNECT} = ChatEvent;

let socket;
var uploader;
export const connectRequest = requested => {
  return {
    type: SOCKET_IO.REQUEST,
    requested,
  };
};

export const connectSuccess = connected => {
  return {
    type: SOCKET_IO.SUCCESS,
    connected,
  };
};

export const disconnect = connected => {
  return {
    type: SOCKET_IO.DISCONNECT,
    connected,
  };
};

export const subscriptions = subscriptions => {
  return {
    type: SUBSCRIPTIONS.SUBSCRIPTIONS,
    subscriptions,
  };
};

export const connectSocketIo = token => {
  return dispatch => {
    dispatch(connectRequest(true));

    socket = io(HOST.url, {
      origins: '*',
      transports: ['websocket'],
      allowUpgrades: false,
      pingTimeout: 60000,
      pingInterval: 25000,
      query: {auth_token: token},
    });
    console.log(token);
    socket.on(CONNECT, () => {
      console.log('Socket Connected');
      dispatch(connectSuccess(true));
      getSubscriptions(dispatch);
      sendContacts(token, dispatch);
    });
    socket.on(DISCONNECT, error => {
      console.log('Socket Disconnected', error);
      dispatch(disconnect(false));
    });
  };
};

export const sendContacts = (token, dispatch) => {
  try {
    getContacts(dispatch, token, contacts => {
      if (socket) {
        const input = {
          contacts,
        };

        socket.emit(ChatEvent.CONTACTS, input);
        socket.on(ChatEvent.CONTACTS, data => {
          //  console.log('subscriptions-socket', data);
          if (!data.error && data) {
            dispatch(
              setContacts({
                friends: data.contactList,
                notFriends: data.inviteList,
              }),
            );
          }
        });
      } else {
        connectSocketIo();
      }
    });
  } catch (er) {
    console.log(er);
  }
};

export const getSubscriptions = dispatch => {
  if (socket) {
    socket.emit(ChatEvent.SUBSCRIPTIONS);
    socket.on(ChatEvent.SUBSCRIPTIONS, data => {
      // console.log('subscriptions-socket', data);
      if (!data.error && data.data) {
        if (isFunction(dispatch)) {
          dispatch(subscriptions(data.data));
        }
      }
    });
  } else {
    connectSocketIo();
  }
};
export const joinRoom = roomId => {
  if (socket) {
    const input = {
      roomId,
    };

    socket.emit(ChatEvent.JOIN_ROOM, input);
  }
};

export const createDirectRoom = (userId, callBack) => {
  if (socket) {
    const input = {
      userId,
    };

    socket.emit(ChatEvent.CREATE_DIRECT_ROOM, input);
    socket.on(ChatEvent.CREATE_DIRECT_ROOM, data => {
      if (!data.error && data.data) {
        //console.log('joinroom-socket', data.data);
        joinRoom(data.data._id);
        if (callBack) {
          callBack();
        }
      }
    });
  }
};
export const sendSocketMessage = (roomId, msg) => {
  if (socket) {
    const input = {
      roomId,
      msg,
    };
    //console.log(input);

    socket.emit(ChatEvent.SEND_MESSAGE, input);
  } else {
    connectSocketIo();
  }
};

export const getChatsLists = dispatch => {
  if (socket) {
    socket.on(ChatEvent.CHAT_HISTORY, data => {
      if (!data.error && data.data) {
        //console.log('joinroom-socket', data.data.length);
        dispatch(setChatRoomMessages(data.data));
      }
    });
  } else {
    connectSocketIo();
  }
};

export const getRecentMessage = callBack => {
  if (socket) {
    socket.on(ChatEvent.MESSAGE, data => {
      if (!data.error && data.data) {
        //console.log('new-message-socket', data.data);

        callBack(data.data);
      }
    });
  } else {
    connectSocketIo();
  }
};
export const deleteMessageForMe = (roomId, messageIdToDelete, callBack) => {
  if (socket) {
    const input = {
      roomId,
      msgId: messageIdToDelete,
    };
    // console.log(input);
    socket.emit(ChatEvent.DELETE_MESSAGE_FOR_ME, input);
    socket.on(ChatEvent.DELETE_MESSAGE_FOR_ME, data => {
      if (!data.error && data.data) {
        //   console.log('delete-message-socket', data.data);

        callBack(data.data);
      }
    });
  } else {
    connectSocketIo();
  }
};
export const deleteMessageForEveryone = (
  roomId,
  messageIdToDelete,
  callBack,
) => {
  if (socket) {
    const input = {
      roomId,
      msgId: messageIdToDelete,
    };
    //  console.log(input);
    socket.emit(ChatEvent.DELETE_MESSAGE_FOR_EVERYONE, input);
    socket.on(ChatEvent.DELETE_MESSAGE_FOR_EVERYONE, data => {
      if (!data.error && data.data) {
        // console.log('delete-message-socket', data.data);

        callBack(data.data);
      }
    });
  } else {
    connectSocketIo();
  }
};
export const readMessages = (roomId, messageIds) => {
  if (socket) {
    const input = {
      roomId,
      msgIds: messageIds,
    };
    //console.log(input);
    socket.emit(ChatEvent.READ_MESSAGE, input);
  } else {
    connectSocketIo();
  }
};
export const clearChatHistory = (roomId, callBack) => {
  if (socket) {
    const input = {
      roomId,
    };
    //console.log(input);
    socket.emit(ChatEvent.CLEAR_CHAT_HISTORY, input);
    socket.on(ChatEvent.CLEAR_CHAT_HISTORY, data => {
      if (!data.error && data.data) {
        callBack(data);
      }
    });
  } else {
    connectSocketIo();
  }
};

export const createPrivateGroup = (userIds, name, callBack) => {
  if (socket) {
    const input = {
      userIds,
      name,
    };
    console.log(input);
    socket.emit(ChatEvent.CREATE_PRIVATE_GROUP, input);
    socket.on(ChatEvent.CREATE_PRIVATE_GROUP, data => {
      if (!data.error && data.data) {
        callBack(true, data.data);
      }
    });
  } else {
    callBack(false, null);
    connectSocketIo();
  }
};
export const exitGroup = (roomId, callBack) => {
  if (socket) {
    const input = {
      roomId,
    };
    //console.log(input);
    socket.emit(ChatEvent.EXIT_GROUP, input);
    socket.on(ChatEvent.EXIT_GROUP, data => {
      if (!data.error && data.data) {
        callBack(true, data.data);
      }
    });
  } else {
    callBack(false, null);
    connectSocketIo();
  }
};

export const sendAttachmentMessage = (roomId, attachmentId, msg = '') => {
  if (socket) {
    const input = {
      roomId,
      msg,
      attachmentId,
    };
    console.log(input);
    socket.emit(ChatEvent.SEND_ATTACHMENT_MESSAGE, input);
  } else {
    connectSocketIo();
  }
};
function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  );
}
