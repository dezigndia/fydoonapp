import {StyleSheet} from 'react-native';
import {BaseBackgroundColors} from './constants';
export const splashStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: BaseBackgroundColors.primary,
  },
  icon: {
    width: 300,
    height: 400,
  },
});
