import {StyleSheet} from 'react-native';
import {BaseBackgroundColors} from './constants';

export const styles = StyleSheet.create({
  modalContainer: {
    padding: 10,
    width: 280,
  },
  listItem: {
    padding: 10,
    paddingVertical: 12,
  },
  cancelBtnContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  listItemText: {
    fontSize: 18,
    color: 'black',
  },
});
