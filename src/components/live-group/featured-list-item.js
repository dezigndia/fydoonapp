import React from 'react';
import {TouchableOpacity, View, Text, ActivityIndicator} from 'react-native';
import {Image, Avatar, Icon} from 'react-native-elements';

import {styles} from '../../styles/live-group-styles';
import {BaseBackgroundColors} from '../../styles/constants';
const FeaturedListItem = props => {
  const {item} = props;
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.featuredItemContainer}>
      <Image
        source={{uri: item.image}}
        style={styles.featuredItemImage}
        // PlaceholderContent={
        //   <ActivityIndicator color={BaseBackgroundColors.profileColor} />
        // }
      />
      <View style={styles.heartBtnContainer}>
        <TouchableOpacity>
          <Icon
            name={'heart'}
            type={'material-community'}
            size={18}
            color={!item.isLiked ? 'white' : BaseBackgroundColors.profileColor}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.featuredItemDetailsContainer}>
        <Text numberOfLines={1} style={styles.featuredItemName}>
          {item.name}
        </Text>
        <View style={styles.featuredItemDetailsNumberContainer}>
          <View style={[styles.smallItem, {marginRight: 5}]}>
            <Icon
              name={'people'}
              type={'material'}
              size={16}
              color={'lightgreen'}
            />
            <View>
              <Text numberOfLines={1} style={styles.featuredItemtext}>
                {item.members}
              </Text>
            </View>
          </View>

          <View style={[styles.smallItem, {marginLeft: 5}]}>
            <Icon
              name={'heart'}
              type={'material-community'}
              size={16}
              color={BaseBackgroundColors.profileColor}
            />

            <Text numberOfLines={1} style={styles.featuredItemtext}>
              {item.likes}
            </Text>
          </View>
        </View>
        <View style={styles.smallItem}>
          <Icon name={'place'} type={'material'} size={16} color={'orange'} />
          <Text numberOfLines={1} style={styles.featuredItemtext}>
            {item.place}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FeaturedListItem;
