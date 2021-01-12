import {StyleSheet} from 'react-native';
import {BaseBackgroundColors} from './constants';
export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  questionContainer: {
    padding: 10,

    flexGrow: 1,
  },
  questionText: {
    color: 'grey',
    fontSize: 16,
  },
  settingButtonContainer: {
    paddingVertical: 10,
    paddingLeft: 10,
  },
  featuresContainer: {
    borderTopColor: BaseBackgroundColors.profileColor,
    borderTopWidth: 1,
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  featureItemBtn: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  featureText: {
    color: BaseBackgroundColors.profileColor,
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  vHrLine: {
    marginVertical: 8,
    width: 1,
    backgroundColor: BaseBackgroundColors.profileColor,
  },
  statusListContainer: {
    flexDirection: 'row',
  },
  headerItem: {
    maxWidth: 100,
    padding: 10,
    alignItems: 'center',
  },
  headerItemOuterCircle: {
    borderWidth: 1,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
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
    fontSize: 14,
    textAlign: 'center',
    color: BaseBackgroundColors.profileColor,
    marginTop: 5,
  },
  activityContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  activityText: {
    paddingBottom: 5,
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderBottomColor: BaseBackgroundColors.profileColor,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 16,
    color: BaseBackgroundColors.profileColor,
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
