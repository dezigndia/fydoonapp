import { Platform, PermissionsAndroid } from 'react-native';

export function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
export async function checkPermission() {
  if (Platform.OS !== 'android') {
    return Promise.resolve(true);
  }
  const rationale = {
    title: 'Microphone Permission',
    message:
      'AudioExample needs access to your microphone so you can record audio.',
  };
  return PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    rationale,
  ).then(result => {
    console.log('Permission result:', result);
    return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
  });
}


export const getDisplayName = (user) => {
  const { firstName = '', lastName = '', phone = {} } = user;
  const displayName = firstName ? `${firstName} ${lastName}` : `${phone.code}${phone.number}`;
  return displayName;
}