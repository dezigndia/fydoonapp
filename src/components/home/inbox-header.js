import React from 'react';
import {View, TouchableOpacity, TextInput} from 'react-native';
import {styles} from '../../styles/inbox-header-styles';
import {Icon, Badge} from 'react-native-elements';
import {BaseBackgroundColors} from '../../styles/constants';

const InboxHeader = () => {
  const numerOfmessages = 21;
  return (
    <View style={styles.headerContianer}>
      <TouchableOpacity>
        <Icon
          name="message-reply"
          color={BaseBackgroundColors.secondary}
          type="material-community"
          size={35}
        />
        {numerOfmessages > 0 && (
          <Badge
            value={numerOfmessages > 99 ? '99+' : numerOfmessages}
            status="success"
            containerStyle={{position: 'absolute', top: -4, right: -4}}
          />
        )}
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Search" style={styles.input} />
        <TouchableOpacity>
          <Icon
            name="search"
            color={BaseBackgroundColors.secondary}
            size={25}
            style={styles.inputIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.notificationBtn}>
        <Icon
          name="bell-ring"
          color={BaseBackgroundColors.secondary}
          type="material-community"
          size={35}
        />
      </TouchableOpacity>
    </View>
  );
};
export default InboxHeader;
