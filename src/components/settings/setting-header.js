import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Linking,
} from 'react-native';
import {styles} from '../../styles/setting-styles';
import {BaseBackgroundColors} from '../../styles/constants';
import {Icon, Avatar, Badge} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-community/async-storage';
import {
  setToken,
  checkIsFirstSignup,
  checkIsAccountSetuped,
} from '../../redux/actions/utils-actions';
const SettingHeader = ({navigation}) => {
  const messengerData = useSelector(state => state.messenger);
  const friend = messengerData.currentChatFriend;
  const utils = useSelector(state => state.utils);
  const dispatch = useDispatch();
  async function handleLogOut() {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('firstsignup');
    await AsyncStorage.removeItem('isAccountSetuped');
    dispatch(setToken(null));
    dispatch(checkIsFirstSignup(false));
    dispatch(checkIsAccountSetuped(false));
    navigation.navigate('auth-login');
  }
  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      <View style={styles.headerContianer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="keyboard-backspace"
            type="materialicon"
            size={30}
            color={'white'}
          />
        </TouchableOpacity>

        <View style={styles.headerBtn}>
          <Menu>
            <MenuTrigger>
              <Icon
                name="dots-vertical"
                color={'white'}
                type="material-community"
                size={30}
              />
            </MenuTrigger>

            <MenuOptions style={styles.menu}>
              <MenuOption
                onSelect={() => navigation.navigate('faq')}
                style={styles.menuitem}>
                <Text style={styles.menuitemText}>FAQ</Text>
              </MenuOption>

              <MenuOption
                onSelect={() => navigation.navigate('contact-us')}
                style={styles.menuitem}>
                <Text style={styles.menuitemText}>Contact us</Text>
              </MenuOption>

              <MenuOption
                onSelect={() => {
                  navigation.navigate('privacy');
                }}
                style={styles.menuitem}>
                <Text style={styles.menuitemText}>Privacy Policy</Text>
              </MenuOption>
              <MenuOption
                onSelect={() => navigation.navigate('termsofuse')}
                style={styles.menuitem}>
                <Text style={styles.menuitemText}>Terms of use</Text>
              </MenuOption>
              <MenuOption
                onSelect={() => handleLogOut()}
                style={styles.menuitem}>
                <Text style={styles.menuitemText}>Logout</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </View>
    </>
  );
};
export default SettingHeader;
