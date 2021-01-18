import {io} from 'socket.io-client';
import SocketIO from 'socket.io-client';
import SocketIOFileClient from 'socket.io-file-client';

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
      pingTimeout: 30000,
      query: {auth_token: token},
    });
    // console.log(token);
    var fileSocket = SocketIO(HOST.url);
    uploader = new SocketIOFileClient(fileSocket);
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
    console.log(input);
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

export const sendFile = (file, roomId, msg = '', callBack) => {
  if (uploader) {
    var uploadIds = uploader.upload(file, {
      data: {
        roomId,
        msg,
      },
    });

    uploader.on('start', function(fileInfo) {
      console.log('Start uploading', fileInfo);
    });
    uploader.on('stream', function(fileInfo) {
      console.log('Streaming... sent ' + fileInfo.sent + ' bytes.');
    });
    uploader.on('complete', function(fileInfo) {
      console.log('Upload Complete', fileInfo);
    });
    uploader.on('error', function(err) {
      console.log('Error!', err);
    });
    uploader.on('abort', function(fileInfo) {
      console.log('Aborted: ', fileInfo);
    });
  }
};
function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  );
}
