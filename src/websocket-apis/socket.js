import {w3cwebsocket as W3CWebSocket} from 'websocket';
import {mainApi} from './constants';

const open = id => {
  const client = new W3CWebSocket(`${mainApi.baseUrl}${id}/`);
  //console.log(client, mainApi.baseUrl, id);
  return client;
};

export {open};
