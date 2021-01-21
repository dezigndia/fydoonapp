import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {MessageText, Bubble, Time} from 'react-native-gifted-chat';

// const ChatBubble = props => {
//   const {position, children, currentMessage, uri} = props;
//   console.log(props);
//   return (
//     <TouchableOpacity
//       style={styles[position].container}
//       activeOpacity={0.9}
//       {...props}>
//       <View style={styles[position].wrapper}>
//         {children}
//         <MessageText
//           {...props}
//           currentMessage={{text: currentMessage.file || currentMessage.text}}
//         />
//         <Time {...props} />
//       </View>
//     </TouchableOpacity>
//   );
// };

const ChatBubble = props => {
  const {position, children, currentMessage, uri} = props;

  return (
    <Bubble
      {...props}
      currentMessage={{text: currentMessage.file || currentMessage.text}}
      wrapperStyle={{
        right: {
          // Here is the color change
          backgroundColor: '#DCF8C6',

          borderTopLeftRadius: 12,
          borderBottomLeftRadius: 12,

          flexDirection: 'row',
        },
        left: {
          backgroundColor: 'white',

          borderTopRightRadius: 12,
          borderBottomRightRadius: 12,
        },
      }}
      textStyle={{
        right: {
          color: '#636363',
        },
        left: {
          color: '#636363',
        },
      }}>
      {children}
    </Bubble>
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
