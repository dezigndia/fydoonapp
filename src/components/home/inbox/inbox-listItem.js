import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../../../styles/inbox-styles';
import {Avatar, Badge} from 'react-native-elements';
import moment from 'moment';

export default function InboxListItem(props) {
  const {
    style,
    imageStyle,
    avatarIcon,
    iconName,
    iconType,
    image,
    date,
    txtLeftTitle,
    txtContent,
    txtRight,
    onPress,
    time,
    numberOfmessage,
    isActive,
    onLongPress,
  } = props;

  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={onPress}
      onLongPress={onLongPress}>
      <View>
        <Avatar
          rounded
          icon={
            avatarIcon || image !== null
              ? {name: iconName, size: 28, type: iconType, color: 'white'}
              : null
          }
          source={
            image
              ? {
                  uri: image,
                }
              : null
          }
          avatarStyle={{borderRadius: 150}}
          titleStyle={{fontSize: 40}}
          containerStyle={{bottom: 5, backgroundColor: 'lightgrey'}}
          size="medium"
        />
        {isActive && (
          <Badge
            status="success"
            containerStyle={{
              position: 'absolute',
              bottom: 6,
              right: 0,
              zIndex: 1,
            }}
            badgeStyle={{
              height: 12,
              width: 12,
              borderRadius: 150,
            }}
          />
        )}
      </View>
      <View
        style={{
          flexGrow: 1,
          borderBottomWidth: 0.5,
          borderColor: 'lightgrey',
          paddingBottom: 10,
        }}>
        <View style={styles.listItemTitleContainer}>
          <Text style={styles.listItemTitle} numberOfLines={1}>
            {txtLeftTitle}
          </Text>
          {(date != null || time != null) && (
            <Text
              style={[
                styles.listItemTime,
                {color: numberOfmessage > 0 ? '#4cd964' : 'grey'},
              ]}>
              {date === moment(new Date()).format('MMMM Do YYYY') ? time : date}
            </Text>
          )}
        </View>
        {(txtContent != null || numberOfmessage > 0) && (
          <View style={styles.contentContainer}>
            <Text style={styles.message} numberOfLines={1}>
              {' '}
              {txtContent}
            </Text>

            {numberOfmessage > 0 && (
              <Badge
                value={numberOfmessage > 99 ? '99+' : numberOfmessage}
                status="success"
              />
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}
