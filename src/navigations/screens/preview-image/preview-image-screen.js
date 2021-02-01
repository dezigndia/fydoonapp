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
      <StatusBar backgroundColor={'black'} />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.header}>
          <TouchableOpacity style={{padding: 10, alignSelf: 'flex-start'}}>
            <Icon
              name="times"
              type="font-awesome"
              size={28}
              color={'transparent'}
              reverseColor="white"
              reverse
              onPress={() => navigation.goBack()}
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
