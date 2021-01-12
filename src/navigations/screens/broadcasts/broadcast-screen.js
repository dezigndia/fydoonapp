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
  ActivityIndicator,
} from 'react-native';
import logo from '../../../assets/images/main.jpg';
import {BaseBackgroundColors} from '../../../styles/constants';
import {styles} from '../../../styles/contact-styles';
import ContactsHeader from '../../../components/contacts/contact-header';
import ContactListItem from '../../../components/contacts/contact-listitem';
import {openContact, getContacts} from '../../../utils/contacts-update';
import {useSelector, useDispatch} from 'react-redux';
import {initiateChat, deleteBroadCast} from '../../../apis/chat-operations';
import Toast from 'react-native-simple-toast';
import {getChatsLists} from '../../../websocket-apis/methods';
import InboxListItem from '../../../components/home/inbox/inbox-listItem';
import FAB from '../../../components/fab/fab';
import {setBroadcastsRooms} from '../../../redux/actions/inbox-actions';
import {setChatFriend} from '../../../redux/actions/messenger-actions';
import _ from 'lodash';

const BroadcastScreen = props => {
  const contacts = useSelector(state => state.contacts.contacts);
  const dispatch = useDispatch();
  const utils = useSelector(state => state.utils);
  const inbox = useSelector(state => state.inbox);
  const detectChanges = useSelector(state => state.detectChanges);
  const ws = utils.ws;
  const [refreshing] = useState(false);
  const [filteredBroadCasts, setFileterdBroadCast] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  function handleNewBroadCast() {
    props.navigation.navigate('broadcast-members-selection');
  }

  function handleSearch(text) {
    setSearch(text);
    let value = text.toLowerCase();
    if (value === '') {
      setFileterdBroadCast(inbox.broadcastRooms);
      return;
    }
    const filtering = inbox.broadcastRooms.filter(item =>
      item.roomDisplayName.toLowerCase().startsWith(value),
    );
    setFileterdBroadCast(filtering);
  }
  useEffect(() => {
    // setLoading(true);
    getBroadcast();
  }, 0);
  useEffect(() => {
    getBroadcast();
  }, [detectChanges, ws]);
  function getBroadcast() {
    // console.log(ws);
    if (ws && ws.readyState === ws.OPEN) {
      //console.log(getChatsLists('broadcast_list'));
      ws.send(getChatsLists('broadcast_list'));
    } else {
      setLoading(false);
    }
    if (ws && ws.readyState === ws.OPEN) {
      ws.onmessage = e => {
        const data = JSON.parse(e.data);
        if (_.isArray(data.data)) {
          const broadcastList = formatChatList(data.data);
          dispatch(setBroadcastsRooms(broadcastList));
          setFileterdBroadCast(broadcastList);

          setLoading(false);
        } else {
          // dispatch(setBroadcastsRooms(inbox.broadcastRooms));
          // setFileterdBroadCast(inbox.broadcastRooms);
          // setLoading(false);
          //getBroadcast()
        }
      };
    } else {
      // dispatch(setBroadcastsRooms(inbox.broadcastRooms));
      // setFileterdBroadCast(inbox.broadcastRooms);
      // setLoading(false);
    }
  }

  const formatChatList = list => {
    if (list != null) {
      let broadcastList = list.map(item => {
        if (item && item.broadcast_id) {
          return {
            id: item.broadcast_id.toString(),
            roomId: item.broadcast_id,
            participant_two: item.broadcast_id,
            roomDisplayName: item.broadcast_name,
            numberOfmessage: 0,
            isActive: false,
            message: '',
            image: null,
            date: item.last_message_time
              ? moment(item.last_message_time).format('MMMM Do YYYY')
              : '',
            time: item.last_message_time
              ? moment(item.last_message_time).format('h:mm:ss a')
              : '',
            lastLogin: '',
            type: 'b',
            isGroup: false,
            isBroadcast: true,
          };
        }
      });
      return broadcastList;
    }
  };
  function handleLongPress(item) {
    Alert.alert(
      'Alert',
      `Do you really want to delete ${item.roomDisplayName}`,
      [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            deleteBroadCast(utils.token, item.id)
              .then(res => {
                getBroadcast();
                Toast.show('Broadcast deleted', Toast.SHORT);
              })
              .catch(err => {
                console.log(err.response, 'delete broadcast  api error');
                Toast.show('Unable to delete', Toast.SHORT);
              });
          },
        },
      ],
    );
  }
  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      {/* <ContactsHeader
        {...props}
        title={'Broadcasts'}
        searchValue={search}
        onSearch={text => handleSearch(text)}
        onCancel={() => {
          setFileterdBroadCast(inbox.broadcastRooms);
          setSearch('');
        }}
      /> */}

      {!loading && (
        <ScrollView
          refreshControl={
            <RefreshControl
              colors={[BaseBackgroundColors.secondary]}
              tintColor={BaseBackgroundColors.secondary}
              refreshing={refreshing}
              onRefresh={() => {
                getBroadcast();
              }}
            />
          }
          style={styles.mainContainer}
          showsVerticalScrollIndicator={false}>
          {/* <ContactListItem
          iconColor={BaseBackgroundColors.profileColor}
          iconName={'account-multiple'}
          iconType={'material-community'}
          txtLeftTitle="New Broadcast"
          avatarStyle={styles.avatarStyle}
          onPress={() =>}
        /> */}
          {/* <View style={styles.friendListTitleContanier}>
          <Text style={styles.friendListTitle}>All Broadcasts</Text>
          <View style={styles.hrLine} />
        </View> */}

          <FlatList
            refreshControl={
              <RefreshControl
                colors={[BaseBackgroundColors.secondary]}
                tintColor={BaseBackgroundColors.secondary}
                refreshing={refreshing}
                onRefresh={() => {
                  getBroadcast();
                }}
              />
            }
            ListEmptyComponent={() => (
              <View style={styles.listEmptyContainer}>
                <Text style={styles.listEmptyText}>No Broadcast Available</Text>
              </View>
            )}
            data={filteredBroadCasts}
            keyExtractor={(item, index) => item.id}
            renderItem={({item, index}) => (
              <InboxListItem
                onPress={() => {
                  dispatch(setChatFriend(item));
                  props.navigation.navigate('messenger');
                }}
                onLongPress={() => {
                  handleLongPress(item);
                }}
                avatarIcon={true}
                iconName="notification"
                iconType="antdesign"
                date={item.date}
                image={null}
                txtLeftTitle={item.roomDisplayName}
                txtContent={item.message}
                txtRight={item.date}
                time={item.time}
                isActive={item.isActive}
                numberOfmessage={item.numberOfmessage}
              />
            )}
          />
        </ScrollView>
      )}
      {loading && (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator
            color={BaseBackgroundColors.profileColor}
            size={32}
          />
        </View>
      )}
      <FAB
        {...props}
        onPress={() => {
          //handleNewBroadCast();
          Alert.alert('Coming Soon');
        }}
        iconType={'material-community'}
        iconName="plus"
      />
    </>
  );
};

export default BroadcastScreen;
