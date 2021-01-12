import {StyleSheet} from 'react-native';
import {BaseBackgroundColors} from './constants';
import {batch} from 'react-redux';
export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  m20: {
    marginTop: 20,
    marginHorizontal: 20,
    flexGrow: 1,
  },
  imageContainer: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 150,
    width: 160,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
  },
  imgDefaultIcon: {},
  defaultLetter: {
    fontSize: 130,
    fontWeight: 'bold',
    color: BaseBackgroundColors.secondary,
  },
  inputImage: {
    height: 160,
    width: 160,
    borderRadius: 150,
  },
  addPhotoIconBtn: {
    height: 42,
    width: 42,
    backgroundColor: BaseBackgroundColors.primary,
    justifyContent: 'center',
    borderRadius: 150,
    alignItems: 'center',
  },
  addPhotoIcon: {
    position: 'absolute',
    bottom: 8,
    right: 4,
  },

  accSetupTitile: {
    color: '#042535',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  accSetupSubTitile: {
    color: '#042535',
    fontSize: 18,
    marginVertical: 20,
  },
  input: {
    borderBottomWidth: 1,
    fontSize: 18,
    color: 'grey',
    marginBottom: 20,
    flex: 1,
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  genderText: {
    color: 'grey',
    fontSize: 18,
    marginRight: 30,
  },

  genderButton: {
    marginRight: 20,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  errorText: {
    alignSelf: 'center',

    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 20,
    marginHorizontal: 20,
    width: 180,
    alignSelf: 'center',
  },
  mainColor: {
    color: BaseBackgroundColors.primary,
  },
  skillsListContainer: {
    flexGrow: 1,
  },
  addSkillButton: {
    marginVertical: 10,
    alignSelf: 'flex-end',
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  addNewSkillText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: BaseBackgroundColors.profileColor,
  },
  skillsListContainer: {
    flex: 1,
  },
  skillsListItem: {
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,

    // elevation: 5,

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  skillsListItemName: {
    fontSize: 18,
    color: BaseBackgroundColors.primary,
  },
  overlay: {
    borderRadius: 10,

    width: 320,
  },
  overlayButtonContainer: {
    flexDirection: 'row',
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
  skillCircle: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: BaseBackgroundColors.profileColor,
    borderRadius: 50,
  },
  emptylistText: {
    alignSelf: 'center',
    marginTop: 30,
    fontSize: 25,
    color: BaseBackgroundColors.primary,
    opacity: 0.4,
    textAlign: 'center',
  },
});
