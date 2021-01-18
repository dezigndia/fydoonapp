import axios from 'axios';
import {mainApi} from './constants';

export const uploadProfile = (data, token) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `${mainApi.baseUrl}/users/profile`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
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

export const getAllSkills = token =>
  new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${mainApi.baseUrl}/skills`,
      headers: {
        Authorization: 'Bearer ' + token,
      },

      responseType: 'json',
    })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          resolve(res.data);
        } else reject(res);
      })
      .catch(error => {
        reject(error);
      });
  });

export const sendUserSkills = (data, token) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${mainApi.baseUrl}/user-profile/profile-skill/`,
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

// export const sendUserProfilePic = async (data, token) => {
//   try {
//     const response = await fetch(
//       `${mainApi.baseUrl}/user-profile/profile-pic/`,
//       {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'multipart/form-data',
//           Authorization: 'token ' + token,
//         },
//         body: data,
//       },
//     );

//     const responseJson = await response.json();
//     const finalResponse = {data: responseJson, status: response.status};
//     if (response.status === 401) {
//       console.log(response);
//     }
//     console.log('====================================');
//     console.log('finalResponse', finalResponse);
//     console.log('====================================');
//     return finalResponse;
//   } catch (error) {
//     console.error(error);
//     return error;
//   }
// };

export const getUserProfilePic = token =>
  new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${mainApi.baseUrl}users/profile/pic`,
      headers: {
        Authorization: 'Bearer ' + token,
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

export const getUserDetails = token =>
  new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${mainApi.baseUrl}/users/profile`,
      headers: {
        Authorization: 'Bearer ' + token,
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
export const sendUserProfilePic = async (data, token) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `${mainApi.baseUrl}/users/profile/pic`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: data,
      responseType: 'json',
    })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          resolve(res.data);
        } else reject(res);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
export const addExpirence = (data, token) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${mainApi.baseUrl}/user-profile/profile-experience/`,
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
export const addEducation = (data, token) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url: `${mainApi.baseUrl}/user-profile/profile-education/`,
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
export const editExpirence = (data, pk, token) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `${mainApi.baseUrl}/user-profile/profile-experience/${pk}/`,
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
export const editEducation = (data, pk, token) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'put',
      url: `${mainApi.baseUrl}/user-profile/profile-education/${pk}/`,
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
export const deleteExpirence = (pk, token) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'delete',
      url: `${mainApi.baseUrl}/user-profile/profile-experience/${pk}/`,
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
export const deleteEducation = (pk, token) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'delete',
      url: `${mainApi.baseUrl}/user-profile/profile-education/${pk}/`,
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

export const getFriendsDetails = (friendId, token) =>
  new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: `${mainApi.baseUrl}/users/info/${friendId}`,
      headers: {
        Authorization: 'Bearer ' + token,
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
