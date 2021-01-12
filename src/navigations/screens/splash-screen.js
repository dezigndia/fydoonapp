import React from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import {splashStyles} from '../../styles/splash-styles';
import logo from '../../assets/images/main.jpg';
import {BaseBackgroundColors} from '../../styles/constants';

const SplashScreen = () => {
  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      <View style={splashStyles.mainContainer}>
        <Image source={logo} style={splashStyles.icon} resizeMode="contain" />
        <Text style={splashStyles.title}>Fydoon</Text>
      </View>
    </>
  );
};

export default SplashScreen;
