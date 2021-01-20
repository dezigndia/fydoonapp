import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  Image,
  StatusBar,
  FlatList,
  RefreshControl,
  ScrollView,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import logo from '../../../assets/images/main.jpg';
import {BaseBackgroundColors} from '../../../styles/constants';
import {styles} from '../../../styles/contact-styles';
import ContactListItem from '../../../components/contacts/contact-listitem';
import {useSelector, useDispatch} from 'react-redux';
import NewGroupHeader from '../../../components/groups/new-group-header';
import {Avatar, Badge, Icon} from 'react-native-elements';
import FAB from '../../../components/fab/fab';
import Toast from 'react-native-simple-toast';
import {initiateGroupChat, uploadRoomPic} from '../../../apis/chat-operations';
import ImagePicker from 'react-native-image-picker';
import {getChatsLists} from '../../../websocket-apis/methods';
import {updateChatList} from '../../../redux/actions/detect-changes-actions';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import _ from 'lodash';
import {createPrivateGroup} from '../../../redux/actions/socket-actions';

const NewGroupScreen = props => {
  const friends = useSelector(state => state.contacts.contacts.friends);
  const detectChanges = useSelector(state => state.detectChanges);
  const dispatch = useDispatch();
  const utils = useSelector(state => state.utils);
  const ws = utils.ws;
  const inputRef = useRef();
  const selectedMembers = props.route.params.selectedMembers;
  const [groupName, setGroupName] = useState('');
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmojiBoard] = useState(false);
  const [inputCursorPosition, setInputCursorPosition] = useState(0);
  const [isEmojiadded, setIsEmojiAdded] = useState(false);

  function handlGroupChat() {
    setLoading(true);
    let data = new FormData();
    data.append('GROUP_NAME', groupName);
    if (img) {
      data.append('DISPLAY_PIC', img.data);
    }

    const allParticipantsIds = selectedMembers.map(item => item._id);

    createPrivateGroup(allParticipantsIds, groupName, (isSuccessFull, data) => {
      if (isSuccessFull) {
        if (img) {
          const input = {
            profileImage: 'data:' + img.type + ';base64,' + img.data,
          };
          uploadRoomPic(input, data._id, utils.token)
            .then(() => {
              setLoading(false);
              props.navigation.popToTop();
              Toast.show('Group created', Toast.SHORT);
            })
            .catch(err => {
              setLoading(false);
              props.navigation.popToTop();
              Toast.show('Group created without photo', Toast.SHORT);
            });
        } else {
          setLoading(false);
          props.navigation.popToTop();
          Toast.show('Group created', Toast.SHORT);
        }
      } else {
        setLoading(false);

        Toast.show('Unable to create this group!', Toast.SHORT);
      }
    });
  }

  const pickImageHandler = () => {
    ImagePicker.showImagePicker(
      {title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
      res => {
        if (res.didCancel) {
          console.log('User cancelled!');
        } else if (res.error) {
          console.log('Error', res.error);
        } else {
          setImg(res);
        }
      },
    );
  };
  // useEffect(() => {
  //   return () => {
  //     dispatch(updateChatList(!detectChanges.changeChatList));
  //   };
  // }, []);

  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      <NewGroupHeader title="New Group" {...props} />

      <ScrollView
        style={[styles.mainContainer]}
        showsVerticalScrollIndicator={false}>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 20,
            flexDirection: 'row',
            alignItems: 'baseline',
            flex: 1,
          }}>
          <TouchableOpacity onPress={() => pickImageHandler()}>
            <Avatar
              icon={{
                name: 'camera',
                type: 'material-community',
                size: 32,
              }}
              rounded
              source={
                img
                  ? {
                      uri: 'data:' + img.type + ';base64,' + img.data,
                    }
                  : null
              }
              size={'medium'}
              containerStyle={{
                backgroundColor: 'lightgrey',

                borderRadius: 150,
              }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Enter group name"
            value={groupName}
            ref={inputRef}
            selection={
              isEmojiadded
                ? {
                    start: inputCursorPosition,
                    end: inputCursorPosition,
                  }
                : null
            }
            onFocus={async () => await setShowEmojiBoard(false)}
            maxLength={30}
            style={{
              marginHorizontal: 10,
              borderBottomWidth: 1,
              borderBottomColor: BaseBackgroundColors.profileColor,
              flexGrow: 1,
              fontSize: 18,
              paddingBottom: 10,
              flex: 1,
            }}
            onSelectionChange={({nativeEvent: {selection}}) => {
              if (inputCursorPosition !== selection.end) {
                setInputCursorPosition(selection.end);
              }
            }}
            onChangeText={text => {
              setIsEmojiAdded(false);
              setGroupName(text);
            }}
          />

          <TouchableOpacity
            style={{alignSelf: 'center'}}
            onPress={() => {
              if (showEmoji) {
                inputRef.current.focus();
              } else {
                inputRef.current.blur();
              }
              setShowEmojiBoard(!showEmoji);
            }}>
            <Icon
              name={!showEmoji ? 'smile-o' : 'keyboard-o'}
              type="font-awesome"
              color="#707070"
              size={28}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.friendListTitleContanier}>
          <Text style={styles.friendListTitle}>
            Participants:{' '}
            {selectedMembers.length > 99 ? '99+' : selectedMembers.length}
          </Text>
          <View style={styles.hrLine} />
        </View>
        <FlatList
          contentContainerStyle={{
            flex: 1,
            flexWrap: 'wrap',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
          }}
          data={selectedMembers}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View style={{marginBottom: 20, marginHorizontal: 10}}>
              <Avatar
                icon={{name: 'account', type: 'material-community'}}
                source={
                  item.profileImage && !_.isEmpty(item.profileImage)
                    ? {uri: item.profileImage}
                    : null
                }
                size={'large'}
                rounded
                containerStyle={{backgroundColor: 'lightgrey'}}
              />
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 5,
                  color: 'grey',
                  textAlign: 'center',
                  maxWidth: 70,
                  alignSelf: 'center',
                }}
                numberOfLines={2}>
                {getName(item)}
              </Text>
            </View>
          )}
        />
      </ScrollView>
      <FAB
        {...props}
        loading={loading}
        onPress={() => {
          if (groupName === '') {
            Toast.show('Enter group name!', Toast.SHORT);
          } else if (groupName !== '' && !loading) {
            handlGroupChat();
          }
        }}
        iconType={'material'}
        iconName="done"
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
              groupName,
              emoji,
              inputCursorPosition,
            );
            const newCursorPosition = inputCursorPosition + emoji.length;
            setInputCursorPosition(newCursorPosition);
            setIsEmojiAdded(true);
            setGroupName(newString);
            //
          }}
        />
      )}
    </>
  );
};

export default NewGroupScreen;

function addCharater(oldS, newS, pos) {
  return [oldS.slice(0, pos), newS, oldS.slice(pos)].join('');
}
function getName(userDetails) {
  return (
    userDetails.firstName + ' ' + userDetails.lastName ||
    userDetails.localContact.firstName +
      ' ' +
      userDetails.localContact.lastName ||
    userDetails.phone.code + ' ' + userDetails.phone.number ||
    ''
  );
}
function getPhone(userDetails) {
  return userDetails.phone.code + ' ' + userDetails.phone.number || '';
}
