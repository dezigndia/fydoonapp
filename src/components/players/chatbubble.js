import React from 'react';
import {View} from 'react-native';
import {MessageText, Time} from 'react-native-gifted-chat';

const ChatBubble = props => {
  const {position, children, currentMessage, uri} = props;
  return (
    <View style={styles[position].container}>
      <View style={styles[position].wrapper}>
        <MessageText {...props} />
        {children}
        <Time {...props} />
      </View>
    </View>
  );
};

const styles = {
  left: {
    container: {
      flex: 1,
      alignItems: 'flex-start',
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: '#DCF8C6',
      marginRight: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
  },
  right: {
    container: {
      flex: 1,
      alignItems: 'flex-end',
    },
    wrapper: {
      borderRadius: 15,
      backgroundColor: '#DCF8C6',
      marginLeft: 60,
      minHeight: 20,
      justifyContent: 'flex-end',
    },
  },
};

export default ChatBubble;
