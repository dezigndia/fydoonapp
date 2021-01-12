import React, {useState, useEffect} from 'react';
import {RefreshControl, View, Text, FlatList, Alert} from 'react-native';
import {BaseBackgroundColors} from '../../../styles/constants';
import InboxListItem from './inbox-listItem';
import {useDispatch, useSelector} from 'react-redux';
import {setChatFriend} from '../../../redux/actions/messenger-actions';
import {styles} from '../../../styles/contact-styles';
import {
  getChatRooms,
  deleteChat,
  deleteGroupChat,
  reportUser,
} from '../../../apis/chat-operations';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import {setChatRooms} from '../../../redux/actions/inbox-actions';
import {
  getChatsLists,
  deleteCompleteGroupChat,
  exitFromGroup,
  deleteCompleteOnetoOneChat,
} from '../../../websocket-apis/methods';
import {Overlay} from 'react-native-elements';
import InboxModal from '../../long-press-modals/inbox-modal';
import {openContact} from '../../../utils/contacts-update';
import _ from 'lodash';
import {joinRoom} from '../../../redux/actions/socket-actions';

export default function Inbox({navigation, route}) {
  const utils = useSelector(state => state.utils);
  const {subscriptions} = useSelector(state => state.socket);
  const detectChanges = useSelector(state => state.detectChanges);
  let ws = utils.ws;
  const inbox = useSelector(state => state.inbox);
  const userDetails = useSelector(state => state.userDetails);
  const [refreshing] = useState(false);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isChange, setIschange] = useState(false);
  const [selectedItem, selectItem] = useState(null);
  const [showModal, setModal] = useState(false);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    getInboxList();
  }, [subscriptions]);

  const getInboxList = () => {
    if (subscriptions.length > 0) {
      const list = getMessenger();
      //let sortedList = _.sortBy(list, 'time').reverse();
      dispatch(setChatRooms(list));
    } else {
      dispatch(setChatRooms(inbox.chatRooms));
    }
  };
  // console.log(subscriptions);
  const getMessenger = () => {
    let messenger = [];
    subscriptions.forEach(item => {
      if (item.t === 'd') {
        messenger.push({
          id: item.roomId,
          roomId: item.roomId,
          participant_one: '',
          participant_two: '',
          roomDisplayName:
            item.user.firstName + ' ' + item.user.lastName ||
            item.user.phone.code + ' ' + item.user.phone.number ||
            '',
          numberOfmessage: item.unreadCount,
          isActive: false,
          message: item.message ? item.message.msg : '',
          image:
            item.user.profileImage && !_.isEmpty(item.user.profileImage)
              ? item.user.profileImage
              : null,
          date: item.message
            ? moment(item.message.updatedAt).format('MMMM Do YYYY')
            : moment(item.updatedAt).format('MMMM Do YYYY'),
          time: item.message
            ? moment(item.message.updatedAt).format('h:mm a')
            : moment(item.updatedAt).format('h:mm a'),
          lastLogin: '',
          type: 'o',
          isGroup: false,
          participant_two_number: item.user.phone.number || '',
        });
      } else if (item.t === 'c') {
        //  console.log(item.id);
        messenger.push({
          id: item.roomId,
          roomId: item.roomId,
          participant_two: '',
          roomDisplayName: item.name || item.user.phone.number || '',
          numberOfmessage: item.unreadCount,
          isActive: false,
          message: item.message ? item.message.msg : '',
          image: '',
          date: item.message
            ? moment(item.message.updatedAt).format('MMMM Do YYYY')
            : moment(item.updatedAt).format('MMMM Do YYYY'),
          time: item.message
            ? moment(item.message.updatedAt).format('h:mm a')
            : moment(item.updatedAt).format('h:mm a'),
          lastLogin: '',
          type: 'g',
          isGroup: true,
        });
      }
    });

    return messenger;
  };
  function onDelete(item) {
    if (item.type === 'g') {
      if (ws && ws.readyState === ws.OPEN) {
        // console.log(deleteCompleteGroupChat(item.id))
        ws.send(deleteCompleteGroupChat(item.id));
        getMessenger();
      } else {
        Toast.show('Unable to delete', Toast.SHORT);
      }
    } else if (item.type === 'o')
      if (ws && ws.readyState === ws.OPEN) {
        ws.send(deleteCompleteOnetoOneChat(item.participant_two));
        getMessenger();
      } else {
        Toast.show('Unable to delete', Toast.SHORT);
      }
  }
  function onExitGroup(item) {
    if (ws && ws.readyState === ws.OPEN) {
      console.log(exitFromGroup(item.id, userDetails.userId));
      ws.send(exitFromGroup(item.id, userDetails.userId));
      getMessenger();
    } else {
      Toast.show('Unable to delete', Toast.SHORT);
    }
  }
  function onReport(item) {
    const reportReason = '';
    const data = new FormData();
    data.append('report', reportReason);

    reportUser(utils.token, data, item.participant_two)
      .then(res => {
        getMessenger(utils.token);
        Toast.show('User reported', Toast.SHORT);
      })
      .catch(err => {
        console.log(err.response, 'report user api error');
        Toast.show('Unable to report!', Toast.SHORT);
      });
  }

  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[BaseBackgroundColors.secondary]}
            tintColor={BaseBackgroundColors.secondary}
            refreshing={refreshing}
            onRefresh={() => {
              getInboxList();
            }}
          />
        }
        ListEmptyComponent={() => (
          <View style={styles.listEmptyContainer}>
            <Text style={styles.listEmptyText}>No Chats Available</Text>
          </View>
        )}
        data={inbox.chatRooms || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <InboxListItem
            onPress={() => {
              dispatch(setChatFriend(item));
              joinRoom(item.id);
              navigation.navigate('messenger');
            }}
            onLongPress={() => {
              // selectItem(item);
              // setModal(true);
            }}
            date={item.date}
            image={item.image}
            avatarIcon={true}
            txtLeftTitle={item.roomDisplayName}
            txtContent={item.message}
            txtRight={item.date}
            iconName={item.type === 'o' ? 'person' : 'account-group'}
            iconType={item.type === 'o' ? 'material' : 'material-community'}
            time={item.time}
            isActive={item.isActive}
            numberOfmessage={item.numberOfmessage}
          />
        )}
      />
      <Overlay
        visible={showModal}
        onBackdropPress={() => setModal(false)}
        onRequestClose={() => setModal(false)}
        children={
          <InboxModal
            item={selectedItem}
            onCancel={() => setModal(false)}
            onEdit={() => {}}
            onReport={() => {
              onReport(selectedItem);
              setModal(false);
            }}
            onViewProfile={item => {
              setModal(false);
              navigation.navigate('friend-profile', {
                friendId: item.participant_two,
              });
            }}
            onDelete={() => {
              onDelete(selectedItem);
              setModal(false);
            }}
            onExitGroup={() => {
              onExitGroup(selectedItem);
              setModal(false);
            }}
          />
        }
      />
    </>
  );
}
