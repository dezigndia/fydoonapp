import {StyleSheet} from 'react-native';
import {BaseBackgroundColors} from './constants';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerBtn: {
    marginRight: 10,
  },
  headerContainer: {
    flexDirection: 'row',
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
    flexGrow: 1,
    marginLeft: 10,
    fontWeight: 'bold',
    color: BaseBackgroundColors.profileColor,
  },
  filterBtn: {
    padding: 10,
  },
  searchConatiner: {
    flexGrow: 1,
    padding: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
    backgroundColor: 'white',
  },
  featuredItemContainer: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 8,
    height: 120,
    width: 100,
  },
  featuredListContainer: {
    margin: 5,
  },
  featuredItemImage: {
    height: '100%',
    width: '100%',
    zIndex: -12,
    borderRadius: 8,
  },
  heartBtnContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 1,
    padding: 8,
  },
  featuredItemDetailsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    padding: 5,
    backgroundColor: 'transparent',
  },
  featuredItemName: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  featuredItemDetailsNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallItem: {
    flexDirection: 'row',
    marginTop: 5,
    flex: 1,
  },
  featuredItemtext: {
    color: 'white',
    marginLeft: 2,
    flex: 1,
    fontSize: 12,
  },
  hrline: {
    marginTop: 10,
    height: 1,
    backgroundColor: 'lightgrey',
  },
  mygroupContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
  },
  mygroupBtn: {
    height: 50,
    width: 50,

    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseBackgroundColors.profileColor,
  },
  mygroupTxt: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  listItemTitle: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  message: {
    marginHorizontal: 10,
    marginTop: 2,
    color: 'grey',
    fontSize: 16,
  },

  listItemTime: {
    fontSize: 16,
    marginBottom: 5,
  },
  unreadBadge: {
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseBackgroundColors.profileColor,
  },
  unreadBadgeText: {
    color: 'white',
    fontSize: 14,
  },
  listEmptyContainer: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  listEmptyText: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 18,
  },
});
