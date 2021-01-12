import React, {useState} from 'react';
import {
  StatusBar,
  SafeAreaView,
  View,
  Text,
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {BaseBackgroundColors} from '../../../styles/constants';
import {styles} from '../../../styles/live-group-styles';
import {Icon} from 'react-native-elements';
import FAB from '../../../components/fab/fab';
import InboxListItem from '../../../components/home/inbox/inbox-listItem';
import MyGroupHeader from '../../../components/live-group/my-group-header';

const MyGroupScreen = props => {
  const [refreshing] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredGroups, setFilteredGroups] = useState(Groups);
  function handleSearch(text) {
    setSearch(text);
    let value = text.toLowerCase();
    if (value === '') {
      setFilteredGroups(Groups);
      return;
    }
    const filtering = Groups.filter(item =>
      item.name.toLowerCase().startsWith(value),
    );
    setFilteredGroups(filtering);
  }
  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView
          style={styles.mainContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={[BaseBackgroundColors.secondary]}
              tintColor={BaseBackgroundColors.secondary}
              refreshing={refreshing}
              onRefresh={() => {}}
            />
          }>
          <MyGroupHeader
            {...props}
            title="My Groups"
            searchValue={search}
            onSearch={text => handleSearch(text)}
            onCancel={() => {
              setFilteredGroups(Groups);
              setSearch('');
            }}
          />

          <FlatList
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={styles.listEmptyContainer}>
                <Text style={styles.listEmptyText}>No Group Available</Text>
              </View>
            )}
            data={filteredGroups}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({item, index}) => (
              <>
                <InboxListItem
                  onPress={() => {}}
                  onLongPress={() => {}}
                  date={item.last_message.date}
                  image={item.image}
                  txtLeftTitle={item.name}
                  txtContent={
                    item.last_message.user + ': ' + item.last_message.message
                  }
                  txtRight={item.last_message.date}
                  avatarIcon={true}
                  iconName={'account-group'}
                  iconType={'material-community'}
                  time={item.last_message.time}
                  numberOfmessage={item.uread_meassages}
                />
              </>
            )}
          />
        </ScrollView>
        <FAB
          {...props}
          onPress={() => {}}
          iconType={'material-community'}
          iconName="plus"
        />
      </SafeAreaView>
    </>
  );
};

export default MyGroupScreen;
const Groups = [
  {
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    id: 'saesjh',
    name: 'A Group',
    uread_meassages: 1,
    last_message: {
      user: 'Kapil',
      message: 'dshgshfghfh',
      time: '9:04 AM',
      date: 'August 24th 2020',
      userName: 'sdsjdkdjksdjskj',
    },
  },
  {
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    id: 'sawswjh',
    name: 'A Group',
    uread_meassages: 99,
    last_message: {
      user: 'Kapil',
      message: 'dshgshfghfh',
      time: '9:04 AM',
      date: 'August 24th 2020',
      userName: 'sdsjdkdjksdjskj',
    },
  },
  {
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    id: 'saaewsjh',
    name: 'A Group',
    uread_meassages: 101,
    last_message: {
      user: 'Kapil',
      message: 'dshgshfghfh',
      date: 'August 24th 2020',
      time: '9:04 AM',
      username: 'sdsjdkdjksdjskj',
    },
  },
  {
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    id: 'saaesjh',
    name: 'Group',
    uread_meassages: 89,
    last_message: {
      user: 'Kapil',
      message: 'dshgshfghfh',
      time: '9:04 AM',
      date: 'August 24th 2020',
      username: 'sdsjdkdjksdjskj',
    },
  },
  {
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    id: 'sasasjh',
    name: 'SAAAS',
    uread_meassages: 12345678,
    last_message: {
      user: 'Kapil',
      message: 'dshgshfghfh',
      time: '9:04 AM',
      date: 'August 24th 2020',
      username: 'sdsjdkdjksdjskj',
    },
  },
  {
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    id: 'sadasjh',
    name: 'KIte',
    uread_meassages: 0,
    last_message: {
      user: 'Kapil',
      message: 'dshgshfghfh',
      time: '9:04 AM',
      date: 'August 24th 2020',
      username: 'sdsjdkdjksdjskj',
    },
  },
];
