import React from 'react';
import {StatusBar, SafeAreaView, ScrollView} from 'react-native';
import AddStatus from '../../../components/status/add-status';
import StatusList from '../../../components/status/status-list';
import FriendsPost from '../../../components/status/friends-post';
import {BaseBackgroundColors} from '../../../styles/constants';
import {styles} from '../../../styles/status-styles';

const StatusScreen = ({naviagation}) => {
  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.mainContainer}>
          <AddStatus naviagation={naviagation} />
          <StatusList naviagation={naviagation} />
          <FriendsPost naviagation={naviagation} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default StatusScreen;
