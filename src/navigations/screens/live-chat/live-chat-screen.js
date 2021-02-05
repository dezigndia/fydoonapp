import React from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {BaseBackgroundColors} from '../../../styles/constants';
import chatBack from '../../../assets/images/chat-back.png';
import ChatRoom from '../../../components/messenger/chat-room';
import LiveChatHeader from '../../../components/live-chat/live-chat-header';
import {styles} from '../../../styles/live-chat-styles';
import LiveChatRoom from '../../../components/live-chat/live-chat-room';
import LiveMembersStickyBar from '../../../components/live-chat/live-members-sticky-bar';

const LiveChatScreen = props => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={BaseBackgroundColors.secondary}
      />

      <SafeAreaView style={styles.mainContainer}>
        <ImageBackground
          source={chatBack}
          style={{width: '100%', height: '100%'}}>
          <LiveChatHeader {...props} />
          <LiveMembersStickyBar {...props} />
          <LiveChatRoom {...props} />
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default LiveChatScreen;
