import {StyleSheet} from 'react-native';
import {BaseBackgroundColors} from './constants';
export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContianer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',

    zIndex: 2,
    justifyContent: 'space-between',
  },
  headerTittle: {
    fontSize: 22,

    fontWeight: 'bold',
    color: BaseBackgroundColors.profileColor,
  },
  avatarStyle: {
    backgroundColor: 'lightgrey',
  },
  headerBtn: {
    marginRight: 10,
  },
  listContaner: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 20,
    flexGrow: 1,
  },

  listItemTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemTitle: {
    marginLeft: 10,

    fontSize: 16,
    flex: 1,
    fontWeight: 'bold',
    color: 'black',
  },
  listItemTime: {
    color: 'grey',
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
  },
  friendListTitleContanier: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  friendListTitle: {
    fontSize: 16,
    color: 'grey',
  },
  hrLine: {
    height: 1,
    flexGrow: 1,
    backgroundColor: BaseBackgroundColors.profileColor,
    marginLeft: 20,
  },
  listEmptyContainer: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  listEmptyText: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 18,
  },
  chatButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 150,
    marginRight: 10,
  },
  chatButtonTxt: {
    color: 'grey',
    fontSize: 14,
  },
});
