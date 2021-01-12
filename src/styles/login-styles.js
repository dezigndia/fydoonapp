import {StyleSheet} from 'react-native';
import {BaseBackgroundColors} from './constants';

export const loginStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    alignSelf: 'center',
    width: 300,
    height: 400,
    marginVertical: 20,
    marginBottom: 30,
  },
  countryCodeInput: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginRight: 10,

    fontSize: 18,
    color: 'black',
    minWidth: 80,
  },
  numberInput: {
    borderBottomWidth: 1,
    flexGrow: 1,
    borderColor: 'grey',
    fontSize: 18,
    color: 'grey',
  },
  errorText: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  Submitbtn: {
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    width: 180,
    alignSelf: 'center',
  },
  socialBtnContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  socialBtn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  socialBtnIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
});
