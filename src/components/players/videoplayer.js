import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import Video from 'react-native-video';
import {Icon} from 'react-native-elements';
import {ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native';
import {StatusBar} from 'react-native';

export const PreviewVideoScreen = ({}) => {
  const route = useRoute();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const {params} = route;
  const {videoUrl} = params;
  console.log(videoUrl);
  return (
    <>
      <StatusBar backgroundColor={'black'} />
      <SafeAreaView>
        <View style={styles.header}>
          <Icon
            name={'close'}
            size={28}
            type={'font-awesome'}
            color={'transparent'}
            reverseColor="white"
            style={styles.close}
            onPress={() => navigation.goBack()}
            reverse
          />
        </View>
        <View style={styles.videoContainer}>
          {videoUrl != null && (
            <Video
              controls={true}
              source={{uri: videoUrl}}
              rate={1.0}
              volume={10}
              isMuted={false}
              poster={videoUrl}
              resizeMode="contain"
              style={{width: '100%', height: '100%', backgroundColor: 'black'}}
              onLoadStart={() => setLoading(true)}
              onReadyForDisplay={() => setLoading(false)}
            />
          )}
        </View>
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator color={'grey'} size={32} />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    zIndex: 131,
    justifyContent: 'space-between',
  },
  videoContainer: {
    zIndex: -1,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 123,
    opacity: 0.3,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  close: {
    zIndex: 131,
  },
});
