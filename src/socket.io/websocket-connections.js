import {io} from 'socket.io-client';
import {socketUrl, ChatEvent} from './constant';

export const _initSocket = token => {
  var socketConfig = {path: socketUrl, query: {auth_token: token}};

  var socket = io(socketConfig);

  return socket;
};

export const connectSocket = (socket, callBack) => {
  socket.on(ChatEvent.CONNECT, () => {
    console.log('web socket connected');
    if (callBack) {
      callBack();
    }
  });
};

export const disconnectSocket = (socket, callBack) => {
  socket.disconnect();
  socket.on('disconnect', reason => {
    console.log('web socket disconnected');
    if (callBack) {
      callBack(reason);
    }
  });
};
