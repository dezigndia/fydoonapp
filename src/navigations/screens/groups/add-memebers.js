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
  TouchableOpacity,
} from 'react-native';
import logo from '../../../assets/images/main.jpg';
import {BaseBackgroundColors} from '../../../styles/constants';
import {styles} from '../../../styles/contact-styles';
import ContactListItem from '../../../components/contacts/contact-listitem';
import {useSelector, useDispatch} from 'react-redux';
import NewGroupHeader from '../../../components/groups/new-group-header';
import {SearchBar, Avatar, Badge, Icon} from 'react-native-elements';
import FAB from '../../../components/fab/fab';
import Toast from 'react-native-simple-toast';
import {
  addGroupParticipants,
  getGroupDetails,
} from '../../../websocket-apis/methods';

const AddMemberScreen = ({navigation, route}) => {
  const friends = useSelector(state => state.contacts.contacts.friends);
  const utils = useSelector(state => state.utils);
  const ws = utils.ws;
  const [search, setSearch] = useState('');
  const [filteredFriends, setFilteredFriends] = useState(friends);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [temp, setTemp] = useState(false);
  function handleSearch(text) {
    setSearch(text);
    let value = text.toLowerCase();
    if (value === '') {
      setFilteredFriends(friends);
      return;
    }
    const filtering = friends.filter(
      item =>
        item.database_name.toLowerCase().startsWith(value) ||
        item.phone_number.toLowerCase().startsWith(value),
    );
    setFilteredFriends(filtering);
  }
  function handleSelect(item) {
    setTemp(!temp);
    let alreadySelected = false;
    let currentSelected = selectedMembers;
    currentSelected.forEach(memebr => {
      if (memebr.username === item.username) {
        alreadySelected = true;
      }
    });

    if (!alreadySelected) {
      currentSelected.push(item);
      setSelectedMembers(currentSelected);
    }
  }
  function handleRemove(item) {
    let currentSelected = selectedMembers.filter(
      memebr => memebr.username !== item.username,
    );

    setSelectedMembers(currentSelected);
  }
  function isAlreadyPresent(userName) {
    const participants = route.params.participants;
    const person = participants.find(item => item.username === userName);
    if (person) {
      return true;
    } else {
      return false;
    }
  }
  function handleAddMemebers() {
    if (selectedMembers.length > 0) {
      const GROUP_ID = route.params.GROUP_ID;

      let newParticipantsArray = [];
      selectedMembers.forEach(item => {
        newParticipantsArray.push(item.username);
      });
      const newParticipants = newParticipantsArray.join(',');
      if (ws && ws.readyState === ws.OPEN) {
        ws.send(addGroupParticipants(GROUP_ID, newParticipants));

        ws.send(getGroupDetails(GROUP_ID));

        navigation.goBack();
      } else {
        Toast.show('Unable to add', Toast.SHORT);
      }
    } else {
      Toast.show('Please select member', Toast.SHORT);
    }
  }
  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      <NewGroupHeader
        title="Select Members"
        searchValue={search}
        showSearch={true}
        onSearch={text => handleSearch(text)}
        onCancel={() => {
          setFilteredFriends(friends);
          setSearch('');
        }}
        navigation={navigation}
      />

      <ScrollView
        style={[
          styles.mainContainer,
          {paddingTop: 20, backgroundColor: 'white'},
        ]}
        showsVerticalScrollIndicator={false}>
        {selectedMembers.length > 0 && (
          <>
            <View style={styles.friendListTitleContanier}>
              <Text style={styles.friendListTitle}>Selected Members</Text>
              <View style={styles.hrLine} />
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
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
                  <View
                    style={{
                      position: 'absolute',
                      right: -8,
                      top: 45,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        handleRemove(item);
                      }}
                      style={{
                        borderRadius: 150,
                        backgroundColor: 'grey',
                        borderWidth: 2,
                        borderColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 28,
                        height: 28,
                      }}>
                      <Icon
                        name="times"
                        type="font-awesome"
                        size={18}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </>
        )}
        <View style={styles.friendListTitleContanier}>
          <Text style={styles.friendListTitle}>My Friends</Text>
          <View style={styles.hrLine} />
        </View>
        <FlatList
          ListEmptyComponent={() => (
            <>
              {search !== '' && (
                <View style={styles.listEmptyContainer}>
                  <Text style={styles.listEmptyText}>No friend found</Text>
                </View>
              )}
              {search === '' && (
                <View style={styles.listEmptyContainer}>
                  <Text style={styles.listEmptyText}>You have no friends</Text>
                </View>
              )}
            </>
          )}
          data={filteredFriends}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <ContactListItem
              onPress={() => {
                if (!isAlreadyPresent(item.username)) {
                  handleSelect(item);
                }
              }}
              iconName={'account'}
              iconType={'material-community'}
              image={item.profile_pic !== '' ? item.profile_pic : null}
              txtLeftTitle={
                item.database_name.trim() !== ''
                  ? item.database_name
                  : item.name
              }
              txtContent={
                isAlreadyPresent(item.username)
                  ? 'Already present'
                  : item.phone_number
              }
              avatarStyle={styles.avatarStyle}
            />
          )}
        />
      </ScrollView>
      <FAB
        onPress={() => {
          handleAddMemebers();
        }}
        iconType={'material'}
        iconName="done"
      />
    </>
  );
};

export default AddMemberScreen;
