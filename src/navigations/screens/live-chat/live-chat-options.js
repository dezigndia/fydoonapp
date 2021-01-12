import React, {useState} from 'react';
import {BaseBackgroundColors} from '../../../styles/constants';
import SettingComponentHeader from '../../../components/settings/setting-component-header';
import {
  Text,
  ScrollView,
  SafeAreaView,
  FlatList,
  StatusBar,
  View,
  Dimensions,
} from 'react-native';
import {styles} from '../../../styles/live-chat-styles';
import {Icon, Slider} from 'react-native-elements';
import InboxListItem from '../../../components/home/inbox/inbox-listItem';

const LiveChatOptions = ({navigation}) => {
  const [radius, setRadius] = useState(10);
  const [filteredGroups, setFilteredGdroups] = useState(Groups);
  const left = (radius * (Dimensions.get('window').width - 60)) / 50 - 10;
  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      <SafeAreaView style={styles.mainContainer}>
        <SettingComponentHeader
          title="Live Chat Options"
          navigation={navigation}
        />
        <ScrollView
          style={{paddingHorizontal: 10}}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <Text style={{fontSize: 16, marginVertical: 10}}>
              Select Radius from your Location
            </Text>

            <Text style={{width: 50, textAlign: 'center', left: left}}>
              {Math.floor(radius)}km
            </Text>
            <Slider
              animateTransitions={true}
              maximumTrackTintColor={'lightgrey'}
              minimumTrackTintColor={'lightgrey'}
              allowTouchTrack={true}
              maximumValue={50}
              minimumValue={0}
              step={1}
              trackStyle={{backgroundColor: 'lightgrey'}}
              value={radius}
              onValueChange={value => setRadius(value)}
              thumbTintColor={BaseBackgroundColors.profileColor}
            />
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text>0km</Text>
              <Text>50km</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <Text style={{fontSize: 16, color: 'grey'}}>Group Results</Text>
              <View
                style={{
                  height: 1,
                  flexGrow: 1,
                  backgroundColor: BaseBackgroundColors.profileColor,
                  marginLeft: 20,
                }}
              />
            </View>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={styles.listEmptyContainer}>
                <Text style={styles.listEmptyText}>No Group Available</Text>
              </View>
            )}
            data={filteredGroups}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <>
                <InboxListItem
                  onPress={() => {}}
                  onLongPress={() => {}}
                  image={item.image}
                  txtLeftTitle={item.name}
                  avatarIcon={true}
                  iconName={'account-group'}
                  iconType={'material-community'}
                />
              </>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
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
export default LiveChatOptions;
