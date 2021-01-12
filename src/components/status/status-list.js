import React from 'react';
import {styles} from '../../styles/status-styles';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {Avatar, Icon} from 'react-native-elements';
import {BaseBackgroundColors} from '../../styles/constants';

const StatusList = ({navigation}) => {
  return (
    <View style={styles.statusListContainer}>
      <TouchableOpacity activeOpacity={0.7} style={styles.headerItem}>
        <View style={styles.headerItemOuterCircle}>
          <View style={styles.headerItemInnerCircle}>
            <Icon
              name={'plus'}
              type="material-community"
              size={32}
              color="white"
            />
          </View>
        </View>
        <Text style={styles.headerItemText}>Add New</Text>
      </TouchableOpacity>
      {stories.length > 0 && (
        <FlatList
          horizontal={true}
          contentContainerStyle={{
            flexDirection: 'row',
            backgroundColor: 'white',
          }}
          showsHorizontalScrollIndicator={false}
          data={stories}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <StoryItem item={item} navigation={navigation} />
          )}
        />
      )}
    </View>
  );
};
const StoryItem = ({item, navigation}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.headerItem}>
      <View style={styles.headerItemOuterCircle}>
        <Avatar
          rounded
          source={
            item.image != ''
              ? {
                  uri: item.image,
                }
              : null
          }
          icon={{
            name: 'photograph',
            type: 'fontisto',
            size: 26,
            color: 'white',
          }}
          avatarStyle={{borderRadius: 150}}
          titleStyle={{fontSize: 40}}
          containerStyle={{
            backgroundColor: BaseBackgroundColors.profileColor,
          }}
          size="medium"
        />
      </View>
      <Text style={styles.headerItemText} numberOfLines={1}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
};
export default StatusList;

const stories = [
  {
    id: '121sws',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    title: 'Posters',
  },
  {
    id: '121ses',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    title: 'Motion Graphics',
  },
  {
    id: '121qws',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    title: 'Video',
  },
  {
    id: '121sas',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    title: 'Posters',
  },
  {
    id: '121dws',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    title: 'Posters',
  },
  {
    id: 'kkskdk',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    title: 'Posters',
  },
  {
    id: '121scbcyws',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    title: 'Posters',
  },
  {
    id: '121scbcyws',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    title: 'Posters',
  },
  {
    id: '121scbcyws',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    title: 'Posters',
  },
  {
    id: '121scbcyws',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    title: 'Posters',
  },
  {
    id: '121scbcyws',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    title: 'Posters',
  },
  {
    id: '121scbcyws',
    image: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    title: 'Posters',
  },
];
