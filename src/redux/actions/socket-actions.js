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
          if (!data.error && data) {
            // console.log('subscriptions-socket', data.data);
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
      if (!data.error && data.data) {
        // console.log('subscriptions-socket', data.data[0].message);
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

export const createDirectRoom = userId => {
  if (socket) {
    const input = {
      userId,
    };

    socket.emit(ChatEvent.CREATE_DIRECT_ROOM, input);
    socket.on(ChatEvent.CREATE_DIRECT_ROOM, data => {
      if (!data.error && data.data) {
        //console.log('joinroom-socket', data.data);
        joinRoom(data.data._id);
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

function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  );
}
