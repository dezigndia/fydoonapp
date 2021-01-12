import {StyleSheet} from 'react-native';
import {BaseBackgroundColors} from './constants';

export const styles = StyleSheet.create({
  postContianer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 10,
  },
  postHeaderContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  postHeaderLeftContainer: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  postUserNameContainer: {
    flexDirection: 'row',
  },
  postHeaderLeftContentContainer: {
    marginHorizontal: 10,
    backgroundColor: 'white',
  },
  postUserNameTxt: {
    maxWidth: 150,
    marginRight: 5,
    fontWeight: 'bold',
    fontSize: 14,
  },
  postTypeTxt: {
    color: 'grey',
    fontSize: 14,
  },
  dateTxt: {
    color: 'grey',
    fontSize: 14,
  },
  postMenuBtn: {
    paddingLeft: 10,
    paddingVertical: 10,
  },
  postImage: {
    height: 250,
    width: '100%',
  },
  postLikeContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  postLikeText: {
    marginLeft: 5,
    fontSize: 14,
  },
  postlLikeBtnContainer: {
    position: 'absolute',
    right: 50,
    bottom: -20,
    borderRadius: 150,
    zIndex: 122,
  },
  postLikeBtn: {
    width: 50,
    height: 50,
    borderRadius: 150,
  },
  postLikeBtnClr: {
    backgroundColor: BaseBackgroundColors.profileColor,
  },
  postFooterContainer: {
    borderTopColor: BaseBackgroundColors.profileColor,
    borderTopWidth: 1,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  postFooterBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  postFooterHr: {
    marginVertical: 8,
    width: 1,
    backgroundColor: BaseBackgroundColors.profileColor,
  },
  postFooterBtnTxt: {
    marginLeft: 10,
    fontWeight: 'bold',
    color: BaseBackgroundColors.profileColor,
  },
});
