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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    padding: 5,
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: BaseBackgroundColors.profileColor,
    fontSize: 18,
    fontWeight: 'bold',
    right: 20,
  },
  image: {
    margin: 10,
    height: 180,
  },
  para: {
    color: 'grey',
    fontSize: 14,
    textAlign: 'center',
    margin: 10,
  },
  hrLine: {
    height: 1,
    backgroundColor: 'lightgrey',
    margin: 10,
  },
  input: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 8,
    margin: 10,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  submitBtnContainer: {
    margin: 10,
    alignSelf: 'center',
    width: 180,
    borderRadius: 40,
  },
  submitBtn: {
    backgroundColor: BaseBackgroundColors.profileColor,
  },
  bottomContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginVertical: 20,
  },

  fabBtn: {
    borderRadius: 150,
    marginHorizontal: 20,
  },
  fabBgClr: {
    backgroundColor: BaseBackgroundColors.profileColor,
  },
});
