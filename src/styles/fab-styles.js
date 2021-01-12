import {StyleSheet} from 'react-native';
import {BaseBackgroundColors} from './constants';

export const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 150,
    backgroundColor: BaseBackgroundColors.profileColor,
  },
  fabBtn: {
    borderRadius: 150,
  },
  fabBgClr: {
    backgroundColor: BaseBackgroundColors.profileColor,
  },
});
