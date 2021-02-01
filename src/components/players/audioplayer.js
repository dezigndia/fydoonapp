import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Player} from '@react-native-community/audio-toolkit';
import {BaseBackgroundColors} from '../../styles/constants';

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.progress = new Animated.Value(0);
    this.state = {
      progress: 0,
      icon: 'play',
    };

    this.player = null;
  }

  componentDidMount() {
    this.audio_url = this.props.url;

    this.player = new Player(this.audio_url, {
      autoDestroy: false,
    });
    this.player.prepare(err => {
      if (this.player.isPrepared) {
        this.player_duration = this.player.duration;
      }
    });

    this.player.on('ended', () => {
      //  this.player = new Player(this.audio_url);
      this.progress = new Animated.Value(0);
      this.setState({
        icon: 'play',
        progress: 0,
      });
    });
  }

  render() {
    return (
      <TouchableOpacity onPress={this.toggleAudioPlayer}>
        <View style={styles.container}>
          <Icon name={this.state.icon} size={15} color={'grey'} />
          <View style={styles.rail}>
            <Animated.View style={[this.getProgressStyles()]} />
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  //

  getProgressStyles = () => {
    const animated_width = this.progress.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0.5, 1],
    });

    return {
      flex: animated_width,
      backgroundColor: BaseBackgroundColors.profileColor,
      height: 5,
    };
  };

  //

  toggleAudioPlayer = () => {
    if (this.player.isPlaying) {
      this.setState({
        icon: 'play',
      });
      this.player.pause();
      this.progress.stopAnimation(value => {
        this.player_duration =
          this.player.duration -
          this.player.duration * (Math.ceil(value) / 100);
      });
    } else {
      this.setState({
        icon: 'pause',
      });
      this.player.play();

      Animated.timing(this.progress, {
        duration: this.player_duration,
        toValue: 1,
      }).start();
    }
  };
}

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  rail: {
    minWidth: 100,
    flexGrow: 1,
    height: 5,
    marginLeft: 5,
    backgroundColor: 'grey',
    flexDirection: 'row',
  },
};

export default AudioPlayer;
