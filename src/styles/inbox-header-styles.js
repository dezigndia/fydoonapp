import {StyleSheet} from 'react-native';
import {BaseBackgroundColors} from './constants';

export const styles = StyleSheet.create({
  headerContianer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    alignItems: 'center',
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  input: {
    width: '85%',
    padding: 0,
    fontSize: 18,
    color: 'grey',
    borderBottomWidth: 1,
    borderColor: BaseBackgroundColors.secondary,
  },
  inputIcon: {
    marginRight: 10,
  },
  notificationBtn: {
    position: 'absolute',
    right: 10,
  },
});
