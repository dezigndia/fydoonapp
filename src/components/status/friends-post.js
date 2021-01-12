import React from 'react';
import {styles} from '../../styles/status-styles';
import {FlatList, View, Text} from 'react-native';
import PostItem from '../posts/post-item';

const FriendsPost = ({navigation}) => {
  return (
    <View style={styles.activityContainer}>
      <Text style={styles.activityText}>Activity</Text>
      <FlatList
        data={ativities}
        contentContainerStyle={{
          backgroundColor: 'white',
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.listEmptyContainer}>
            <Text style={styles.listEmptyText}>No Activity Avaialable</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <PostItem item={item} navigation={navigation} />
        )}
      />
    </View>
  );
};
const ativities = [
  {
    id: 'rerrer',
    profile_pic: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    name: 'Vikram',
    type: 'photo',
    date: '15 April at 3:43 PM',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    liked_list: [
      {
        user_id: '121212',
        name: 'Shushat',
        profile_pic: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
      },
      {
        user_id: '12231212',
        name: 'Adarhsh',
        profile_pic: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
      },
      {
        user_id: '12211212',
        name: 'Vishal',
        profile_pic: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
      },
    ],
  },
  {
    id: 'rerrer',
    profile_pic: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    name: 'Vikram',
    type: 'photo',
    date: '15 April at 3:43 PM',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    liked_list: [
      {
        user_id: '121212',
        name: 'Shushat',
        profile_pic: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
      },
      {
        user_id: '12231212',
        name: 'Adarhsh',
        profile_pic: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
      },
      {
        user_id: '12211212',
        name: 'Vishal',
        profile_pic: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
      },
    ],
  },
  {
    id: 'rerrer',
    profile_pic: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    name: 'Vikram',
    type: 'photo',
    date: '15 April at 3:43 PM',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    liked_list: [
      {
        user_id: '121212',
        name: 'Shushat',
        profile_pic: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
      },
      {
        user_id: '12231212',
        name: 'Adarhsh',
        profile_pic: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
      },
      {
        user_id: '12211212',
        name: 'Vishal',
        profile_pic: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
      },
    ],
  },
  {
    id: 'rerrer',
    profile_pic: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    name: 'Vikram',
    type: 'photo',
    date: '15 April at 3:43 PM',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    liked_list: [
      {
        user_id: '121212',
        name: 'Shushat',
        profile_pic: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
      },
      {
        user_id: '12231212',
        name: 'Adarhsh',
        profile_pic: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
      },
      {
        user_id: '12211212',
        name: 'Vishal',
        profile_pic: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
      },
    ],
  },
];
export default FriendsPost;
