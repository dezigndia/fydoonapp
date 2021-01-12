import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  Day,
  Actions,
  Composer,
} from 'react-native-gifted-chat';
import {BaseBackgroundColors} from '../../styles/constants';
import {Icon} from 'react-native-elements';
import {open} from '../../websocket-apis/socket';
import {wsUrl} from '../../websocket-apis/apis';
import {fetchMessages, newMessage} from '../../websocket-apis/methods';
import _ from 'lodash';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import {connect} from 'react-redux';

class ChatRoom2 extends Component {
  constructor(props) {
    super(props);
    this.loggedInUserData = props.userDetails;
    this.loggedInUser = this.loggedInUserData.userId;
    const {currentChatFriend: currentRoom} = props.messenger;
    this.id = currentRoom.id;
    this.anotherUser = currentRoom.participant_two;
    this.roomType = currentRoom.type;
    this.start = 0;
    this.end = 1000;
    this.ws = props.utils.ws;
    this.state = {
      isInputTyping: false,
      messages: [],
    };
  }
  componentDidUpdate() {
    this.openWs();
  }

  openWs = () => {
    this.getMessages(this.anotherUser, this.roomType, this.start, this.end);

    this.ws.onmessage = e => {
      const data = JSON.parse(e.data);
      // console.log('onmessage');
      // console.log(data);
      if (data.status === 200 && data.data) {
        let messageData = [];
        if (_.isArray(data.data)) {
          messageData = data.data.map(message => {
            //  console.log(message);
            return {
              _id: message.id ? message.id : new Date(),
              text: message.text,
              createdAt: moment(message.created),
              user: {
                _id: message.user,
                name: message.user,
              },
            };
          });
        } else {
          messageData = [
            {
              _id: data.data.id,
              text: data.data.text,
              createdAt: moment(data.data.created),
              user: {
                _id: data.data.user,
                name: data.data.user,
              },
            },
          ];
        }
        if (!_.isEqual(this.state.messages, messageData)) {
          let updateMsg = _.sortBy(
            _.uniqBy([...this.state.messages, ...messageData], '_id'),
            'createdAt',
          ).reverse();
          this.setMessages(updateMsg);
        }
      } else if (data.status === 204) {
        //Toast.showWithGravity(data.message, Toast.LONG, Toast.TOP);
      }
    };
  };
  setMessages = messages => {
    this.setState({
      messages: messages,
    });
  };

  getMessages = (anotherUser, roomType, start, end) => {
    // console.log('get Messages', this.ws.readyState, this.ws.OPEN);
    if (this.ws.send) {
      //console.log(fetchMessages(anotherUser, roomType, start, end));
      this.ws.send(fetchMessages(anotherUser, roomType, start, end));
    }
  };

  sendMessage = newMsg => {
    //  console.log('sendMessage ws', this.ws);
    if (this.ws && this.ws.readyState === this.ws.OPEN) {
      // console.log(newMessage(this.anotherUser, this.roomType, newMsg));
      this.ws.send(newMessage(this.anotherUser, this.roomType, newMsg));
    }
  };

  // helper method that is sends a message

