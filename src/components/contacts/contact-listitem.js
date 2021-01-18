import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/contact-styles';
import {Avatar, Icon} from 'react-native-elements';
import {BaseBackgroundColors} from '../../styles/constants';

export default function ContactListItem(props) {
  let {
    style,
    avatarStyle,
    iconName,
    image,
    txtLeftTitle,
    iconType,
    txtContent,
    txtRight,
    onPress,
    isFriend,
    onPressChat,
    iconColor,
  } = props;

  if (!txtContent) {
    txtContent = '';
  }
  if (!txtRight) {
    txtRight = '';
  }
  return (
    <View style={styles.listContaner}>
      <TouchableOpacity style={[styles.listItem]} onPress={onPress}>
        <View>
          <Avatar
            title={!iconName && !image ? txtLeftTitle[0] : null}
            rounded
            icon={{name: iconName, size: 28, type: iconType}}
            source={
              image
                ? {
                    uri: image,
                  }
                : null
            }
            avatarStyle={[{borderRadius: 150}]}
            titleStyle={{fontSize: 40, color: 'white'}}
            containerStyle={[
              {bottom: 5, height: 40, width: 40, borderRadius: 150},
              avatarStyle,
              iconColor ? {backgroundColor: iconColor} : null,
            ]}
          />
        </View>
        <View
          style={{
            flexGrow: 1,
            paddingBottom: 10,
          }}>
          <View style={styles.listItemTitleContainer}>
            <Text style={styles.listItemTitle} numberOfLines={1}>
              {txtLeftTitle}
            </Text>
            {txtRight !== '' && (
              <Text style={styles.listItemTime}>{txtRight}</Text>
            )}
          </View>
          {txtContent !== '' && (
            <View style={styles.contentContainer}>
              <Text style={styles.message} numberOfLines={1}>
                {' '}
                {txtContent}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
      {isFriend && onPressChat != null && (
        <TouchableOpacity style={styles.chatButton} onPress={onPressChat}>
          <Icon
            name="android-messages"
            type={'material-community'}
            color={BaseBackgroundColors.profileColor}
            size={28}
          />
          <Text style={styles.chatButtonTxt}>Chat</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
