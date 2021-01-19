import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Clipboard,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from 'react-native';
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
  Day,
  Actions,
  RenderMessageAudioProps,
  Composer,
} from 'react-native-gifted-chat';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import { Platform } from 'react-native';

import * as mime from 'react-native-mime-types';
import Sound from 'react-native-sound';
import { BaseBackgroundColors } from '../../styles/constants';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { open } from '../../websocket-apis/socket';
import { wsUrl } from '../../websocket-apis/apis';
import { fetchMessages, newMessage } from '../../websocket-apis/methods';
import _, { sum } from 'lodash';
import Toast from 'react-native-simple-toast';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import { checkPermission } from '../../utils/utils';
import EmojiSelector, { Categories } from 'react-native-emoji-selector';
import { styles } from '../../styles/messenger-styles';
import VideoPlayer from '../players/videoplayer';
import ChatBubble from '../players/chatbubble';
import AudioPlayer from '../players/audioplayer';
import {
  getChatsLists,
  getRecentMessage,
  sendSocketMessage,
  readMessages,
  deleteMessageForEveryone,
  deleteMessageForMe,
  sendFile,
} from '../../redux/actions/socket-actions';
import { setChatRoomMessages } from '../../redux/actions/messenger-actions';
import { HOST } from '../../apis/constants';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
var currRecordingFileTime;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = Blob;

