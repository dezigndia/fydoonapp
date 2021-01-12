import React from 'react';
import {styles} from '../../styles/live-chat-styles';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import {Image, Avatar, Icon} from 'react-native-elements';
import {BaseBackgroundColors} from '../../styles/constants';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

const LiveChatHeader = props => {
  const image = 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY';
  const name = 'hjhjhsds';
  return (
    <View style={styles.headerContainer}>
      {/* <TouchableOpacity activeOpacity={0.7} style={styles.headerItem}>
        <View style={styles.headerItemOuterCircle}>
          <Avatar
            title={image !== '' ? name[0] : ''}
            rounded
            source={
              image != ''
                ? {
                    uri: image,
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
            containerStyle={{
              backgroundColor: BaseBackgroundColors.profileColor,
            }}
            size="medium"
          />
        </View>
        <Text style={styles.headerItemText}>Prefered</Text>
      </TouchableOpacity>
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
        <Text style={styles.headerItemText}>Options</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={styles.backButton}>
        <Icon
          name="keyboard-backspace"
          type="materialicon"
          size={30}
          color={BaseBackgroundColors.profileColor}
        />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Live Chat</Text>

      <Menu style={styles.threeDotBtn}>
        <MenuTrigger>
          <Icon
            name="dots-vertical"
            color={BaseBackgroundColors.profileColor}
            type="material-community"
            size={30}
          />
        </MenuTrigger>

        <MenuOptions
          optionsContainerStyle={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            width: 150,
          }}>
          <MenuOption
            onSelect={() => Alert.alert(`SwitchIn`, 'Comming Soon')}
            style={styles.headerMenuitem}>
            <View style={styles.headerItemOuterCircle}>
              <Avatar
                rounded
                source={
                  image != ''
                    ? {
                        uri: image,
                      }
                    : null
                }
                icon={{
                  name: 'account-group',
                  type: 'material-community',
                  size: 22,
                  color: 'white',
                }}
                avatarStyle={{borderRadius: 150}}
                titleStyle={{fontSize: 22}}
                containerStyle={{
                  backgroundColor: BaseBackgroundColors.profileColor,
                }}
                size="small"
              />
            </View>
            <Text style={styles.headerItemText}>Prefered</Text>
          </MenuOption>
          <MenuOption
            onSelect={() => props.navigation.navigate('live-chat-options')}
            style={styles.headerMenuitem}>
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
            <Text style={styles.headerItemText}>Options</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};
export default LiveChatHeader;
