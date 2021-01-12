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
import FeaturedListItem from '../../../components/live-group/featured-list-item';
import LiveGroupItem from '../../../components/live-group/live-group-item';
import LivGroupHeader from '../../../components/live-group/live-group-header';
import InboxListItem from '../../../components/home/inbox/inbox-listItem';

const LiveGroupScreen = props => {
  const [refreshing] = useState(false);
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
          <LivGroupHeader {...props} />
          <FlatList
            style={styles.featuredListContainer}
            horizontal={filteredFeaturedgroups.length > 0 ? true : false}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={styles.listEmptyContainer}>
                <Text style={styles.listEmptyText}>No Group Available</Text>
              </View>
            )}
            data={filteredFeaturedgroups}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({item, index}) => (
              <FeaturedListItem
                onPress={() => {}}
                onLongPress={() => {}}
                item={item}
              />
            )}
          />
          <View style={styles.hrline} />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.mygroupContainer}
            onPress={() => props.navigation.navigate('my-groups')}>
            <View style={styles.mygroupBtn}>
              <Icon
                name={'account-group'}
                type="material-community"
                size={32}
                color={'white'}
              />
            </View>
            <Text style={styles.mygroupTxt}>My Groups</Text>
          </TouchableOpacity>
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
                {/* <LiveGroupItem
                 onPress={() => {}}
                 onLongPress={() => {}}
                 item={item}
               /> */}
                <InboxListItem
                  onPress={() => {}}
                  onLongPress={() => {}}
                  date={item.last_message.date}
                  image={item.image}
                  txtLeftTitle={item.name}
                  txtContent={
                    item.last_message.user + ': ' + item.last_message.message
                  }
                  avatarIcon={true}
                  txtRight={item.last_message.date}
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

export default LiveGroupScreen;

const filteredGroups = [
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
    name: 'A Group',
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
    name: 'A Group',
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
    name: 'A Group',
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

const filteredFeaturedgroups = [
  {
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    name: 'Featured group name',
    id: '12121',
    members: '123',
    likes: '122122',
    place: 'Austraddddddlia sjjshhj jk',
    isLiked: false,
  },
  {
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    name: 'Featured group name',
    id: '12w121',
    members: '3333123322',
    likes: '1221',
    place: 'Australia sjjshhj jk',
    isLiked: false,
  },
  {
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    name: 'Featured group name',
    id: '121wq21',
    members: '123322',
    likes: '122',
    place: 'Australia sjjshhj jk',
    isLiked: false,
  },
  {
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    name: 'Featured group name',
    id: '121221',
    members: '123322',
    likes: '1221',
    place: 'Australia sjjshhj jk',
    isLiked: true,
  },
  {
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    name: 'Featured group name',
    id: '123121',
    members: '123322',
    likes: '1221',
    place: 'Australia sjjshhj jk',
    isLiked: false,
  },
];
