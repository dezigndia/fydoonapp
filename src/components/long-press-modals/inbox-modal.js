import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/inbox-modal-styles';
import {Icon, Button} from 'react-native-elements';
import {BaseBackgroundColors} from '../../styles/constants';
const InboxModal = props => {
  return (
    <View style={styles.modalContainer}>
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => props.onDelete(props.item)}>
        <Text style={styles.listItemText}>
          Delete{' '}
          {props.item.type === 'o'
            ? 'chat'
            : props.item.type === 'g'
            ? 'group'
            : 'broadcast'}
        </Text>
      </TouchableOpacity>
      {props.item.type === 'g' && (
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => props.onExitGroup(props.item)}>
          <Text style={styles.listItemText}>Exit group</Text>
        </TouchableOpacity>
      )}
      {props.item.type === 'o' && (
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => props.onReport()}>
          <Text style={styles.listItemText}>Report </Text>
        </TouchableOpacity>
      )}
      {props.item.type === 'o' && false && (
        <TouchableOpacity style={styles.listItem}>
          <Text style={styles.listItemText}>Edit contact </Text>
        </TouchableOpacity>
      )}
      {props.item.type === 'o' && (
        <TouchableOpacity
          style={styles.listItem}
          onPress={() => props.onViewProfile(props.item)}>
          <Text style={styles.listItemText}>View profile </Text>
        </TouchableOpacity>
      )}
      {/* <View style={styles.cancelBtnContainer}>
        <TouchableOpacity
          style={{padding: 10}}
          onPress={() => props.onCancel()}>
          <Icon
            name="times-circle"
            type="font-awesome"
            size={28}
            color={BaseBackgroundColors.profileColor}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};
export default InboxModal;
