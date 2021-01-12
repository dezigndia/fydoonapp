// import React, {Component} from 'react';

// import {TouchableOpacity, View} from 'react-native';

// import Video from 'react-native-video';
// import Icon from 'react-native-vector-icons/FontAwesome';

// class VideoPlayer extends Component {
//   state = {
//     rate: 1,
//     volume: 1,
//     muted: false,
//     resizeMode: 'contain',
//     duration: 0.0,
//     currentTime: 0.0,
//     paused: false,
//   };

//   onLoad = data => {
//     this.setState({duration: data.duration});
//   };

//   onProgress = data => {
//     this.setState({currentTime: data.currentTime});
//   };

//   onEnd = () => {
//     this.setState({paused: true});
//     this.video.seek(0);
//   };

//   getCurrentTimePercentage() {
//     if (this.state.currentTime > 0) {
//       return (
//         parseFloat(this.state.currentTime) / parseFloat(this.state.duration)
//       );
//     }
//     return 0;
//   }

//   render() {
//     const flexCompleted = this.getCurrentTimePercentage() * 100;
//     const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;
//     const icon = this.state.paused ? 'play' : 'pause';

//     const {uri} = this.props;
//     //console.log(uri);
//     return (
//       <View style={styles.container}>
//         <TouchableOpacity
//           style={styles.fullScreen}
//           onPress={() => this.setState({paused: !this.state.paused})}>
//           {uri && (
//             <Video
//               ref={ref => {
//                 this.video = ref;
//               }}
//               source={{
//                 uri: uri,
//               }}
//               style={styles.fullScreen}
//               paused={this.state.paused}
//               resizeMode={'contain'}
//               onLoad={this.onLoad}
//               onProgress={this.onProgress}
//               onEnd={this.onEnd}
//               repeat={true}
//             />
//           )}
//         </TouchableOpacity>

//         <View style={styles.controls}>
//           <TouchableOpacity
//             onPress={() => this.setState({paused: !this.state.paused})}>
//             <Icon name={icon} size={20} color={'#FFF'} />
//           </TouchableOpacity>
//           <View style={styles.progress}>
//             <View
//               style={[styles.innerProgressCompleted, {flex: flexCompleted}]}
//             />
//             <View
//               style={[styles.innerProgressRemaining, {flex: flexRemaining}]}
//             />
//           </View>
//         </View>
//       </View>
//     );
//   }
// }

// const styles = {
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//   },
//   fullScreen: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//   },
//   controls: {
//     flexDirection: 'row',
//     backgroundColor: 'transparent',
//     borderRadius: 5,
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     right: 20,
//     alignItems: 'center',
//   },
//   progress: {
//     flex: 1,
//     flexDirection: 'row',
//     borderRadius: 3,
//     overflow: 'hidden',
//     marginLeft: 10,
//   },
//   innerProgressCompleted: {
//     height: 10,
//     backgroundColor: '#f1a91b',
//   },
//   innerProgressRemaining: {
//     height: 10,
//     backgroundColor: '#2C2C2C',
//   },
// };

// export default VideoPlayer;
import React, {Component} from 'react';
//Import React
import {Platform, StyleSheet, Text, View} from 'react-native';
//Import Basic React Native Component
import Video from 'react-native-video';
//Import React Native Video to play video
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
//Media Controls to control Play/Pause/Seek and full screen

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'content',
    };
  }

  onSeek = seek => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };

  onPaused = playerState => {
    //Handler for Video Pause
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onReplay = () => {
    //Handler for Replay
    this.setState({playerState: PLAYER_STATES.PLAYING});
    this.videoPlayer.seek(0);
  };

  onProgress = data => {
    const {isLoading, playerState} = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({currentTime: data.currentTime});
    }
  };

  onLoad = data => this.setState({duration: data.duration, isLoading: false});

  onLoadStart = data => this.setState({isLoading: true});

  onEnd = () => this.setState({playerState: PLAYER_STATES.ENDED});

  onError = () => alert('Oh! ', error);

  exitFullScreen = () => {
    alert('Exit full screen');
  };

  enterFullScreen = () => {};

  onFullScreen = () => {
    if (this.state.screenType == 'content')
      this.setState({screenType: 'cover'});
    else this.setState({screenType: 'content'});
  };
  renderToolbar = () => (
    <View>
      <Text> toolbar </Text>
    </View>
  );
  onSeeking = currentTime => this.setState({currentTime});

  render() {
    const {uri} = this.props;
    return (
      <View style={styles.container}>
        <Video
          onEnd={this.onEnd}
          onLoad={this.onLoad}
          onLoadStart={this.onLoadStart}
          onProgress={this.onProgress}
          paused={this.state.paused}
          ref={videoPlayer => (this.videoPlayer = videoPlayer)}
          resizeMode={this.state.screenType}
          onFullScreen={this.state.isFullScreen}
          source={{uri: uri}}
          style={styles.mediaPlayer}
          volume={10}
        />
        <MediaControls
          duration={this.state.duration}
          isLoading={this.state.isLoading}
          mainColor="#333"
          onFullScreen={this.onFullScreen}
          onPaused={this.onPaused}
          onReplay={this.onReplay}
          onSeek={this.onSeek}
          onSeeking={this.onSeeking}
          playerState={this.state.playerState}
          progress={this.state.currentTime}
          toolbar={this.renderToolbar()}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});
export default VideoPlayer;
