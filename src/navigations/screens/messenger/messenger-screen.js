import React from 'react';
import {View, Text, Image, StatusBar, ImageBackground} from 'react-native';
import {BaseBackgroundColors} from '../../../styles/constants';
import MessengerHeader from '../../../components/messenger/messenger-header';
import chatBack from '../../../assets/images/chat-back.jpg';
import ChatRoom from '../../../components/messenger/chat-room';
// import ChatRoom2 from '../../../components/messenger/chat-room2';
// import NewChatRoom from '../../../components/messenger/new-chatroom';
// import Messenger from '../../../components/messenger/messenger';

const MessengerScreen = props => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={BaseBackgroundColors.secondary}
      />

      <ImageBackground
        source={chatBack}
        style={{width: '100%', height: '100%'}}>
        <MessengerHeader {...props} />
        <ChatRoom {...props} />
        {/* <ChatRoom {...props} /> */}
        {/* <NewChatRoom {...props} /> */}
        {/* <Messenger {...props} /> */}
      </ImageBackground>
    </>
  );
};

export default MessengerScreen;
