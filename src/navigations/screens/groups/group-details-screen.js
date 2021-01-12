import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import {styles} from '../../../styles/group-details-styles';
import {BaseBackgroundColors} from '../../../styles/constants';
import {Icon, Avatar, SearchBar, Image, Overlay} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import GroupinfoModals from '../../../components/groups/modals/group-info-modals';
import {updateChatList} from '../../../redux/actions/detect-changes-actions';
import {useDispatch, useSelector} from 'react-redux';
import {
  addAdmin,
  exitFromGroup,
  getGroupDetails,
} from '../../../websocket-apis/methods';
import _ from 'lodash';
import Toast from 'react-native-simple-toast';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {addGroupDetails} from '../../../websocket-apis/methods';

const GroupDetailsScreen = ({navigation, route}) => {
  const [refreshing] = useState(false);
  const [img, setImg] = useState('');

  const [name, setName] = useState('');
  const [groupData, setGroupData] = useState(null);
  const [isSearching, setIsearching] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [imageType, setImageType] = useState('');

  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const detectChanges = useSelector(state => state.detectChanges);
  const utils = useSelector(state => state.utils);
  const ws = utils.ws;
  const GROUP_ID = route.params.group_id;
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [currentModal, setModalType] = useState('');

  function onSearch(text) {
    setSearchValue(text);
    let value = text.toLowerCase();
    if (value === '') {
      setFilteredMembers(groupData.participants);
      return;
    }
    const filtering = groupData.participants.filter(
      item =>
        item.name.toLowerCase().startsWith(value) ||
        item.phone_number.toLowerCase().startsWith(value),
    );
    setFilteredMembers(filtering);
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
function checkImageTypeonApiFail(){
 
  if(img){
    setImageType('url')
  }else{
    setImageType('')
  }
}
  function fetchDetails() {
    if (ws && ws.readyState === ws.OPEN) {
      //console.log(getGroupDetails(GROUP_ID));
      ws.send(getGroupDetails(GROUP_ID));
    }
  }
  function makeAdmin(item) {
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(addAdmin(GROUP_ID, item.username));
      getData();
    } else {
      Toast.show('Unable to make admin', Toast.SHORT);
    }
  }
  function onExitGroup(userName) {
    if (ws && ws.readyState === ws.OPEN) {
      //console.log(exitFromGroup(GROUP_ID, userName));
      ws.send(exitFromGroup(GROUP_ID, userName));
      if (userDetails.userId === userName) {
        navigation.popToTop();
      } else {
        getData();
      }
    } else {
      Toast.show('Unable to remove', Toast.SHORT);
    }
  }
  function checkIsAdmin() {
    if (
      groupData != null &&
      groupData !== 'error' &&
      !_.isArray(groupData) &&
      groupData.participants
    ) {
      const findMe = groupData.participants.find(
        item => item.username === userDetails.userId,
      );
      if (findMe) {
        return findMe.admin;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  function changeDetails(name, pic) {
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(addGroupDetails(GROUP_ID, name, pic));
      getData();
    } else {
      Toast.show('Unable to edit', Toast.SHORT);
      checkImageTypeonApiFail()
     
    }
  }
  function setValues(data) {
    if (data && data.basic_info) {
      setName(data.basic_info.GROUP_NAME);
      if (data.basic_info.DISPLAY_PIC != null) {
       
        setImg(data.basic_info.DISPLAY_PIC);
        setImageType('url');
      }else{
        checkImageTypeonApiFail()
      }
      setFilteredMembers(data.participants);
    } else {
      setGroupData(null);
      checkImageTypeonApiFail()
    }
  }
  function getData() {
    fetchDetails();
    if (ws && ws.readyState === ws.OPEN) {
      ws.onmessage = e => {
        const data = JSON.parse(e.data);

        if (data.status === 200 && data.data) {
          setGroupData(data.data);
          setValues(data.data);
        } else {
          setGroupData('error');
          checkImageTypeonApiFail()
        }
      };
    } else {
      checkImageTypeonApiFail()
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
        <>
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
            {checkIsAdmin() && (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('add-members', {
                    GROUP_ID: GROUP_ID,
                    getGroupData: getData(),
                    participants: groupData.participants,
                  });
                }}>
                <Icon
                  name="person-add"
                  type="material"
                  size={30}
                  color={BaseBackgroundColors.profileColor}
                />
              </TouchableOpacity>
            )}
          </View>
          {groupData != null && groupData !== 'error' && !_.isArray(groupData) && (
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
                  {imageType != '' && imageType !== 'uploading' &&  (
                    <Image
                      style={styles.profileImageStyle}
                      source={{
                        uri: img
                        
                      }}
                    />
                  )}
                  
                  {imageType === '' && imageType != 'uploading' &&(
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
                  {checkIsAdmin() &&imageType != 'uploading'&& (
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
                  )}
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
                        Participants: {groupData.participants.length}
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
                        setFilteredMembers(groupData.participants);
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
                    <ListItem
                      item={item}
                      userDetails={userDetails}
                      navigation={navigation}
                      checkIsAdmin={checkIsAdmin}
                      makeAdmin={makeAdmin}
                      onExitGroup={onExitGroup}
                    />
                  )}
                />
              </View>
              <TouchableOpacity
                style={styles.exitgroupContainer}
                onPress={() => {
                  onExitGroup(userDetails.userId);
                }}>
                <Icon
                  name="exit-to-app"
                  color={BaseBackgroundColors.profileColor}
                  type="material"
                  size={30}
                />
                <Text style={styles.exitgroupText}>Exit group</Text>
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
        </>
      </SafeAreaView>
      <Overlay
        visible={currentModal !== ''}
        onBackdropPress={() => setModalType('')}
        onRequestClose={() => setModalType('')}
        children={
          <GroupinfoModals
            name={name}
            currentModal={currentModal}
            onCancel={() => setModalType('')}
            onSubmit={name => {
              changeDetails(name, '0');
              setModalType('');
            }}
          />
        }
      />
    </>
  );
};
const ListItem = props => {
  const {
    item,
    makeAdmin,
    onExitGroup,
    checkIsAdmin,
    navigation,
    userDetails,
  } = props;

  return (
    <>
      {item.username == userDetails.userId && <RenderItem {...item} />}
      {item.username != userDetails.userId && (
        <Menu>
          <MenuTrigger>
            <RenderItem {...item} />
          </MenuTrigger>
          <MenuOptions style={styles.menuoptions}>
            <MenuOption
              onSelect={() => {
                navigation.navigate('friend-profile', {
                  friendId: item.username,
                });
              }}
              style={styles.menuitem}>
              <Text style={styles.menuitemText}>View {item.name}</Text>
            </MenuOption>
            {checkIsAdmin() && !item.admin && (
              <MenuOption
                onSelect={() => {
                  makeAdmin(item);
                }}
                style={styles.menuitem}>
                <Text style={styles.menuitemText}>Make group admin</Text>
              </MenuOption>
            )}
            {checkIsAdmin() && (
              <MenuOption
                onSelect={() => {
                  onExitGroup(item.username);
                }}
                style={styles.menuitem}>
                <Text style={styles.menuitemText}>Remove {item.name}</Text>
              </MenuOption>
            )}
          </MenuOptions>
        </Menu>
      )}
    </>
  );
};
const RenderItem = item => {
  return (
    <View style={styles.listItem}>
      <Avatar
        rounded
        icon={{name: 'person', size: 28, type: 'material', color: 'white'}}
        source={
          item.profile_pic
            ? {
                uri: item.profile_pic,
              }
            : null
        }
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
          {item.phone_number}
        </Text>
      </View>
      <View style={styles.listRightContainer}>
        {item.admin && (
          <View style={styles.adminContainer}>
            <Text style={styles.adminText}>admin</Text>
          </View>
        )}
      </View>
    </View>
  );
};
export default GroupDetailsScreen;
