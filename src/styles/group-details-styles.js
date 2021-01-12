import {StyleSheet} from 'react-native';
import {BaseBackgroundColors} from './constants';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  headerContainer: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  backIconcontainer: {
    paddingVertical: 5,
    paddingRight: 10,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  addphotoBtnContainer: {
    position: 'absolute',
    bottom: 0,
    right: 2,
  },
  addphotoBtn: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: BaseBackgroundColors.profileColor,

    justifyContent: 'center',
    alignItems: 'center',
  },

  imageContainer: {
    borderRadius: 150,
    height: 160,
    width: 160,
    padding: 8,
    backgroundColor: 'rgb(243,245,249)',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImageStyle: {
    height: 140,
    width: 140,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstLetter: {
    fontSize: 100,
    color: 'white',
  },
  nameContainer: {
    flexDirection: 'row',
    marginTop: 10,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: {
    flexDirection: 'row',
    flex: 1,
  },
  name: {
    fontSize: 22,
    paddingLeft: 10,
    backgroundColor: 'white',
  },
  editBtn: {
    padding: 10,
  },
  listContainer: {
    paddingVertical: 10,
  },
  listHeaderContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listHeaderText: {
    marginVertical: 10,
    fontSize: 18,
    color: BaseBackgroundColors.profileColor,
  },
  searchBtn: {
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    flexGrow: 1,
    padding: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  listEmptyContainer: {
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listEmptyText: {
    fontSize: 20,
    color: BaseBackgroundColors.profileColor,
  },
  exitgroupContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: 'lightgrey',
  },
  exitgroupText: {
    color: BaseBackgroundColors.profileColor,
    fontSize: 18,
    marginLeft: 20,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: 'lightgrey',
  },
  listItemTitle: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  message: {
    marginHorizontal: 10,
    fontSize: 14,
    marginTop: 5,
    color: 'grey',
  },
  adminContainer: {
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    borderColor: BaseBackgroundColors.profileColor,
  },
  adminText: {
    color: BaseBackgroundColors.profileColor,
  },
  overlay: {
    borderRadius: 10,

    width: 320,
  },
  overlayButtonContainer: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 10,
  },
  overlayTitle: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: 'grey',
  },
  overlayInput: {
    marginVertical: 20,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    fontSize: 18,
    color: 'grey',
  },
  cancelBtn: {
    flex: 1,
    marginRight: 5,
  },
  addBtn: {
    flex: 1,
    marginLeft: 5,
  },

  cancelBtnBgClr: {
    borderWidth: 1,
    borderColor: BaseBackgroundColors.profileColor,
    backgroundColor: 'transparent',
  },
  cancelBtnTxt: {
    color: BaseBackgroundColors.primary,
  },
  addBtnBgClr: {
    backgroundColor: BaseBackgroundColors.profileColor,
  },
  menuitem: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  menuitemText: {
    fontSize: 14,
  },
  menuoptions: {
    padding: 10,
  },
});
