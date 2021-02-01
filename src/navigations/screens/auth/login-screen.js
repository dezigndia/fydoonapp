import React, {useState} from 'react';
import {
  StatusBar,
  SafeAreaView,
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {connect, useDispatch} from 'react-redux';
import CountryPicker from 'react-native-country-picker-modal';
import image from '../../../assets/images/main.jpg';
import {Button, SocialIcon, Icon} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {
  login,
  loginVerification,
  resendOtp,
} from '../../../apis/auth-operations';
import {
  setToken,
  checkIsFirstSignup,
  setPK,
} from '../../../redux/actions/utils-actions';
import AsyncStorage from '@react-native-community/async-storage';
import {BaseBackgroundColors} from '../../../styles/constants';
import {loginStyles} from '../../../styles/login-styles';
import googleIcon from '../../../assets/images/google-icon.png';
import fbIcon from '../../../assets/images/facebook-icon.png';
import {
  setUserId,
  setUserDetails,
  setUserPrimaryKey,
} from '../../../redux/actions/user-details-actions';
import {getUserDetails} from '../../../apis/account-operations';
import Toast from 'react-native-simple-toast';
import {connectSocketIo} from '../../../redux/actions/socket-actions';
import {updatePushToken} from '../../../apis/chat-operations';

const LoginScreen = props => {
  const [countryCode, setCountryCode] = useState({
    cca2: 'IN',
    callingCode: '+91',
  });
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginResponse, setLoginResponse] = useState(null);
  const [showCountries, setShowCountries] = useState(false);
  const [resendingOtp, setResendingOTP] = useState(false);

  const dispatch = useDispatch();
  function sendOtp() {
    setError('');
    if (phone === '') {
      setError('Enter phone number!');
    } else {
      setLoading(true);
      let data = {
        phone: {
          code: countryCode.callingCode,
          number: phone,
        },
      };

      // setError('Request failed!');
      login(data)
        .then(res => {
          if (res && !res.error) {
            setLoading(false);
            setOtp('');
            // console.log(res);
            // setLoginResponse(res.data);

            //dispatch(setPK(res.data.pk));
            setShowOtp(true);
          }
        })
        .catch(err => {
          setLoading(false);
          setError('Request failed!');
          console.log(JSON.stringify(err), 'login api');
        });
    }
  }
  function handleResendOTP() {
    setOtp('');
    setError('');
    let data = {
      phone: {
        code: countryCode.callingCode,
        number: phone,
      },
    };
    setResendingOTP(true);
    resendOtp(data)
      .then(res => {
        Toast.show('OTP has been sent again!', Toast.SHORT);
        setResendingOTP(false);
        //  setLoginResponse(res.data);
        //  dispatch(setPK(res.data.pk));
      })
      .catch(err => {
        Toast.show('Unable to send OTP!', Toast.SHORT);
        setResendingOTP(false);

        console.log(err.response, 'reset otp api');
      });
  }
  function verifyOtp() {
    setError('');
    if (otp.length !== 6) {
      setError('Enter 6 digit OTP!');
    } else {
      setLoading(true);
      let data = {
        phone: {
          code: countryCode.callingCode,
          number: phone,
        },
        otp,
      };

      loginVerification(data)
        .then(async res => {
          /*-----------old-code-------------------*/
          await AsyncStorage.setItem('token', res.data.token);
          await AsyncStorage.setItem('userId', res.data._id);
          await AsyncStorage.setItem('id', res.data._id);
          const pushToken = await AsyncStorage.getItem('pushToken');
          if (pushToken) {
            updatePushToken(pushToken, res.data.token);
          }
          dispatch(connectSocketIo(res.data.token));
          const {token, firstTimeLogin, _id} = res.data;

          dispatch(setToken(token));

          dispatch(setUserId(_id));
          setLoading(false);
          setPhone('');
          setShowOtp(false);
          setOtp('');

          if (!firstTimeLogin) {
            props.navigation.navigate('home');
          } else {
            dispatch(checkIsFirstSignup(true));
            props.navigation.navigate('acc-setup');
          }
        })
        .catch(err => {
          setLoading(false);
          if (err.response && err.response.status === 400) {
            console.log(err.response);
            setError('Invalid OTP!');
          } else {
            setError('Request failed!');
          }
          console.log(err, 'otp api');
        });
    }
  }
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={BaseBackgroundColors.primary}
      />
      <SafeAreaView style={loginStyles.mainContainer}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <Image source={image} style={loginStyles.logo} resizeMode="contain" />
          {!showOtp && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 20,
                }}>
                <TouchableOpacity onPress={() => setShowCountries(true)}>
                  <TextInput
                    editable={false}
                    style={loginStyles.countryCodeInput}
                    value={`${countryCode.cca2} (${countryCode.callingCode})`}
                  />
                </TouchableOpacity>
                <TextInput
                  editable={!loading}
                  style={loginStyles.numberInput}
                  keyboardType="phone-pad"
                  placeholder="Enter your Mobile Number"
                  maxLength={10}
                  value={phone}
                  onChangeText={text => {
                    setPhone(text);
                    setError('');
                  }}
                />
              </View>
              {error !== '' && (
                <Text style={loginStyles.errorText}>{error}</Text>
              )}
              <Button
                title="Login"
                icon={
                  loading && (
                    <ActivityIndicator
                      size={18}
                      color="white"
                      style={{marginHorizontal: 10}}
                    />
                  )
                }
                containerStyle={loginStyles.Submitbtn}
                buttonStyle={{
                  backgroundColor: BaseBackgroundColors.profileColor,
                }}
                onPress={() => {
                  if (!loading) {
                    sendOtp();
                  }
                }}
              />
            </>
          )}
          {showOtp && (
            <>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 18,
                  color: 'grey',
                  textAlign: 'center',
                  marginHorizontal: 20,
                  lineHeight: 24,
                }}>
                {' '}
                We have sent an OTP to this number {phone}
              </Text>
              <Text
                style={{
                  alignSelf: 'center',
                  fontSize: 16,
                  color: 'grey',
                  textAlign: 'center',
                  marginTop: 10,
                }}>
                {' '}
                Please enter the OTP
              </Text>
              <OTPInputView
                style={{
                  marginHorizontal: 20,
                  height: 30,
                  marginTop: 20,
                  marginBottom: 10,
                }}
                pinCount={6}
                code={otp}
                onCodeChanged={code => {
                  setOtp(code);
                }}
                codeInputFieldStyle={{
                  width: 40,
                  height: 45,
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  borderColor: 'grey',
                  color: 'black',
                  fontSize: 18,
                }}
                codeInputHighlightStyle={{
                  borderColor: 'black',
                }}
              />
              {error !== '' && (
                <Text
                  style={{
                    alignSelf: 'center',
                    marginTop: 20,
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'red',
                    textAlign: 'center',
                  }}>
                  {error}
                </Text>
              )}
              <Button
                title="Verify OTP"
                containerStyle={loginStyles.Submitbtn}
                icon={
                  loading && (
                    <ActivityIndicator
                      size={18}
                      color="white"
                      style={{marginHorizontal: 10}}
                    />
                  )
                }
                buttonStyle={{
                  backgroundColor: BaseBackgroundColors.profileColor,
                }}
                onPress={() => {
                  if (!loading) {
                    verifyOtp();
                  }
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  if (!resendingOtp) {
                    handleResendOTP();
                  }
                }}
                style={{
                  alignSelf: 'center',
                  marginHorizontal: 20,
                  marginTop: 20,
                  flexDirection: 'row',
                }}>
                <Text style={{fontSize: 16, marginRight: 10}}>
                  Not Recieved?
                </Text>
                <Text
                  style={{fontSize: 16, color: 'orange', fontWeight: 'bold'}}>
                  {resendingOtp ? 'Resending OTP' : 'Resend OTP'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowOtp(false);
                  setOtp('');
                  setError('');
                }}>
                <Text
                  style={{
                    color: 'lightgrey',
                    textAlign: 'center',
                    fontSize: 18,
                    marginTop: 10,
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </>
          )}
          {
            //remove false && to show social buttons}
          }
          {false && !showOtp && (
            <>
              <View
                style={{
                  height: 1,

                  marginHorizontal: 40,
                  borderWidth: 1,
                  borderColor: 'lightgrey',
                  marginTop: 30,
                }}
              />
              <Text style={{alignSelf: 'center', marginTop: 20, fontSize: 20}}>
                Login with other Accounts?
              </Text>
              <View
                style={{
                  marginHorizontal: 20,
                  marginVertical: 20,
                  flexDirection: 'row',
                }}>
                <Button
                  title="Google"
                  containerStyle={loginStyles.socialBtnContainer}
                  buttonStyle={[
                    loginStyles.socialBtn,
                    {backgroundColor: 'white', marginRight: 10},
                  ]}
                  icon={() => (
                    <Image
                      source={googleIcon}
                      style={loginStyles.socialBtnIcon}
                    />
                  )}
                  titleStyle={{color: '#282828', fontSize: 18}}
                />
                <Button
                  title="Facebook"
                  containerStyle={loginStyles.socialBtnContainer}
                  buttonStyle={[
                    loginStyles.socialBtn,
                    {backgroundColor: '#485A96', marginLeft: 10},
                  ]}
                  icon={() => (
                    <Image source={fbIcon} style={loginStyles.socialBtnIcon} />
                  )}
                  titleStyle={{color: 'white', fontSize: 18}}
                />
              </View>
            </>
          )}
        </KeyboardAwareScrollView>
      </SafeAreaView>
      <CountryPicker
        filterProps={{
          placeholder: 'Search..',
        }}
        withFilter={true}
        visible={showCountries}
        withFlagButton={false}
        countryCode={countryCode.cca2}
        withCloseButton={true}
        withModal={true}
        withCallingCode={true}
        onSelect={val => {
          if (val.callingCode.length > 0) {
            setCountryCode({
              cca2: val.cca2,
              callingCode: '+' + val.callingCode[0],
            });
          } else {
            setCountryCode({
              cca2: val.cca2,
              callingCode: '',
            });
          }
        }}
        onClose={() => setShowCountries(false)}
      />
    </>
  );
};

const mapStateToProps = state => ({
  utils: state.utils,
  userDetails: state.userDetails,
});
const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(setToken(token)),
  checkIsFirstSignup: isFirstSignup =>
    dispatch(checkIsFirstSignup(isFirstSignup)),
  setUserId: id => dispatch(setUserId(id)),
  setUserDetails: data => dispatch(setUserDetails(data)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
