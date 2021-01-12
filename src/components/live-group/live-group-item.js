import React from 'react';
import {styles} from '../../styles/live-group-styles';
import {View, Text, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import {BaseBackgroundColors} from '../../styles/constants';

const LiveGroupItem = props => {
  const {item, onPress, onLongPress} = props;
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Avatar
        title={!item.image ? item.name[0] : ''}
        rounded
        source={
          item.image
            ? {
                uri: item.image,
              }
            : null
        }
        icon={{
          name: 'account-group',
          type: 'material-community',
          size: 28,
          color: 'white',
        }}
        avatarStyle={{borderRadius: 150}}
        titleStyle={{fontSize: 40}}
        containerStyle={{backgroundColor: 'lightgrey'}}
        size="medium"
      />
      <View
        style={{
          flexGrow: 1,
          paddingBottom: 10,
          top: 5,
        }}>
        <Text style={styles.listItemTitle} numberOfLines={1}>
          {item.name}
        </Text>
        {item.last_message != null && (
          <Text style={styles.message} numberOfLines={1}>
            {item.last_message.user}:{' ' + item.last_message.message}
          </Text>
        )}
      </View>
      <View style={styles.listRightContainer}>
        {item.last_message != null && (
          <Text
            style={[
              styles.listItemTime,
              {
                color:
                  item.uread_meassages > 0
                    ? BaseBackgroundColors.profileColor
                    : 'grey',
              },
            ]}>
            {item.last_message.time}
          </Text>
        )}
        {item.uread_meassages > 0 && (
          <View
            style={[
              styles.unreadBadge,
              {
                width: item.uread_meassages <= 9 ? 25 : 30,
                height: item.uread_meassages <= 9 ? 25 : 30,
              },
            ]}>
            <Text style={styles.unreadBadgeText}>
              {item.uread_meassages > 99 ? '99+' : item.uread_meassages}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default LiveGroupItem;
