import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/follower-styles';
import {Avatar, Icon, Button} from 'react-native-elements';
import {BaseBackgroundColors} from '../../styles/constants';

const FollowerItem = ({item, type, navigation}) => {
  return (
    <View style={styles.followerItemContainer}>
      <View style={styles.crossBtnContainer}>
        <TouchableOpacity style={styles.crossBtn}>
          <Icon
            name={'close'}
            type="material-community"
            size={28}
            color={BaseBackgroundColors.profileColor}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity activeOpacity={0.8}>
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
            name: 'person',
            type: 'material',
            size: 50,
            color: 'white',
          }}
          avatarStyle={{borderRadius: 150}}
          titleStyle={{fontSize: 40}}
          containerStyle={[styles.image]}
        />
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.place} numberOfLines={1}>
          {item.place}
        </Text>
      </TouchableOpacity>
      <Button
        title={type == 'suggestion' ? 'Follow' : 'Unfollow'}
        containerStyle={styles.followBtnContianer}
        buttonStyle={styles.followBtn}
      />
    </View>
  );
};
export default FollowerItem;
