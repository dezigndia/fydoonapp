import React from 'react';
import {View, Image as IMG, Text, StyleSheet} from 'react-native';
import {Avatar, Icon, Image} from 'react-native-elements';
import AudioPlayer from './audioplayer';

const CustomChatBubble = props => {
  return (
    <>
      {props.currentMessage.file && (
        <View style={styles.playBtnContainer}>
          <Icon name="play" type="font-awesome" size={16} color="grey" />
          <Text style={{color: 'grey', marginLeft: 5}}>Tap to open file</Text>
        </View>
      )}
      {props.currentMessage.image && (
        <View style={styles.imageContainer}>
          <Image
            resizeMode="contain"
            containerStyle={{}}
            placeholderStyle={{}}
            transition
            transitionDuration={1000}
            source={{
              uri: props.currentMessage.url,
            }}
            style={{width: '100%', minHeight: 100, minWidth: 150}}
          />
        </View>
      )}
      {props.currentMessage.video && (
        <View style={styles.playBtnContainer}>
          <Icon name="play" type="font-awesome" size={16} color="grey" />
          <Text style={{color: 'grey', marginLeft: 5}}>Tap to play video </Text>
        </View>
      )}
      {props.currentMessage.audio && (
        <AudioPlayer url={props.currentMessage.url} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  playBtnContainer: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    paddingTop: 10,
    paddingBottom: 5,
    paddingHorizontal: 10,
  },
  videoOverlay: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // backgroundColor: 'rgba(0,0,0,0.3)',
    // justifyContent: 'center',
    // alignItems: 'center',
    // opacity: 0.3,
    // zIndex: -1,
  },
});

export default CustomChatBubble;
