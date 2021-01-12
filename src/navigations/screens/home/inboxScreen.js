import React, {useEffect, useState} from 'react';
import {View, Text, Image, StatusBar, SafeAreaView} from 'react-native';
import {BaseBackgroundColors} from '../../../styles/constants';
import InboxHeader from '../../../components/home/inbox-header';
import Inbox from '../../../components/home/inbox/inbox';
import FAB from '../../../components/fab/fab';
import {getContacts} from '../../../utils/contacts-update';
import {useDispatch, useSelector} from 'react-redux';
import {open} from '../../../websocket-apis/socket';
import {wsUrl} from '../../../websocket-apis/apis';
import {setWebSocket} from '../../../redux/actions/utils-actions';
import _ from 'lodash';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import {setChatRooms} from '../../../redux/actions/inbox-actions';
import {fetchMessages, newMessage} from '../../../websocket-apis/methods';
import {
  connectSocketIo,
  getSubscriptions,
  sendContacts,
} from '../../../redux/actions/socket-actions';

const InboxScreen = props => {
  const dispatch = useDispatch();

  const utils = useSelector(state => state.utils);

  useEffect(() => {
    connectSocketIo(utils.token);
    getSubscriptions(dispatch);
    sendContacts(utils.token, dispatch);
  }, 0);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={BaseBackgroundColors.primary}
      />
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          {/* <InboxHeader /> */}
          <Inbox {...props} />
        </View>
        <FAB
          {...props}
          onPress={() => props.navigation.navigate('contacts')}
          iconType={'material-community'}
          iconName="android-messages"
        />
      </SafeAreaView>
    </>
  );
};

export default InboxScreen;
