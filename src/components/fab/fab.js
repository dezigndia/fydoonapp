import React from 'react';
import {styles} from '../../styles/fab-styles';
import {Button, Icon} from 'react-native-elements';
import {TouchableOpacity, View, ActivityIndicator} from 'react-native';
import {color} from 'react-native-reanimated';

const FAB = ({
  onPress,
  style,
  iconType,
  iconName,
  iconSize,
  loading,
  iconStyle,
}) => {
  return (
    <View style={[styles.fabContainer, style]}>
      <Button
        onPress={onPress}
        containerStyle={styles.fabBtn}
        buttonStyle={styles.fabBgClr}
        icon={
          loading ? (
            <ActivityIndicator
              color="white"
              size={iconSize}
              style={{padding: 8}}
            />
          ) : (
            <Icon
              name={iconName}
              type={iconType}
              size={iconSize}
              color="white"
              style={[{padding: 8}]}
            />
          )
        }
      />
    </View>
  );
};
export default FAB;
