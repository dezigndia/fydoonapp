import axios from 'axios';
import {mainApi} from './constants';

export const login = data =>
  new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${mainApi.baseUrl}/auth/login/`,
      data: data,
      responseType: 'json',
    })
      .then(res => {
        if (res.status === 200) {
          resolve(res.data);
        } else reject(res);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });

export const resendOtp = data =>
  new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${mainApi.baseUrl}/auth/resend-otp`,
      data: data,
      responseType: 'json',
    })
      .then(res => {
        if (res.status === 200) {
          resolve(res.data);
        } else reject(res);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });

export const loginVerification = data =>
  new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${mainApi.baseUrl}/auth/login/verify/`,
      data: data,
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

export const sendContactList = (token, data) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${mainApi.baseUrl}/user/fetch-contacts/`,
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

export const getFriendsList = token =>
  new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${mainApi.baseUrl}/friend-request/list-of-friends/`,
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
