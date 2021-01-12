import {StyleSheet} from 'react-native';
import {BaseBackgroundColors} from './constants';

export const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    backgroundColor: 'white',

    paddingTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },

  listItemTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemTitle: {
    marginLeft: 10,

    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,

    color: 'black',
  },
  listItemTime: {
    color: 'grey',
    fontSize: 12,
  },
  contentContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  message: {
    flex: 1,
    marginRight: 10,
    color: 'grey',
    fontSize: 12,
  },
});
