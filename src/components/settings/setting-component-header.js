import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/setting-component-styles';
import {Icon} from 'react-native-elements';
import {BaseBackgroundColors} from '../../styles/constants';
const SettingComponentHeader = ({navigation, title}) => {
  return (
    <>
      <View style={styles.headerContianer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}>
          <Icon
            name="keyboard-backspace"
            type="materialicon"
            size={30}
            color={BaseBackgroundColors.profileColor}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{title}</Text>
        <View />
      </View>
    </>
  );
};
export default SettingComponentHeader;
