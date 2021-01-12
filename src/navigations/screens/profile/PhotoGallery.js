import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {BaseBackgroundColors} from '../../../styles/constants';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const numColumn = 3;

const data2 = [
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    story_name: 'Video',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    story_name: 'Video',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    story_name: 'Video',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    story_name: 'Video',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
  },
];

const PhotoGallery = ({navigation, route}) => {
  const images = route.params.images || [];
  console.log(images);
  return (
    <View style={styles.container}>
      <View
        style={{
          width: width,
          backgroundColor: BaseBackgroundColors.profileColor,
          height: 50,
          flexDirection: 'row',
        }}>
        <View
          style={{
            height: 50,
            width: 60,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="keyboard-backspace"
              type="materialicon"
              size={30}
              color={'white'}
            />
          </TouchableOpacity>
        </View>
        <View style={{width: width - 60, justifyContent: 'center'}}>
          <Text style={{color: 'white', fontSize: 22}}>Photos</Text>
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={images}
        keyExtractor={(item, index) => index.toString()}
        style={{paddingTop: 20, alignSelf: 'center', paddingBottom: 20}}
        numColumns={numColumn}
        renderItem={({item, index}) => {
          return (
            <View style={{marginTop: 10}}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('preview-image', {
                    imageuri: item.IMAGE,
                  })
                }
                style={{
                  backgroundColor: 'white',
                  width: width / 3.2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  marginLeft: 3,
                  marginBottom: 3,
                  marginTop: -10,
                }}>
                <Image
                  style={{
                    height: 130,
                    width: width / 3.2,
                    overflow: 'hidden',
                    resizeMode: 'cover',
                  }}
                  source={{uri: item.IMAGE}}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default PhotoGallery;
