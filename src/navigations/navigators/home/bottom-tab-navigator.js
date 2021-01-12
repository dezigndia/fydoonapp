import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import SplashScreen from '../../screens/splash-screen';
import InboxScreen from '../../screens/home/inboxScreen';
import {BaseBackgroundColors} from '../../../styles/constants';
import {Icon, Badge} from 'react-native-elements';
import {Text, TouchableOpacity} from 'react-native';
import BioScreen from '../../screens/profile/profile-screen';
import ComingSoon from '../../screens/coming-soon';
import LiveGroupScreen from '../../screens/live-group/live-group-screen';
import LiveChatScreen from '../../screens/live-chat/live-chat-screen';
import LiveChatTab from '../../screens/live-chat/live-chat-tab';
import StatusScreen from '../../screens/status/status-screen';
import BroadcastScreen from '../../screens/broadcasts/broadcast-screen';
const Tab = createMaterialTopTabNavigator();
const number_of_notifications = 1;
function TabBar(props) {
  return (
    <>
      <Tab.Navigator
        swipeEnabled={false}
        initialRouteName="chat"
        tabBarPosition="bottom"
        tabBarOptions={{
          showIcon: true,
          scrollEnabled: false,
          activeTintColor: 'white',

          indicatorStyle: {
            backgroundColor: 'white',
          },
          indicatorContainerStyle: {
            backgroundColor: BaseBackgroundColors.secondary,
            flex: 1,
          },
          labelStyle: {
            fontWeight: 'normal',

            textTransform: 'none',
            fontSize: 14,
          },
          tabStyle: {
            justifyContent: 'center',
          },

          inactiveTintColor: 'white',
        }}>
        {/* <Tab.Screen
          name="notifications"
          component={ComingSoon}
          options={{
            title: '',
            tabBarIcon: () => (
              <>
                <Icon
                  name="bell-ring"
                  color="white"
                  type="material-community"
                  size={24}
                />
                {number_of_notifications > 0 && (
                  <Badge
                    status="success"
                    value={
                      number_of_notifications > 99
                        ? '99+'
                        : number_of_notifications
                    }
                    containerStyle={{position: 'absolute', right: -10, top: -4}}
                    badgeStyle={{
                      backgroundColor: '#E04C4C',
                      borderColor: '#0A3449',
                      width:
                        number_of_notifications > 99
                          ? 30
                          : number_of_notifications > 9
                          ? 25
                          : 20,
                    }}
                  />
                )}
              </>
            ),
            tabBarLabel: () => <Text style={{position: 'absolute'}} />,
            tabBarButton: () => (
              <TouchableOpacity
                style={{backgroundColor: BaseBackgroundColors.profileColor}}
                {...props}
              />
            ),
          }}
        /> */}

        <Tab.Screen
          name="chat"
          component={InboxScreen}
          options={{title: 'Chat'}}
        />
        {/* <Tab.Screen
          name="status"
          component={StatusScreen}
          options={{title: 'Status'}}
        /> */}
        <Tab.Screen
          name="broadcasts"
          component={BroadcastScreen}
          options={{title: 'Broadcast'}}
        />
        <Tab.Screen
          name="profile"
          component={BioScreen}
          options={{title: 'Profile'}}
        />
        {/* <Tab.Screen
          name="live-group"
          component={LiveGroupScreen}
          options={{title: 'Live Groups'}}
        />
        <Tab.Screen
          name="live-chat-tab"
          component={LiveChatTab}
          options={{title: 'Live Chat'}}
          listeners={({navigation}) => ({
            tabPress: event => {
              event.preventDefault();
              navigation.navigate('live-chat');
            },
          })}
        /> */}
      </Tab.Navigator>
    </>
  );
}

export default TabBar;
