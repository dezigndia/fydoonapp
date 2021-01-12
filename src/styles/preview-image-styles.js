import {StyleSheet} from 'react-native';
import {BaseBackgroundColors} from './constants';
export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  image: {
    height: 500,
    width: '100%',
  },
});
