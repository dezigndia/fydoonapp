import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import logo from '../../../assets/images/main.jpg';
import {BaseBackgroundColors} from '../../../styles/constants';
import {styles} from '../../../styles/contact-styles';
import ContactsHeader from '../../../components/contacts/contact-header';
import ContactListItem from '../../../components/contacts/contact-listitem';
import {openContact, getContacts} from '../../../utils/contacts-update';
import {useSelector, useDispatch} from 'react-redux';
import {initiateChat} from '../../../apis/chat-operations';
import Toast from 'react-native-simple-toast';
import {getChatsLists} from '../../../websocket-apis/methods';
import {updateChatList} from '../../../redux/actions/detect-changes-actions';
import {setChatFriend} from '../../../redux/actions/messenger-actions';
import {setContacts} from '../../../redux/actions/contact-action';
import {
  createDirectRoom,
  getSubscriptions,
  joinRoom,
  sendContacts,
} from '../../../redux/actions/socket-actions';
import _ from 'lodash';

const ContactScreen = props => {
  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();
  const {subscriptions} = useSelector(state => state.socket);
  const utils = useSelector(state => state.utils);
  const detectChanges = useSelector(state => state.detectChanges);
  const userDetails = useSelector(state => state.userDetails);
  const ws = utils.ws;
  const [refreshing] = useState(false);
  const [filteredFriends, setFilteredFriends] = useState(contacts.friends);
  const [filteredInvites, setFilteredInvites] = useState(contacts.notFriends);
  const [search, setSearch] = useState('');
  function handleNewGroup() {
    props.navigation.navigate('select-members');
  }

  function handleNewContact() {
    openContact(dispatch, utils.token, null);
  }
  function handleNewChat(item) {
    const obj = {
      id: item.roomId,
      roomId: item.roomId,
      participant_one: '',
      participant_two: '',
      roomDisplayName: getName(item),
      numberOfmessage: 0,
      isActive: false,
      message: '',
      image:
        item.profileImage && !_.isEmpty(item.profileImage)
          ? item.profileImage
          : null,
      date: '',
      time: '',
      lastLogin: '',
      type: 'o',
      isGroup: false,
      participant_two_number: getPhone(item),
    };
    dispatch(setChatFriend(obj));
    if (item.roomId) {
      joinRoom(item.roomId);
      props.navigation.navigate('messenger');
    } else {
      createDirectRoom(item._id, () => {
        props.navigation.navigate('messenger');
        sendContacts(utils.token, dispatch);
      });
    }
  }
  function handleSearch(text) {
    setSearch(text);
    let value = text.toLowerCase();
    if (value === '') {
      setFilteredFriends(contacts.friends);
      setFilteredInvites(contacts.notFriends);
      return;
    }
    const filtering = contacts.friends.filter(
      item =>
        getName(item)
          .toLowerCase()
          .startsWith(value) ||
        getPhone(item)
          .toLowerCase()
          .includes(value),
    );
    // const filterInvites = contacts.notFriends.filter(
    //   item =>
    //     item.name.toLowerCase().startsWith(value) ||
    //     item['phone-number'].toLowerCase().startsWith(value),
    // );
    setFilteredFriends(filtering);
    // setFilteredInvites(filterInvites);
  }
  //console.log(filteredFriends);
  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      <ContactsHeader
        {...props}
        title={'Contacts'}
        searchValue={search}
        onSearch={text => handleSearch(text)}
        onCancel={() => {
          setFilteredFriends(contacts.friends);
          setFilteredInvites(contacts.notFriends);
          setSearch('');
        }}
      />

      <ScrollView
        refreshControl={
          <RefreshControl
            colors={[BaseBackgroundColors.secondary]}
            tintColor={BaseBackgroundColors.secondary}
            refreshing={refreshing}
            onRefresh={() => {
              sendContacts(utils.token, dispatch);
            }}
          />
        }
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}>
        {/* <ContactListItem
          iconColor={BaseBackgroundColors.profileColor}
          iconName={'account-multiple'}
          iconType={'material-community'}
          txtLeftTitle="New Group"
          avatarStyle={styles.avatarStyle}
          onPress={() => handleNewGroup()}
        /> */}
        {/* <ContactListItem
          iconColor={BaseBackgroundColors.profileColor}
          onPress={() =>
            props.navigation.navigate('broadcast-members-selection')
          }
          iconName={'notification'}
          iconType={'antdesign'}
          txtLeftTitle="New Broadcast"
          avatarStyle={styles.avatarStyle}
        /> */}
        <ContactListItem
          iconColor={BaseBackgroundColors.profileColor}
          onPress={() => handleNewContact()}
          iconName={'account-plus'}
          iconType={'material-community'}
          txtLeftTitle="New Contact"
          avatarStyle={styles.avatarStyle}
        />
        <View style={styles.friendListTitleContanier}>
          <Text style={styles.friendListTitle}>My Friends</Text>
          <View style={styles.hrLine} />
        </View>
        <FlatList
          ListEmptyComponent={() => (
            <View style={styles.listEmptyContainer}>
              <Text style={styles.listEmptyText}>You have no friends</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          data={filteredFriends}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <ContactListItem
              isFriend={true}
              onPress={() => {
                handleNewChat(item);
                // props.navigation.navigate('friend-profile', {
                //   friendId: item._id,
                // });
              }}
              iconName={'account'}
              iconType={'material-community'}
              image={
                item.profileImage && !_.isEmpty(item.profileImage)
                  ? item.profileImage
                  : null
              }
              txtLeftTitle={getName(item)}
              txtContent={getPhone(item)}
              avatarStyle={styles.avatarStyle}
            />
          )}
        />
        {contacts.notFriends.length > 0 && (
          <>
            <View style={styles.friendListTitleContanier}>
              <Text style={styles.friendListTitle}>Invite others</Text>
              <View style={styles.hrLine} />
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={filteredInvites}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <ContactListItem
                  iconName={'account'}
                  iconType={'material-community'}
                  onPress={() =>
                    Alert.alert(
                      'Fyndoo',
                      `Send an invitation to ${
                        item.firstName ? item.firstName : item.phone
                      }`,
                    )
                  }
                  txtLeftTitle={item.firstName ? item.firstName : item.phone}
                  txtContent={item.phone ? item.phone : ''}
                  avatarStyle={styles.avatarStyle}
                />
              )}
            />
          </>
        )}
      </ScrollView>
    </>
  );
};

export default ContactScreen;
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
