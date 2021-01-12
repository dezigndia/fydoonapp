import {StyleSheet} from 'react-native';
import {BaseBackgroundColors} from './constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  innerContainerForToggle: {
    alignItems: 'center',
    paddingLeft: 20,
    flexDirection: 'row',
    marginVertical: 4,
    justifyContent: 'space-between',
  },
  image: {
    height: 80,
    width: 110,
    alignSelf: 'center',
  },
  imageBg: {
    height: 160,
    width: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseBackgroundColors.profileColor,
  },
  imageSetting: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseBackgroundColors.profileColor,
  },
  settingTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    padding: 5,
    alignSelf: 'center',
  },
  settingSubTitle: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    padding: 3,
    marginTop: 6,
    alignSelf: 'flex-start',
  },
  settingItems: {
    fontSize: 14,
    color: 'black',
    padding: 2,
    marginVertical: 1,
    alignSelf: 'flex-start',
  },
  headerContianer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    justifyContent: 'space-between',
    left: 0,
    right: 0,
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
});