  handleSend = (newMessage = []) => {
    if (newMessage[0].text.trim() !== '') {
      this.sendMessage(newMessage[0].text);
    }
    //this.setMessages(GiftedChat.append(this.state.messages, newMessage));
  };
  renderInputToolbar = props => {
    return (
      <View
        style={{
          marginBottom: 20,
          marginHorizontal: 10,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: 'white',
            borderRadius: 28,
            flexGrow: 1,

            paddingHorizontal: 10,
          }}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', paddingVertical: 15}}>
            <Icon
              name="smile-o"
              type="font-awesome"
              color="#707070"
              size={28}
            />
          </TouchableOpacity>

          <Composer
            {...props}
            textInputStyle={{
              color: BaseBackgroundColors.secondary,
              backgroundColor: 'white',
              flexGrow: 1,
              fontSize: 18,
              marginTop: 5,
            }}
          />

          <>
            <TouchableOpacity
              style={{alignSelf: 'flex-end', paddingVertical: 15}}>
              <Icon
                name="paperclip"
                type="font-awesome"
                color="#707070"
                size={26}
                style={{marginRight: 5}}
              />
            </TouchableOpacity>
            {!props.isInputTyping && (
              <TouchableOpacity
                style={{alignSelf: 'flex-end', paddingVertical: 15}}>
                <Icon
                  name="camera"
                  type="font-awesome"
                  color="#707070"
                  size={26}
                  style={{marginLeft: 5}}
                />
              </TouchableOpacity>
            )}
          </>
        </View>
        {props.isInputTyping && (
          <Send
            {...props}
            containerStyle={{
              borderRadius: 150,
              backgroundColor: BaseBackgroundColors.profileColor,
              justifyContent: 'center',
              alignItems: 'center',
              width: 50,
              height: 50,
              marginLeft: 10,
              alignSelf: 'flex-end',
            }}>
            <Icon
              name="telegram-plane"
              type="font-awesome-5"
              size={28}
              color="white"
            />
          </Send>
        )}
        {!props.isInputTyping && (
          <TouchableOpacity
            style={{
              borderRadius: 150,
              backgroundColor: BaseBackgroundColors.profileColor,
              justifyContent: 'center',
              alignItems: 'center',
              width: 50,
              height: 50,
              marginLeft: 10,
            }}>
            <Icon
              name="keyboard-voice"
              type="materialicons"
              size={28}
              color="white"
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  renderBubble = props => {
    return (
      <Bubble
        {...props}
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
        }}
      />
    );
  };
  renderSend = props => {
    return (
      <Send
        {...props}
        containerStyle={{
          justifyContent: 'center',
          marginBottom: 10,
        }}>
        <Icon
          name="telegram-plane"
          type="font-awesome-5"
          size={32}
          color={BaseBackgroundColors.profileColor}
          style={{paddingHorizontal: 8}}
        />
      </Send>
    );
  };

  renderComposer = props => {
    return (
      <Composer
        {...props}
        textInputStyle={{
          color: BaseBackgroundColors.secondary,
          backgroundColor: 'white',

          fontSize: 18,
        }}
      />
    );
  };

  scrollToBottomComponent = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Icon
          name="chevron-double-down"
          type="material-community"
          size={36}
          color={BaseBackgroundColors.secondary}
        />
      </View>
    );
  };

  renderActions = props => {
    return (
      <Actions
        {...props}
        containerStyle={{
          marginBottom: 20,

          width: 32,
        }}
        icon={() => (
          <Icon
            name="smile-o"
            type="font-awesome"
            size={32}
            color={'#707070'}
          />
        )}
      />
    );
  };

  renderDay = props => {
    return (
      <Day
        {...props}
        containerStyle={{
          backgroundColor: '#E0F2FA',
          maxWidth: 150,
          paddingVertical: 2,
          alignSelf: 'center',
          paddingHorizontal: 10,
        }}
        textStyle={{color: '#282828', fontSize: 16}}
      />
    );
  };
  setIsTyping = typing => {
    this.setState({
      isInputTyping: typing,
    });
  };
  render() {
    let {isInputTyping, messages} = this.state;

    return (
      <GiftedChat
        alwaysShowSend
        messages={messages}
        onSend={newMessage => {
          this.handleSend(newMessage);
        }}
        user={{_id: this.loggedInUser}}
        renderBubble={this.renderBubble}
        renderInputToolbar={props =>
          this.renderInputToolbar({...props, isInputTyping})
        }
        renderSend={this.renderSend}
        scrollToBottomComponent={this.scrollToBottomComponent}
        scrollToBottom
        renderComposer={this.renderComposer}
        minComposerHeight={40}
        bottomOffset={-20}
        minInputToolbarHeight={60}
        renderActions={this.renderActions}
        timeTextStyle={{
          right: {color: '#636363', fontSize: 14},
          left: {color: '#636363', fontSize: 14},
        }}
        renderDay={this.renderDay}
        renderAvatar={null}
        onInputTextChanged={e => {
          if (e === '') {
            this.setIsTyping(false);
          } else {
            this.setIsTyping(true);
          }
        }}
      />
    );
  }
}
const mapStateToProps = state => ({
  userDetails: state.userDetails,
  messenger: state.messenger,
  utils: state.utils,
});
export default connect(mapStateToProps)(ChatRoom2);
