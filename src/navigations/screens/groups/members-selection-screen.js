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
import _ from 'lodash';

const MembersSelectionScreen = props => {
  const friends = useSelector(state => state.contacts.contacts.friends);
  const utils = useSelector(state => state.utils);

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
        getName(item)
          .toLowerCase()
          .startsWith(value) ||
        getPhone(item)
          .toLowerCase()
          .includes(value),
    );
    setFilteredFriends(filtering);
  }
  function handleSelect(item) {
    setTemp(!temp);
    let alreadySelected = false;
    let currentSelected = selectedMembers;
    currentSelected.forEach(memebr => {
      if (memebr._id === item._id) {
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
      memebr => memebr._id !== item._id,
    );

    setSelectedMembers(currentSelected);
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
        {...props}
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
                    icon={{name: 'account', type: 'material-community'}}
                    source={item.profileImage ? {uri: item.profileImage} : null}
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
                handleSelect(item);
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
      </ScrollView>
      <FAB
        {...props}
        onPress={() => {
          if (selectedMembers.length === 0) {
            Toast.show('Select atleast one friend!', Toast.SHORT);
          } else {
            props.navigation.navigate('new-group', {
              selectedMembers,
            });
          }
        }}
        iconType={'material-community'}
        iconName="arrow-right"
      />
    </>
  );
};

export default MembersSelectionScreen;
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
