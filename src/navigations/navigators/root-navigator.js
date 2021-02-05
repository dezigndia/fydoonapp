import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {setToken, checkIsFirstSignup} from '../../redux/actions/utils-actions';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from '../screens/splash-screen';
import AccountSetupScreen from '../screens/auth/acc-setup-screen';

import LoginScreen from '../screens/auth/login-screen';
import HomeNavigator from './home/home-navigator';
import MessengerScreen from '../screens/messenger/messenger-screen';
import PhotoGallery from '../screens/profile/PhotoGallery';
import EditProfile from '../screens/profile/EditProfile';
import SettingScreen from '../screens/settings/setting-screen';
import ContactScreen from '../screens/contacts/contacts-screen';
import MembersSelectionScreen from '../screens/groups/members-selection-screen';
import NewGroupScreen from '../screens/groups/new-group-screen';
import FriendProfileScreen from '../screens/profile/friend-profile/friend-profile-screen';
import NewBroadcastScreen from '../screens/broadcasts/new-broadcast-screen';
import BroadcastMembersSelection from '../screens/broadcasts/member-selection-screen';
import BroadcastScreen from '../screens/broadcasts/broadcast-screen';
import GroupDetailsScreen from '../screens/groups/group-details-screen';
import BroadcastDetailsScreen from '../screens/broadcasts/broadcast-details-screen';
import MyGroupScreen from '../screens/live-group/my-group-screen';
import ComingSoon from '../screens/coming-soon';
import LiveChatScreen from '../screens/live-chat/live-chat-screen';
import ContactUsScreen from '../screens/settings/contactus-screen';
import FeedbackScreen from '../screens/settings/feedback';
import FAQScreen from '../screens/settings/faq-screen';
import PrivacyPolicy from '../screens/settings/privacy-policy';
import TermsOfUse from '../screens/settings/termsOfUse';
import LiveChatOptions from '../screens/live-chat/live-chat-options';
import SeeProfile from '../screens/profile/see-profile';
import AddMemberScreen from '../screens/groups/add-memebers';
import PreviewImageScreen from '../screens/preview-image/preview-image-screen';
import {useDispatch} from 'react-redux';
import {connectSocketIo} from '../../redux/actions/socket-actions';
import {PreviewVideoScreen} from '../../components/players/videoplayer';
const Stack = createStackNavigator();

const RootNavigator = props => {
  const dispatch = useDispatch();
  const [hidesplash, showSplash] = React.useState(false);

  async function fetchToken() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        props.setToken(token);
        dispatch(connectSocketIo(token));
      } else {
        props.setToken(null);
      }

      showSplash(true);
    } catch (error) {
      console.log('fetch token', error);
    }
  }
  async function checkSignUp() {
    const isFirstSignup = await AsyncStorage.getItem('firstsignup');

    if (isFirstSignup) {
      props.checkIsFirstSignup(true);
    } else {
      props.checkIsFirstSignup(false);
    }
  }
  React.useEffect(() => {
    // AsyncStorage.removeItem('token');
    // AsyncStorage.removeItem('firstsignup');

    checkSignUp();
    setTimeout(() => {
      fetchToken();
    }, 600);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!hidesplash ? (
          <Stack.Screen
            name="splash"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <>
            {!props.utils.token ? (
              <>
                <Stack.Screen
                  name="auth-login"
                  component={LoginScreen}
                  options={{
                    headerShown: false,
                  }}
                />
              </>
            ) : (
              <>
                {props.utils.isFirstSignup && !props.utils.isAccountSetuped && (
                  <Stack.Screen
                    name="acc-setup"
                    component={AccountSetupScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                )}
                {props.utils.token && !props.utils.isFirstSignup && (
                  <Stack.Screen
                    name="home"
                    component={HomeNavigator}
                    options={{
                      headerShown: false,
                    }}
                  />
                )}
                {props.utils.token &&
                  props.utils.isFirstSignup &&
                  props.utils.isAccountSetuped && (
                    <Stack.Screen
                      name="home"
                      component={HomeNavigator}
                      options={{
                        headerShown: false,
                      }}
                    />
                  )}
                <Stack.Screen
                  name="photo-gallery"
                  component={PhotoGallery}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="edit-profile"
                  component={EditProfile}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="see-profile"
                  component={SeeProfile}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="add-members"
                  component={AddMemberScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="settings"
                  component={SettingScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="messenger"
                  component={MessengerScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="contacts"
                  component={ContactScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="select-members"
                  component={MembersSelectionScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="new-group"
                  component={NewGroupScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="broadcast-members-selection"
                  component={BroadcastMembersSelection}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="new-broadcast"
                  component={NewBroadcastScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="broadcasts"
                  component={BroadcastScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="friend-profile"
                  component={FriendProfileScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="group-details"
                  component={GroupDetailsScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="broadcast-details"
                  component={BroadcastDetailsScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="my-groups"
                  component={MyGroupScreen}
                  options={{
                    headerShown: false,
                  }}
                />

                <Stack.Screen
                  name="live-chat"
                  component={LiveChatScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="contact-us"
                  component={ContactUsScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="feedback"
                  component={FeedbackScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="faq"
                  component={FAQScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="privacy"
                  component={PrivacyPolicy}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="termsofuse"
                  component={TermsOfUse}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="live-chat-options"
                  component={LiveChatOptions}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="preview-image"
                  component={PreviewImageScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="preview-video"
                  component={PreviewVideoScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                {!props.utils.token && (
                  <Stack.Screen
                    name="auth-login"
                    component={LoginScreen}
                    options={{
                      headerShown: false,
                    }}
                  />
                )}
              </>
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  utils: state.utils,
});
const mapDispatchToProps = dispatch => ({
  setToken: token => dispatch(setToken(token)),
  checkIsFirstSignup: value => dispatch(checkIsFirstSignup(value)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RootNavigator);
