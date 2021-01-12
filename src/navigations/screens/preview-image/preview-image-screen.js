import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {BaseBackgroundColors} from '../../../styles/constants';
import {styles} from '../../../styles/preview-image-styles';
const PreviewImageScreen = ({navigation, route}) => {
  const image = route.params.imageuri;
  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{padding: 10, alignSelf: 'flex-start'}}
            onPress={() => navigation.goBack()}>
            <Icon
              name="times-circle"
              type="font-awesome"
              size={28}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.mainContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{uri: image}}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default PreviewImageScreen;
