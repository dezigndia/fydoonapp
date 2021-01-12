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
  headerAvtar: {
    marginLeft: 20,
    backgroundColor: 'lightgrey',
  },
  detailBtn: {
    flexDirection: 'row',
    flex: 1,
  },
  friendDetailsContainer: {
    marginHorizontal: 10,
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  onlineNowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  friendName: {
    fontSize: 18,

    fontWeight: 'bold',
    color: 'black',
  },
  onlineStatusTxt: {
    color: 'grey',
    fontSize: 12,
  },
  headerBtn: {
    marginRight: 10,
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
  modal: {
    flex: 1,
    backgroundColor: 'black',
  },
  close: {
    alignSelf: 'flex-end',
    margin: 10,
  },
});
