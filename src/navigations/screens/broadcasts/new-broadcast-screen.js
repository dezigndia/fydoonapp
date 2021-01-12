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
import {initiateBroadcast} from '../../../apis/chat-operations';
import ImagePicker from 'react-native-image-picker';
import {updateChatList} from '../../../redux/actions/detect-changes-actions';
import {getChatsLists} from '../../../websocket-apis/methods';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';

const NewBroadcastScreen = props => {
  const friends = useSelector(state => state.contacts.contacts.friends);
  const dispatch = useDispatch();
  const utils = useSelector(state => state.utils);
  const ws = utils.ws;
  const inputRef = useRef();
  const selectedMembers = props.route.params.selectedMembers;
  const [broadcastName, setBroadcastName] = useState('');
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEmoji, setShowEmojiBoard] = useState(false);
  const [inputCursorPosition, setInputCursorPosition] = useState(0);
  const [isEmojiadded, setIsEmojiAdded] = useState(false);

  const detectChanges = useSelector(state => state.detectChanges);

  function handleBroadcast() {
    setLoading(true);
    let data = new FormData();
    data.append('BROADCAST_NAME', broadcastName);

    const allParticipantsIds = selectedMembers.map(item => item.username);
    ///console.log(allParticipantsIds);
    data.append('participant', allParticipantsIds.join(','));

    initiateBroadcast(utils.token, data)
      .then(res => {
        // console.log(res);
        setLoading(false);
        //props.navigation.navigate('broadcasts'); change this when this is inside
        if (ws && ws.readyState === ws.OPEN) {
          ws.send(getChatsLists('broadcast_list'));
        }
        props.navigation.popToTop();
      })
      .catch(err => {
        setLoading(false);
        console.log(err.response, 'create broadcast  api error');
        Toast.show('Unable to create this broadcast!', Toast.SHORT);
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
  useEffect(() => {
    return () => {
      dispatch(updateChatList(!detectChanges.changeChatList));
    };
  }, []);
  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      <NewGroupHeader title="New Broadcast" {...props} />

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
              source={img}
              icon={{
                name: 'camera',
                type: 'material-community',
                size: 32,
              }}
              rounded
              size={'medium'}
              containerStyle={{
                backgroundColor: 'lightgrey',

                borderRadius: 150,
              }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Enter broadcast name"
            value={broadcastName}
            onChangeText={text => {
              setIsEmojiAdded(false);
              setBroadcastName(text);
            }}
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
            onSelectionChange={({nativeEvent: {selection}}) => {
              if (inputCursorPosition !== selection.end) {
                setInputCursorPosition(selection.end);
              }
            }}
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
                title={item.database_name[0]}
                source={
                  item.profile_pic !== '' ? {uri: item.profile_pic} : null
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
                {item.database_name}
              </Text>
            </View>
          )}
        />
      </ScrollView>
      <FAB
        {...props}
        loading={loading}
        onPress={() => {
          if (broadcastName === '') {
            Toast.show('Enter broadcast name!', Toast.SHORT);
          } else if (broadcastName !== '' && !loading) {
            handleBroadcast();
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
              broadcastName,
              emoji,
              inputCursorPosition,
            );
            const newCursorPosition = inputCursorPosition + emoji.length;
            setInputCursorPosition(newCursorPosition);
            setIsEmojiAdded(true);
            setBroadcastName(newString);
            //
          }}
        />
      )}
    </>
  );
};

export default NewBroadcastScreen;
function addCharater(oldS, newS, pos) {
  return [oldS.slice(0, pos), newS, oldS.slice(pos)].join('');
}
