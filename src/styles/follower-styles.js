import {StyleSheet} from 'react-native';
import {BaseBackgroundColors} from './constants';

export const styles = StyleSheet.create({
  followerContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginVertical: 20,
  },
  typeContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  typeText: {
    margin: 10,
    fontSize: 16,
    color: 'grey',
  },
  seeAllContianer: {
    padding: 10,
  },
  seeAllText: {
    color: BaseBackgroundColors.profileColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  followerItemContainer: {
    marginHorizontal: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: 170,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
  },
  crossBtnContainer: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 150,
    backgroundColor: 'lightgrey',
  },
  name: {
    fontSize: 16,

    marginVertical: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    color: BaseBackgroundColors.profileColor,
  },
  place: {
    fontSize: 14,

    textAlign: 'center',

    color: 'grey',
  },
  followBtnContianer: {
    width: '100%',
    marginVertical: 10,
  },
  followBtn: {
    backgroundColor: BaseBackgroundColors.profileColor,
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
    alignItems: 'center',
  },
});