export default (ChatRoom = () => {
  const loggedInUserData = useSelector(state => state.userDetails);
  const utils = useSelector(state => state.utils);
  const dispatch = useDispatch();
  const ws = utils.ws;
  const token = utils.token
  const inputRef = useRef();

  const loggedInUser = loggedInUserData.userData
    ? loggedInUserData.userData._id
    : '';
  const [isInputTyping, setIsTyping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('');
  const [recordingTime, updateRecordingTime] = useState('');
  const [hasAudioPermission, setAudioPermission] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const [recordedfile, setRecordedFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [typingMessage, setTypingMessage] = useState('');

  const [messagesStatus, setMessagesStatus] = useState('');
  const [viedoModal, setVideoModal] = useState('');
  const [showEmoji, setShowEmojiBoard] = useState(false);
  const [inputCursorPosition, setInputCursorPosition] = useState(0);
  const [isEmojiadded, setIsEmojiAdded] = useState(false);

  const [isChanged, setIsChanged] = useState(false);
  const { currentChatFriend: currentRoom } = useSelector(
    state => state.messenger,
  );
  const { subscriptions } = useSelector(state => state.socket);
  const { chatRoomMessages } = useSelector(state => state.messenger);

  const id = currentRoom.id;
  const anotherUser = currentRoom.participant_two;
  const roomType = currentRoom.type;

  let start = 0;
  let end = 1000;

  useEffect(() => {
    formatMessages();
    getChatsLists(dispatch);
    getRecentMessage(newMsg => {
      const msgObj = [
        {
          _id: newMsg._id,
          createdAt: moment(newMsg.createdAt),
          isDeleted: newMsg.isDeleted,
          deletedBy: newMsg.deletedBy,
          unread: false,
          user: {
            _id: newMsg.user._id,
            name: newMsg.user.firstName + newMsg.user.lastName,
          },
          text: newMsg.msg,
        },
      ];
      readMessages(id, [newMsg._id]);

      setMessages(previousArr => GiftedChat.append(previousArr, msgObj));
    });
    return () => {
      dispatch(setChatRoomMessages([]));
    };
  }, []);
  useEffect(() => {
    formatMessages();
  }, [chatRoomMessages]);
  useEffect(() => {
    if (typingMessage.length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [typingMessage]);
  useEffect(() => {
    var time = '';
    checkPermission().then(async hasPermission => {
      setAudioPermission(hasPermission);
      if (!hasPermission) return;

      AudioRecorder.onProgress = data => {
        // console.log(data, 'onProgress data');
        time = getTime(data.currentTime);
        updateRecordingTime(time);
        if (time == '10:00') {
          handleStopRecording();
          return;
        }
      };
      // AudioRecorder.onFinished = data => {
      //   setRecordedFile(data);

      //   updateRecordingTime('');
      //   setRecordingStatus('');
      // };
    });

    return () => {
      if (time !== '') {
        handleStopRecording();
      }
    };
  }, []);
  useEffect(() => {
    if (recordedfile != null && recordingStatus !== 'cancel') {
      if (ws && ws.readyState === ws.OPEN) {
        // console.log(recordingStatus);
        const file = 'data:' + 'audio/aac' + ';base64,' + recordedfile.base64;

        ws.send(newMessage(anotherUser, roomType, '', file));
      } else {
        Toast.show('Unable to upload!', Toast.SHORT);
      }
    }
  }, [recordedfile]);

  useEffect(() => {
    handleReadMeassages();
  }, [messages]);

  const formatMessages = () => {
    //console.log(chatRoomMessages[0]);
    var messageData = [];
    chatRoomMessages.forEach(message => {
      if (!message.deletedBy.includes(loggedInUser)) {
        messageData.push({
          _id: message._id,
          createdAt: moment(message.createdAt),
          isDeleted: message.isDeleted,
          unread: message.unread,
          user: {
            _id: message.user._id,
            name: message.user.firstName + message.user.lastName,
          },
          text: message.msg,
          isDeleted: message.isDeleted,
        });
      }
    });

    let updateMsg = _.sortBy(
      _.uniqBy(messageData, '_id'),
      'createdAt',
    ).reverse();
    setIsChanged(!isChanged);
    setMessages(updateMsg);
    setMessagesStatus('recieved');
  };
  function handleReadMeassages() {
    let messageIds = [];
    messages.forEach(message => {
      if (message.unread == true) {
        messageIds.push(message._id);
      }
    });

    readMessages(id, messageIds);
  }

  const sendMessage = newMsg => {
    sendSocketMessage(id, newMsg);
  };

  const handleSend = (newMessage = '') => {
    if (newMessage.trim() !== '') {
      // console.log(newMessage);
      sendMessage(newMessage);
    }
  };
  const pickImageHandler = () => {
    // Toast.show('Comming Soon', Toast.SHORT);
    // return;
    ImagePicker.showImagePicker(
      { title: 'Pick an Image', maxWidth: 800, maxHeight: 600 },
      res => {
        if (res.didCancel) {
          console.log('User cancelled!');
        } else if (res.error) {
          console.log('Error', res.error);
        } else {
          let uploadData = new FormData();
          uploadData.append('submit', 'ok');
          uploadData.append('file', {
            type: res.type,
            uri: res.uri,
            name: res.fileName,
          });
          sendFile(uploadData, id, '', newMsg => { });
        }
      },
    );
  };
  const openFilePicker = async () => {
    // Toast.show('Comming Soon', Toast.SHORT);
    // return;
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      const file = {
        uri: res.uri,
        name: res.name,
        type: res.type
      }
      const body = new FormData()
      body.append('file', file)
      fetch(`http://192.168.1.5:3000/api/attachments`, {
        method: 'POST',
        headers: new Headers({
          'Authorization': `Bearer ${token}`
        }),
        body
      })
        .then((response) => response.json())
        .then((json) => {
          console.log('json.attachmentId')
          console.log(json)
        })
        .catch((error) => {
          console.error(error);
        });
    } finally {
      null;
    }
  };

  const handleAudio = async () => {
    Toast.show('Comming Soon', Toast.SHORT);
    return;
    if (recordingStatus === '') {
      setRecordingStatus('start');
      currRecordingFileTime = Date.now();
      await AudioRecorder.prepareRecordingAtPath(
        `${AudioUtils.DocumentDirectoryPath}/${currRecordingFileTime}test.aac`,
        recordingSettings,
      );
      await AudioRecorder.startRecording();
    } else {
      setRecordingStatus('done');
      await AudioRecorder.stopRecording();
      const audioPath = `${AudioUtils.DocumentDirectoryPath
        }/${currRecordingFileTime}test`;

      const fileName = `${audioPath}.aac`;

      const file = {
        uri: Platform.OS === 'ios' ? audioPath : `file://${audioPath}`,
        name: `${currRecordingFileTime}test.acc`,
        type: `audio/aac`,
      };
      let uploadData = new FormData();
      uploadData.append('submit', 'ok');
      uploadData.append('file', file);
      sendFile(uploadData, id, '', newMsg => { });
      console.log(file);
    }
  };
  const handleCancelRecording = async () => {
    if (recordingStatus === 'start') {
      setRecordingStatus('cancel');
      await AudioRecorder.stopRecording();
    }
  };
  const handleStopRecording = async () => {
    setRecordingStatus('done');
    await AudioRecorder.stopRecording();
  };

  const handleSoundPlayer = audio => {
    if (!playAudio) {
      setPlayAudio(true);
      const sound = new Sound(audio, '', error => {
        if (error) {
          console.log('failed to load the sound', error);
        }

        sound.play(success => {
          console.log(success, 'success play');
          if (!success) {
            console.log('There was an error playing this audio');
          }
        });
      });
    } else {
      const sound = new Sound(audio, '', error => {
        if (error) {
          console.log('failed to load the sound', error);
        }

        sound.stop(success => {
          setPlayAudio(false);
          if (!success) {
            console.log('There was an error playing this audio');
          }
        });
      });
    }
  };
  function openFileViewr(url) {
    const ext = url.split(/\.(?=[^\.]+$)/)[1];
    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${ext}`;

    const options = {
      fromUrl: url,
      toFile: localFile,
    };

    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
        // success
      })
      .catch(error => {
        // error
        console.log(error);
      });
  }
  function onDeleteMessageForMe(messageToDelete) {
    deleteMessageForMe(id, messageToDelete._id, () => {
      setMessages(previousState =>
        previousState.filter(message => message._id !== messageToDelete._id),
      );
      Toast.show('Message deleted', Toast.SHORT);
    });
  }

  function onDeleteMessageEveryone(messageToDelete) {
    deleteMessageForEveryone(id, messageToDelete._id, () => {
      setMessages(previousState =>
        previousState.map(message =>
          message._id === messageToDelete._id
            ? { ...message, text: 'message deleted', isDeleted: true }
            : message,
        ),
      );
      Toast.show('Message deleted', Toast.SHORT);
    });
  }
  const handleBubbleLongPress = (context, messageToDelete) => {
    if (
      messageToDelete.user._id === loggedInUser &&
      !messageToDelete.isDeleted
    ) {
      //delete for every one
      let options = [
        'copy',
        'Delete message for me',
        'Delete message for everyone',
        'Cancel',
      ];

      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        buttonIndex => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(messageToDelete.text);
              Toast.show('Text copied', Toast.SHORT);
              break;
            case 1:
              onDeleteMessageForMe(messageToDelete);
              break;
            case 2:
              onDeleteMessageEveryone(messageToDelete);
          }
        },
      );
    } else if (
      messageToDelete.user._id !== loggedInUser &&
      !messageToDelete.isDeleted
    ) {
      let options = ['copy', 'Delete message for me', 'Cancel'];

      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        buttonIndex => {
          switch (buttonIndex) {
            case 0:
              Clipboard.setString(messageToDelete.text);
              Toast.show('Text copied', Toast.SHORT);
              break;
            case 1:
              onDeleteMessageForMe(messageToDelete);
              break;
          }
        },
      );
    } else {
      let options = ['Delete', 'Cancel'];

      const cancelButtonIndex = options.length - 1;
      context.actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        buttonIndex => {
          switch (buttonIndex) {
            case 0:
              onDeleteMessageForMe(messageToDelete);
              break;
          }
        },
      );
    }
  };
  return (
    <>
      <GiftedChat
        text={typingMessage}
        alwaysShowSend
        onLongPress={handleBubbleLongPress}
        renderUsernameOnMessage={roomType === 'g' ? true : false}
        messages={messages}
        onSend={newMessage => {
          //setShowEmojiBoard(false);
          handleSend(typingMessage);
        }}
        renderFooter={props => (
          <>
            {messagesStatus === '' && (
              <ActivityIndicator
                size={28}
                color={BaseBackgroundColors.profileColor}
                style={{
                  marginBottom: '60%',

                  zIndex: 123,
                  alignSelf: 'center',
                }}
              />
            )}
          </>
        )}
        keyboardShouldPersistTaps="never"
        user={{ _id: loggedInUser }}
        renderMessageVideo={props =>
          renderMessageVideo({ ...props, setVideoModal, openFileViewr })
        }
        isKeyboardInternallyHandled={false}
        renderBubble={props =>
          renderBubble({
            ...props,

            playAudio,
            setPlayAudio,
            handleSoundPlayer,
            openFileViewr,
          })
        }
        renderInputToolbar={props =>
          renderInputToolbar({
            ...props,
            isInputTyping,
            inputRef,
            recordingStatus,
            recordingTime,
            showEmoji,
            typingMessage,
            inputCursorPosition,
            isEmojiadded,

            pickImageHandler,
            openFilePicker,
            handleAudio,
            handleCancelRecording,
            setShowEmojiBoard,
            setTypingMessage,
            setInputCursorPosition,
            setIsEmojiAdded,
          })
        }
        renderSend={renderSend}
        scrollToBottomComponent={scrollToBottomComponent}
        scrollToBottom
        renderComposer={renderComposer}
        minComposerHeight={40}
        bottomOffset={-20}
        minInputToolbarHeight={60}
        renderActions={renderActions}
        timeTextStyle={{
          right: { color: '#636363', fontSize: 12 },
          left: { color: '#636363', fontSize: 12 },
        }}
        renderDay={renderDay}
        renderAvatar={null}
        onInputTextChanged={e => {
          setTypingMessage(e);
          setShowEmojiBoard(false);
        }}
      />

      {showEmoji && (
        <EmojiSelector
          columns={8}
          showHistory
          category={Categories.all}
          showSearchBar={false}
          showSectionTitles={false}
          onEmojiSelected={emoji => {
            const newString = addCharater(
              typingMessage,
              emoji,
              inputCursorPosition,
            );
            const newCursorPosition = inputCursorPosition + emoji.length;
            setInputCursorPosition(newCursorPosition);
            setIsEmojiAdded(true);
            setTypingMessage(newString);
            //
          }}
        />
      )}
      {viedoModal !== '' && (
        <Modal visible={viedoModal !== ''}>
          <View style={styles.modal}>
            <TouchableOpacity onPress={() => setVideoModal('')}>
              <Icon
                name={'close'}
                size={20}
                type={'font-awesome'}
                color={'white'}
                style={styles.close}
              />
            </TouchableOpacity>
            <VideoPlayer uri={viedoModal} />
          </View>
        </Modal>
      )}
      {isUploading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 123456,
            backgroundColor: 'rgba(0,0,0,0.7)',
          }}>
          <ActivityIndicator
            color={BaseBackgroundColors.profileColor}
            size={32}
          />
        </View>
      )}
    </>
  );
});
function renderBubble(props) {
  return (
    <>
      {props.currentMessage.audio ? (
        renderAudio(props)
      ) : props.currentMessage.file ? (
        renderFile(props)
      ) : (
            <Bubble
              {...props}
              {...RenderMessageAudioProps}
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
          )}
    </>
  );
}
function renderInputToolbar(props) {
  return (
    <View
      style={{
        bottom: 2,

        marginHorizontal: 10,
        flexDirection: 'row',
      }}>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          borderRadius: 28,
          flexGrow: 1,
          alignItems: 'center',
          paddingHorizontal: 10,
          flex: 1,
        }}>
        {(props.recordingStatus === '' || props.recordingStatus === 'done') && (
          <>
            <TouchableOpacity
              style={{ alignSelf: 'flex-end', paddingVertical: 15 }}
              onPress={() => {
                if (props.showEmoji) {
                  props.inputRef.current.focus();
                } else {
                  props.inputRef.current.blur();
                }
                props.setShowEmojiBoard(!props.showEmoji);
              }}>
              <Icon
                name={!props.showEmoji ? 'smile-o' : 'keyboard-o'}
                type="font-awesome"
                color="#707070"
                size={28}
              />
            </TouchableOpacity>

            {/* <Composer
              {...props}
              textInputStyle={{
                color: BaseBackgroundColors.secondary,
                backgroundColor: 'white',
                flexGrow: 1,
                fontSize: 18,
                marginTop: 5,
              }}
            /> */}

            <TextInput
              multiline
              numberOfLines={2}
              ref={props.inputRef}
              selection={
                props.isEmojiadded
                  ? {
                    start: props.inputCursorPosition,
                    end: props.inputCursorPosition,
                  }
                  : null
              }
              onFocus={async () => await props.setShowEmojiBoard(false)}
              style={{
                color: BaseBackgroundColors.secondary,
                marginHorizontal: 5,
                backgroundColor: 'white',
                flexGrow: 1,
                flex: 1,
                fontSize: 18,
                maxHeight: 60,
              }}
              onSelectionChange={({ nativeEvent: { selection } }) => {
                if (props.inputCursorPosition !== selection.end) {
                  props.setInputCursorPosition(selection.end);
                }
              }}
              placeholder="Type a message"
              placeholderTextColor="grey"
              value={props.typingMessage}
              onChangeText={text => {
                props.setIsEmojiAdded(false);
                props.setTypingMessage(text);
              }}
            />

            <>
              <TouchableOpacity
                style={{ alignSelf: 'flex-end', paddingVertical: 15 }}
                onPress={() => props.openFilePicker()}>
                <Icon
                  name="paperclip"
                  type="font-awesome"
                  color="#707070"
                  size={26}
                  style={{ marginRight: 5 }}
                />
              </TouchableOpacity>
              {!props.isInputTyping && (
                <TouchableOpacity
                  onPress={() => props.pickImageHandler()}
                  style={{ alignSelf: 'flex-end', paddingVertical: 15 }}>
                  <Icon
                    name="camera"
                    type="font-awesome"
                    color="#707070"
                    size={26}
                    style={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>
              )}
            </>
          </>
        )}
        {props.recordingStatus === 'start' && (
          <>
            <View style={{ alignSelf: 'flex-end', paddingVertical: 15 }}>
              <Icon
                name="keyboard-voice"
                type="materialicons"
                color={BaseBackgroundColors.profileColor}
                size={28}
              />
            </View>
            <Text
              style={{
                color: BaseBackgroundColors.profileColor,
                flexGrow: 1,
                fontSize: 16,
                marginLeft: 20,
              }}>
              {props.recordingTime}
            </Text>

            <TouchableOpacity
              style={{ alignSelf: 'flex-end', paddingVertical: 15 }}
              onPress={() => props.handleCancelRecording()}>
              <Icon
                name="delete-forever"
                type="material"
                color="#707070"
                size={26}
                style={{ marginRight: 5 }}
              />
            </TouchableOpacity>
          </>
        )}
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
          }}
          onPress={() => props.handleAudio()}>
          <Icon
            name={
              props.recordingStatus === '' || props.recordingStatus === 'done'
                ? 'keyboard-voice'
                : props.recordingStatus === 'start'
                  ? 'telegram-plane'
                  : ''
            }
            type={
              props.recordingStatus === '' || props.recordingStatus === 'done'
                ? 'materialicons'
                : props.recordingStatus === 'start'
                  ? 'font-awesome-5'
                  : ''
            }
            size={28}
            color="white"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

function renderSend(props) {
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
        style={{ paddingHorizontal: 8 }}
      />
    </Send>
  );
}
function renderComposer(props) {
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
}
function scrollToBottomComponent() {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Icon
        name="chevron-double-down"
        type="material-community"
        size={36}
        color={BaseBackgroundColors.secondary}
      />
    </View>
  );
}

function renderActions(props) {
  return (
    <Actions
      {...props}
      containerStyle={{
        marginBottom: 20,

        width: 32,
      }}
      icon={() => (
        <Icon name="smile-o" type="font-awesome" size={32} color={'#707070'} />
      )}
    />
  );
}

function renderDay(props) {
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
      textStyle={{ color: '#282828', fontSize: 16 }}
    />
  );
}

const renderMessageVideo = props => {
  const { currentMessage } = props;

  return (
    <TouchableOpacity
      style={{
        paddingVertical: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
      }}
      onPress={() => props.openFileViewr(currentMessage.video)}>
      <Icon name="play" type="font-awesome" size={16} color="grey" />
      <Text style={{ color: 'grey', marginLeft: 5 }}>Tap to play video</Text>
    </TouchableOpacity>
  );
};

const renderAudio = props => {
  return (
    <ChatBubble {...props}>
      <AudioPlayer url={props.currentMessage.audio} />
    </ChatBubble>
  );
};

const renderFile = props => {
  return (
    <ChatBubble {...props}>
      <TouchableOpacity
        style={{
          paddingVertical: 20,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => props.openFileViewr(props.currentMessage.file)}>
        <Icon name="play" type="font-awesome" size={16} color="grey" />
        <Text style={{ color: 'grey', marginLeft: 5 }}>Tap to open file</Text>
      </TouchableOpacity>
    </ChatBubble>
  );
};

/*-------------------------------*/

function addCharater(oldS, newS, pos) {
  return [oldS.slice(0, pos), newS, oldS.slice(pos)].join('');
}

/*-------------------------------*/

function getTime(value) {
  var sec_num = parseInt(value, 10);

  var min = parseInt(sec_num / 60);
  min = ('0' + min.toString()).slice(-2);
  var sec = sec_num % 60;
  sec = ('0' + sec.toString()).slice(-2);

  return min + ':' + sec;
}

/*-------------------------------*/
const recordingSettings = {
  SampleRate: 22050,
  Channels: 1,
  AudioQuality: 'Low',
  AudioEncoding: 'aac',
  MeteringEnabled: true,
  IncludeBase64: true,
  AudioEncodingBitRate: 32000,
};
