import React from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import {splashStyles} from '../../styles/splash-styles';
import logo from '../../assets/images/main.jpg';
import {BaseBackgroundColors} from '../../styles/constants';

const ComingSoon = () => {
  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      <View style={splashStyles.mainContainer}>
        <Image source={logo} style={splashStyles.icon} />
        <Text style={splashStyles.title}>Coming Soon</Text>
      </View>
    </>
  );
};

export default ComingSoon;
