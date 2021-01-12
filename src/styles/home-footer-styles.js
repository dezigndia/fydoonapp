import {StyleSheet} from 'react-native';
import {BaseBackgroundColors} from './constants';

export const styles = StyleSheet.create({
  headerContianer: {
    flexDirection: 'row',
    backgroundColor: BaseBackgroundColors.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  appTitle: {
    fontSize: 22,

    color: 'white',
  },
  inputContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    flexDirection: 'row',
    marginLeft: 20,
  },
  input: {
    padding: 0,
    fontSize: 18,
    color: 'white',
    borderBottomWidth: 0.6,
    borderColor: 'white',
  },
  inputIcon: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  notificationBtn: {
    paddingHorizontal: 10,
  },
  menu: {
    borderRadius: 4,
    padding: 8,
  },
  menuitem: {
    backgroundColor: 'white',
    padding: 12,
    paddingHorizontal: 14,
    borderBottomColor: 'lightgrey',
  },
  menuitemText: {
    fontSize: 16,
    color: BaseBackgroundColors.primary,
  },
});
