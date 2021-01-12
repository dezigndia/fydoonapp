import Contacts from 'react-native-contacts';
import {PermissionsAndroid} from 'react-native';
import {sendContactList, getFriendsList} from '../apis/auth-operations';
import {setContacts} from '../redux/actions/contact-action';

function filterContacts(list, dispatch, token, callback) {
  if (list.length > 0) {
    let contacts = [];
    list.map((item, index) => {
      if (item.phoneNumbers.length > 0) {
        item.phoneNumbers.map((each, i) => {
          // let contact = {
          //   name: item.displayName,
          //   'phone-number': each.number,
          // };

          contacts.push(each.number);
        });
      }
    });
    if (callback) {
      callback(contacts);
    }
    //console.log(JSON.stringify(contacts));
    // const data = new FormData();
    // data.append('fetch_contact', JSON.stringify(contacts));
    // sendContactList(token, data)
    //   .then(response => {
    //     // console.log(response.data);
    //     dispatch(
    //       setContacts({
    //         friends: response.data['friends'],
    //         notFriends: response.data['not-friends'],
    //       }),
    //     );
    //   })
    //   .catch(err => {
    //     console.log(err.response, 'upload contacts api error');
    //   });
  }
  return [];
}
export async function getContacts(dispatch, token, callback) {
  if (Platform.OS === 'android') {
    try {
      const androidContactPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app would like to view your contacts.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (androidContactPermission === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Contacts Permission granted');
        Contacts.getAll((err, contacts) => {
          // console.log(contacts);
          filterContacts(contacts, dispatch, token, callback);
        });
      } else {
        console.log('Contacts permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    //Update info.plist add permissions and check below function
    Contacts.getAll((err, contacts) => {
      console.log(contacts);
      filterContacts(contacts, dispatch, token, callback);
    });
  }
}

export async function openContact(dispatch, token, callback, user) {
  if (Platform.OS === 'android') {
    try {
      const androidContactPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app would like to view your contacts.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (androidContactPermission === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Contacts Permission granted');
        var newPerson = {
          displayName: user ? user.name : '',
          phoneNumbers: [],
        };
        if (user && user.number) {
          newPerson.phoneNumbers.push({label: 'mobile', number: user.number});
        }

        Contacts.openContactForm(newPerson, (err, contact) => {
          if (err) throw err;
          console.log(contact);
          getContacts(dispatch, token, callback);
        });
      } else {
        console.log('Contacts permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('I am ios');
    //Update info.plist add permissions and check below function
    var newPerson = {
      displayName: user ? user : '',
    };
    Contacts.openContactForm(newPerson, (err, contact) => {
      if (err) throw err;
      console.log(contact);
    });
  }
}
export async function editContact(dispatch, token, callback, user) {
  if (Platform.OS === 'android') {
    try {
      const androidContactPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app would like to view your contacts.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (androidContactPermission === PermissionsAndroid.RESULTS.GRANTED) {
        Contacts.getAll((err, contacts) => {
          if (err) {
            throw err;
          }

          // update the first record
          let record = contacts.find(item =>
            item.phoneNumbers.find(
              each => each.number.toString() === user.number,
            ),
          );

          if (record) {
            Contacts.openExistingContact(record, (err, contact) => {
              if (err) throw err;
              console.log(contact);
              getContacts(dispatch, token, callback);
            });
          } else {
            openContact(dispatch, token, callback, user);
          }
        });
      } else {
        console.log('Contacts permission denied');
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    console.log('I am ios');
    //Update info.plist add permissions and check below function
  }
}
