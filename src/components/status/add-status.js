import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/status-styles';
import {Avatar, Icon} from 'react-native-elements';
import {BaseBackgroundColors} from '../../styles/constants';

const AddStatus = ({navigation}) => {
  const userImage = 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY';
  return (
    <>
      <View style={styles.rowContainer}>
        <Avatar
          rounded
          source={
            userImage
              ? {
                  uri: userImage,
                }
              : null
          }
          icon={{name: 'person', size: 28, type: 'material', color: 'white'}}
          avatarStyle={{borderRadius: 150}}
          titleStyle={{fontSize: 40}}
          containerStyle={{backgroundColor: 'lightgrey'}}
          size="medium"
        />
        <TouchableOpacity style={styles.questionContainer}>
          <Text style={styles.questionText}>What is on your mind?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingButtonContainer}>
          <Icon
            name="sliders"
            type="font-awesome"
            size={30}
            color={BaseBackgroundColors.profileColor}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.featuresContainer}>
        <TouchableOpacity style={styles.featureItemBtn}>
          <Icon
            name="video-outline"
            type="material-community"
            color={BaseBackgroundColors.profileColor}
            size={28}
          />
          <Text style={styles.featureText}>Live</Text>
        </TouchableOpacity>
        <View style={styles.vHrLine} />
        <TouchableOpacity style={styles.featureItemBtn}>
          <Icon
            name="file-photo-o"
            type="font-awesome"
            color={BaseBackgroundColors.profileColor}
            size={22}
          />
          <Text style={styles.featureText}>Photos</Text>
        </TouchableOpacity>
        <View style={styles.vHrLine} />
        <TouchableOpacity style={styles.featureItemBtn}>
          <Icon
            name="event-available"
            type="material"
            color={BaseBackgroundColors.profileColor}
            size={26}
          />
          <Text style={styles.featureText}>Event</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default AddStatus;
