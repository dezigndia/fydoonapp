import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  Linking,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {styles} from '../../styles/messenger-styles';
import {BaseBackgroundColors} from '../../styles/constants';
import {Icon, Avatar, Badge} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  getChatsLists,
  clearChat,
  fetchMessages,
} from '../../websocket-apis/methods';
import {updateChatList} from '../../redux/actions/detect-changes-actions';
import {editContact, openContact} from '../../utils/contacts-update';
import {reportUser} from '../../apis/chat-operations';
import Toast from 'react-native-simple-toast';
import {Platform} from 'react-native';

const MessengerHeader = ({navigation}) => {
  const messengerData = useSelector(state => state.messenger);
  const detectChanges = useSelector(state => state.detectChanges);
  const utils = useSelector(state => state.utils);
  const [isAlreadyPresentContact, setIsalreadyPresentContact] = useState(true);
  const ws = utils.ws;
  const dispatch = useDispatch();
  const friend = messengerData.currentChatFriend;
  function handleViewProfile() {
    navigation.navigate('friend-profile', {
      friendId: friend.participant_two,
    });
  }
  function handleClearChat() {
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(clearChat(friend.participant_two, friend.type));
      ws.send(fetchMessages(friend.participant_two, friend.type, 0, 1000));
    }
  }
  function handleEditContact() {
    // console.log(friend.roomDisplayName);
    const user = {
      name: friend.roomDisplayName,
      number: friend.participant_two_number,
    };
    editContact(dispatch, utils.token, null, user);
  }
  function handleAddContact() {
    const user = {
      name: friend.roomDisplayName,
      number: friend.participant_two_number,
    };
    openContact(dispatch, utils.token, null, user);
  }
  function onReport() {
    const reportReason = '';
    const data = new FormData();
    data.append('report', reportReason);
    reportUser(utils.token, data, friend.participant_two)
      .then(res => {
        Toast.show('User reported', Toast.SHORT);
      })
      .catch(err => {
        console.log(err.response, 'report user api error');
        Toast.show('Unable to report!', Toast.SHORT);
      });
  }

  useEffect(() => {
    return () => {
      dispatch(updateChatList(!detectChanges.changeChatList));
    };
  }, []);

  return (
    <View style={styles.headerContianer}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
          dispatch(updateChatList(!detectChanges.changeChatList));
        }}>
        <Icon
          name="keyboard-backspace"
          type="materialicon"
          size={30}
          color={BaseBackgroundColors.profileColor}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.detailBtn} activeOpacity={1}>
        <Avatar
          title={friend.type !== 'b' ? friend.roomDisplayName[0] : ''}
          rounded
          source={friend.image ? {uri: friend.image} : null}
          size="medium"
          icon={{
            name: 'notification',
            type: 'antdesign',
            size: 28,
            color: 'white',
          }}
          titleStyle={{fontSize: 40}}
          containerStyle={styles.headerAvtar}
        />
        <View style={styles.friendDetailsContainer}>
          <Text style={styles.friendName} numberOfLines={1}>
            {friend.roomDisplayName}
          </Text>
          {friend.isActive && (
            <View style={styles.onlineNowContainer}>
              <Badge status="success" />
              <Text style={styles.onlineStatusTxt}>Online now</Text>
            </View>
          )}
          {!friend.isActive && friend.lastLogin !== '' && (
            <Text style={styles.onlineStatusTxt}>
              Active {friend.lastLogin}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.headerBtn}
        onPress={() => {
          if (friend.participant_two_number) {
            let phone = friend.participant_two_number;
            if (Platform.OS === 'ios') {
              phone = 'tel://' + phone;
            } else {
              phone = 'tel:' + phone;
            }
            Linking.openURL(phone);
          } else {
            Toast.show('comming soon!', Toast.SHORT);
          }
        }}>
        <Icon
          name="phone"
          color={BaseBackgroundColors.profileColor}
          size={30}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.headerBtn}
        onPress={() => Toast.show('comming soon!', Toast.SHORT)}>
        <Icon
          name="video"
          type="material-community"
          color={BaseBackgroundColors.profileColor}
          size={30}
        />
      </TouchableOpacity>

      <View style={styles.headerBtn}>
        <Menu style={styles.menu}>
          <MenuTrigger>
            <Icon
              name="dots-vertical"
              color={BaseBackgroundColors.profileColor}
              type="material-community"
              size={30}
            />
          </MenuTrigger>

          <MenuOptions>
            {friend.type === 'o' && (
              <MenuOption
                onSelect={() => handleViewProfile()}
                style={styles.menuitem}>
                <Text style={styles.menuitemText}>View Profile</Text>
              </MenuOption>
            )}
            {friend.type === 'g' && (
              <MenuOption
                onSelect={() =>
                  navigation.navigate('group-details', {
                    group_id: friend.id,
                  })
                }
                style={styles.menuitem}>
                <Text style={styles.menuitemText}>Group info</Text>
              </MenuOption>
            )}
            {friend.type === 'b' && (
              <MenuOption
                onSelect={() =>
                  navigation.navigate('broadcast-details', {
                    broadcast_id: friend.id,
                  })
                }
                style={styles.menuitem}>
                <Text style={styles.menuitemText}>Broadcast info</Text>
              </MenuOption>
            )}
            {/* <MenuOption
              onSelect={() => Alert.alert(`SwitchIn`, 'Comming Soon')}
              style={styles.menuitem}>
              <Text style={styles.menuitemText}>Search</Text>
            </MenuOption> */}
            {friend.type === 'o' && (
              <MenuOption onSelect={() => onReport()} style={styles.menuitem}>
                <Text style={styles.menuitemText}>Report</Text>
              </MenuOption>
            )}
            {/* <MenuOption
              onSelect={() => Alert.alert(`SwitchIn`, 'Comming Soon')}
              style={styles.menuitem}>
              <Text style={styles.menuitemText}>Block</Text>
            </MenuOption> */}
            <MenuOption
              onSelect={() => handleClearChat()}
              style={styles.menuitem}>
              <Text style={styles.menuitemText}>Clear chat</Text>
            </MenuOption>
            {/* <MenuOption
              onSelect={() => Alert.alert(`SwitchIn`, 'Comming Soon')}
              style={styles.menuitem}>
              <Text style={styles.menuitemText}>Media, doc & links</Text>
            </MenuOption> */}
            {friend.type === 'o' && (
              <>
                {isAlreadyPresentContact && (
                  <MenuOption
                    onSelect={() => handleEditContact()}
                    style={styles.menuitem}>
                    <Text style={styles.menuitemText}>Edit contact</Text>
                  </MenuOption>
                )}
                {!isAlreadyPresentContact && (
                  <MenuOption
                    onSelect={() => handleAddContact()}
                    style={styles.menuitem}>
                    <Text style={styles.menuitemText}>Add contact</Text>
                  </MenuOption>
                )}
              </>
            )}
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};
export default MessengerHeader;
