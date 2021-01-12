import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import {styles} from '../../../styles/group-details-styles';
import {BaseBackgroundColors} from '../../../styles/constants';
import {Icon, Avatar, SearchBar, Image, Overlay} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import BroadcastinfoModals from '../../../components/broadcasts/modals/broadcast-info-modals';
import {ActivityIndicator} from 'react-native-paper';
import {updateChatList} from '../../../redux/actions/detect-changes-actions';
import {useDispatch, useSelector} from 'react-redux';
import {
  getBoadcastDetails,
  addBroadcastDetails,
} from '../../../websocket-apis/methods';

const members = [
  {
    id: 1,
    number: '9872347776',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    name: '24th Feb',
  },
  {
    id: 2,
    number: '9872347776',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    name: 'Posters',
  },
  {
    id: 3,
    number: '9872347776',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    name: 'Motion Graphics',
  },
  {
    id: 4,
    number: '9872347776',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    name: 'Video',
  },
  {
    id: 5,
    number: '9872347776',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    name: 'Story',
  },
];

const BroadcastDetailsScreen = ({navigation, route}) => {
  const [refreshing] = useState(false);
  const [img, setImg] = useState('');
  const [broadcastDetails, setBroadcastDetails] = useState(null);
  const [name, setName] = useState('');

  const [isSearching, setIsearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [imageType, setImageType] = useState('');

  const [filteredMembers, setFilteredMembers] = useState([]);

  const [currentModal, setModalType] = useState('');

  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const detectChanges = useSelector(state => state.detectChanges);
  const utils = useSelector(state => state.utils);
  const ws = utils.ws;
  const BROADCAST_ID = route.params.broadcast_id;

  function onSearch(text) {
    setSearchValue(text);
    let value = text.toLowerCase();
    if (value === '') {
      setFilteredMembers(broadcastDetails.participants);
      return;
    }
    const filtering = broadcastDetails.participants.filter(
      item =>
        item.name.toLowerCase().startsWith(value) ||
        item.number.toLowerCase().startsWith(value),
    );
    setFilteredMembers(filtering);
  }
  function checkImageTypeonApiFail() {
    if (img) {
      setImageType('url');
    } else {
      setImageType('');
    }
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
          setImageType('uploading');

          const image = 'data:' + res.type + ';base64,' + res.data;
          changeDetails('0', image);
        }
      },
    );
  };
  function changeDetails(name, pic) {
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(addBroadcastDetails(BROADCAST_ID, name, pic));
      getData();
    } else {
      Toast.show('Unable to edit', Toast.SHORT);
      checkImageTypeonApiFail();
    }
  }
  function setValues(data) {
    if (data && data.basic_info) {
      setName(data.basic_info.BROADCAST_NAME);
      if (data.basic_info.DISPLAY_PIC != null) {
        setImg(data.basic_info.DISPLAY_PIC);
        setImageType('url');
      } else {
        checkImageTypeonApiFail();
      }
      setFilteredMembers(data.participants);
    } else {
      setGroupData(null);
      checkImageTypeonApiFail();
    }
  }
  function fetchDetails() {
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(getBoadcastDetails(BROADCAST_ID));
    }
  }

  function getData() {
    fetchDetails();
    if (ws && ws.readyState === ws.OPEN) {
      ws.onmessage = e => {
        const data = JSON.parse(e.data);

        if (data.status === 200 && data.data) {
          console.log(data.data);
          setBroadcastDetails(data.data);
          setValues(data.data);
        } else {
          setBroadcastDetails('error');
          checkImageTypeonApiFail();
        }
      };
    } else {
      checkImageTypeonApiFail();
    }
  }
  useEffect(() => {
    return () => {
      dispatch(updateChatList(!detectChanges.changeChatList));
    };
  }, []);
  useEffect(() => {
    getData();
  }, 0);
  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.backIconcontainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="keyboard-backspace"
                type="materialicon"
                size={30}
                color={BaseBackgroundColors.profileColor}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('add-broadcast-members', {
                BROADCAST_ID,
                participants: broadcastDetails.participants,
              });
            }}>
            <Icon
              name="person-add"
              type="material"
              size={30}
              color={BaseBackgroundColors.profileColor}
            />
          </TouchableOpacity>
        </View>

        {broadcastDetails != null &&
          broadcastDetails !== 'error' &&
          !_.isArray(broadcastDetails) && (
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  colors={[BaseBackgroundColors.secondary]}
                  tintColor={BaseBackgroundColors.secondary}
                  refreshing={refreshing}
                  onRefresh={() => {
                    getData();
                  }}
                />
              }>
              <View style={styles.imageContainer}>
                <View style={[styles.profileImageStyle]}>
                  {imageType != '' && imageType !== 'uploading' && (
                    <Image
                      style={styles.profileImageStyle}
                      source={{
                        uri: img,
                      }}
                    />
                  )}

                  {imageType === '' && imageType != 'uploading' && (
                    <View style={styles.profileImageStyle}>
                      <Text style={styles.firstLetter}>
                        {name ? name[0].toUpperCase() : 'S'}
                      </Text>
                    </View>
                  )}
                  {imageType == 'uploading' && (
                    <View style={styles.profileImageStyle}>
                      <ActivityIndicator
                        size={28}
                        color={BaseBackgroundColors.profileColor}
                      />
                    </View>
                  )}
                  {/* {imageType != 'uploading'&& (
                    <View style={styles.addphotoBtnContainer}>
                      <TouchableOpacity
                        onPress={() => pickImageHandler()}
                        style={styles.addphotoBtn}>
                        <Icon
                          name="camera"
                          type="font-awesome"
                          size={22}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>
                  )} */}
                </View>
              </View>
              <View style={styles.nameContainer}>
                <View style={styles.box}>
                  <Text style={styles.name} numberOfLines={2}>
                    {name}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => setModalType('edit-name')}>
                  <Icon
                    name="edit"
                    type="material"
                    size={30}
                    color={BaseBackgroundColors.profileColor}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.listContainer}>
                {!isSearching && (
                  <View style={styles.listHeaderContainer}>
                    <View style={styles.box}>
                      <Text style={styles.listHeaderText}>
                        Participants: {broadcastDetails.participants.length}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles.searchBtn}
                      onPress={() => setIsearching(true)}>
                      <Icon
                        name="search"
                        color={BaseBackgroundColors.profileColor}
                        type="material"
                        size={30}
                      />
                    </TouchableOpacity>
                  </View>
                )}
                {isSearching && (
                  <View style={[styles.searchContainer]}>
                    <SearchBar
                      containerStyle={styles.search}
                      lightTheme
                      placeholder="Search.."
                      inputContainerStyle={{
                        backgroundColor: 'white',
                      }}
                      showCancel={false}
                      value={searchValue}
                      onChangeText={text => {
                        onSearch(text);
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setIsearching(false);
                        setFilteredMembers(broadcastDetails.participants);
                        setSearchValue('');
                      }}
                      style={{
                        padding: 10,
                      }}>
                      <Text
                        style={{
                          color: BaseBackgroundColors.profileColor,
                          fontSize: 16,
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}

                <FlatList
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={() => (
                    <View style={styles.listEmptyContainer}>
                      <Text style={styles.listEmptyText}>
                        No participant available
                      </Text>
                    </View>
                  )}
                  data={filteredMembers}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <ListItem item={item} navigation={navigation} />
                  )}
                />
              </View>
              <TouchableOpacity
                style={styles.exitgroupContainer}
                onPress={() => {}}>
                <Icon
                  name="exit-to-app"
                  color={BaseBackgroundColors.profileColor}
                  type="material"
                  size={30}
                />
                <Text style={styles.exitgroupText}>Delete BroadCast</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        {groupData == null && (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator
              size="large"
              color={BaseBackgroundColors.profileColor}
            />
          </View>
        )}
        {groupData == 'error' && (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              name="error-outline"
              type="material"
              size={70}
              color={BaseBackgroundColors.profileColor}
            />
            <Text
              style={{
                fontSize: 20,
                color: BaseBackgroundColors.profileColor,
                textAlign: 'center',
                marginTop: 20,
              }}>
              Error occured!
            </Text>
          </View>
        )}
      </SafeAreaView>
      <Overlay
        visible={currentModal !== ''}
        onBackdropPress={() => setModalType('')}
        onRequestClose={() => setModalType('')}
        children={
          <BroadcastinfoModals
            name={name}
            setFilteredMembers={members => setFilteredMembers(members)}
            currentModal={currentModal}
            onCancel={() => setModalType('')}
          />
        }
      />
    </>
  );
};
const ListItem = props => {
  const {item, onPress, onLongPress} = props;
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Avatar
        title={!item.image ? item.name[0] : ''}
        rounded
        source={
          item.image
            ? {
                uri: item.image,
              }
            : null
        }
        icon={{name: 'person', size: 28, type: 'material', color: 'white'}}
        avatarStyle={{borderRadius: 150}}
        titleStyle={{fontSize: 40}}
        containerStyle={{backgroundColor: 'lightgrey'}}
        size="medium"
      />
      <View
        style={{
          flexGrow: 1,
          paddingBottom: 10,
          top: 5,
        }}>
        <Text style={styles.listItemTitle} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.message} numberOfLines={1}>
          {item.number}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default BroadcastDetailsScreen;
