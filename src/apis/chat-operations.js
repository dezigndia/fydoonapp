import axios from 'axios';
import {mainApi} from './constants';

export const getChatRooms = token =>
  new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${mainApi.baseUrl}/chat/list-of-chat/`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'token ' + token,
      },
      responseType: 'json',
    })
      .then(res => {
        if (res.status === 200) {
          resolve(res.data);
        } else reject(res);
      })
      .catch(error => {
        reject(error);
      });
  });

export const initiateChat = (token, friend_id) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${mainApi.baseUrl}/chat/start-chat/${friend_id}/`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'token ' + token,
      },
      responseType: 'json',
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
export const initiateGroupChat = (token, data) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${mainApi.baseUrl}/chat/group-chat/`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'token ' + token,
      },
      data: data,
      responseType: 'json',
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
export const deleteChat = (token, chatroom_id) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'delete',
      url: `${mainApi.baseUrl}/chat/chat-room-edit/${chatroom_id}/`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'token ' + token,
      },
      responseType: 'json',
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
export const deleteGroupChat = (token, grouproom_id) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'delete',
      url: `${mainApi.baseUrl}/chat/group-chat/${grouproom_id}/`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'token ' + token,
      },
      responseType: 'json',
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });

export const initiateBroadcast = (token, data) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${mainApi.baseUrl}/chat/broadcast-chat/`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'token ' + token,
      },
      data: data,
      responseType: 'json',
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });

export const deleteBroadCast = (token, broadcast_id) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'delete',
      url: `${mainApi.baseUrl}/chat/broadcast-chat/${broadcast_id}/`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'token ' + token,
      },
      responseType: 'json',
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });

export const reportUser = (token, data, repotedUserid) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${mainApi.baseUrl}/user/report/${repotedUserid}/`,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'token ' + token,
      },
      data: data,
      responseType: 'json',
    })
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
