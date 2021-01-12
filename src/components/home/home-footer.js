import React, {useRef} from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import {styles} from '../../styles/home-footer-styles';
import {Icon} from 'react-native-elements';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-community/async-storage';
import {useDispatch} from 'react-redux';
import {
  checkIsAccountSetuped,
  checkIsFirstSignup,
  setToken,
} from '../../redux/actions/utils-actions';
const HomeFooter = ({navigation}) => {
  const dispatch = useDispatch();
  async function handleLogOut() {
    Alert.alert('Alert', 'Do you really want to logout?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: async () => {
          await AsyncStorage.removeItem('token');
          await AsyncStorage.removeItem('firstsignup');
          await AsyncStorage.removeItem('isAccountSetuped');
          dispatch(setToken(null));
          dispatch(checkIsFirstSignup(false));
          dispatch(checkIsAccountSetuped(false));
          navigation.navigate('auth-login');
        },
      },
    ]);
  }
  return (
    <>
      <KeyboardAvoidingView style={styles.headerContianer} behavior="height">
        <Text style={styles.appTitle}>Fydoon</Text>

        {/* <TextInput style={styles.input} placeholderTextColor="white" /> */}
        <View style={{flexGrow: 1}} />
        {/* <TouchableOpacity>
          <Icon
            name="search"
            color={'white'}
            size={30}
            style={styles.inputIcon}
          />
        </TouchableOpacity> */}

        <View style={styles.notificationBtn}>
          <Menu>
            <MenuTrigger>
              <Icon
                name="dots-vertical"
                color={'white'}
                type="material-community"
                size={35}
              />
            </MenuTrigger>
            <MenuOptions style={styles.menu}>
              <MenuOption
                onSelect={() => handleLogOut()}
                style={styles.menuitem}>
                <Text style={styles.menuitemText}>Logout </Text>
              </MenuOption>
              {/* <MenuOption
                onSelect={() => navigation.navigate('broadcasts')}
                style={styles.menuitem}>
                <Text style={styles.menuitemText}>Broadcast List</Text>
              </MenuOption> */}
              {/* <MenuOption
                onSelect={() => navigation.navigate('settings')}
                style={styles.menuitem}>
                <Text style={styles.menuitemText}>Settings</Text>
              </MenuOption> */}

              {/* <MenuOption
                onSelect={() => navigation.navigate('feedback')}
                style={styles.menuitem}>
                <Text style={styles.menuitemText}>Feedback</Text>
              </MenuOption> */}

              {/* <MenuOption
                onSelect={() => alert(`SwitchIn`, 'Comming soon')}
                style={styles.menuitem}>
                <Text style={styles.menuitemText}>Advertisement</Text>
              </MenuOption> */}

              {/* <MenuOption
                onSelect={() => alert(`SwitchIn`, 'Comming soon')}
                style={styles.menuitem}>
                <Text style={styles.menuitemText}>Share</Text>
              </MenuOption> */}
            </MenuOptions>
          </Menu>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
export default HomeFooter;
