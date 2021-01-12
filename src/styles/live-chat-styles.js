import {StyleSheet} from 'react-native';
import {BaseBackgroundColors} from './constants';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 10,
  },
  headerTitle: {
    color: BaseBackgroundColors.profileColor,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerItem: {
    margin: 10,
    alignItems: 'center',
  },
  headerItemOuterCircle: {
    borderWidth: 1,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderColor: BaseBackgroundColors.profileColor,
  },
  headerItemInnerCircle: {
    width: '85%',
    height: '85%',

    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseBackgroundColors.profileColor,
  },
  headerItemText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'grey',
    marginLeft: 10,
  },
  stickyBarContainer: {
    // position: 'absolute',
    // right: 0,
    // top: 102,
    //  alignSelf: 'flex-end',

    //borderRadius: 8,
    //bottom: 0,
    paddingBottom: 10,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },
  stickBarDotBtn: {
    paddingVertical: 5,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  stickBarItem: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 150,
  },
  menu: {
    alignItems: 'center',
  },
  headerMenuitem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  threeDotBtn: {
    padding: 10,
  },
  menuitem: {
    flex: 1,
    paddingHorizontal: 5,
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
