import React from 'react';
import {styles} from '../../styles/follower-styles';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import FollowerItem from './follower-item';

const Follower = ({navigation, type}) => {
  return (
    <View style={styles.followerContainer}>
      <View style={styles.typeContainer}>
        <View>
          <Text style={styles.typeText}>
            {type === 'suggestion' ? 'Suggested for you' : 'Your followers'}
          </Text>
        </View>
        <TouchableOpacity style={styles.seeAllContianer}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={follower_list}
        horizontal={follower_list.length !== 0 ? true : false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={styles.listEmptyContainer}>
            <Text style={styles.listEmptyText}>
              No {type === 'suggestion' ? 'Suggestion ' : 'Follower '} Available
            </Text>
          </View>
        )}
        renderItem={({item, index}) => <FollowerItem item={item} type={type} />}
      />
    </View>
  );
};

const follower_list = [
  {
    id: '2133',
    name: 'namritamalla',
    place: 'Agra',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    id: '21wew33',
    name: 'namritamalla',
    place: 'Agra',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    id: '21q3233',
    name: 'namritamalla',
    place: 'Agra',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },

  {
    id: '2133233',
    name: 'namritamalla',
    place: 'Agra',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    id: '212133',
    name: 'namritamalla',
    place: 'Agra',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
];
export default Follower;
