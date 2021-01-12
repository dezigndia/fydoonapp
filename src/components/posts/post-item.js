import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/post-styles';
import {Avatar, Icon, Image, Button} from 'react-native-elements';
import {BaseBackgroundColors} from '../../styles/constants';

const PostItem = ({item, navigation}) => {
  function getLikeText(item) {
    if (item.liked_list.length === 1) {
      return item.liked_list[0].name;
    } else if (item.liked_list.length === 2) {
      return item.liked_list[0].name + ' and ' + item.liked_list[1].name;
    } else {
      const othr = item.liked_list.length === 3 ? ' other' : ' others';
      return (
        item.liked_list[0].name +
        ', ' +
        item.liked_list[1].name +
        ' and ' +
        (item.liked_list.length - 2).toString() +
        othr
      );
    }
  }
  return (
    <View style={styles.postContianer}>
      <View style={styles.postHeaderContainer}>
        <View style={styles.postHeaderLeftContainer}>
          <Avatar
            rounded
            source={
              item.profile_pic
                ? {
                    uri: item.profile_pic,
                  }
                : null
            }
            icon={{name: 'person', size: 28, type: 'material', color: 'white'}}
            avatarStyle={{borderRadius: 150}}
            containerStyle={{backgroundColor: 'lightgrey'}}
            size="small"
          />
          <View style={styles.postHeaderLeftContentContainer}>
            <View style={styles.postUserNameContainer}>
              <Text style={styles.postUserNameTxt} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.postTypeTxt}>
                uploaded a {' ' + item.type}
              </Text>
            </View>
            <Text style={styles.dateTxt}>{item.date}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.postMenuBtn}>
          <Icon
            name="dots-vertical"
            color={BaseBackgroundColors.profileColor}
            type="material-community"
            size={28}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Image
          source={{uri: item.image}}
          resizeMode={'stretch'}
          containerStyle={styles.postImage}
          placeholderStyle={{backgroundColor: 'lightgrey'}}
        />
        <View style={styles.postlLikeBtnContainer}>
          <Button
            containerStyle={styles.postLikeBtn}
            buttonStyle={styles.postLikeBtnClr}
            icon={
              <Icon
                name="bolt"
                type="font-awesome"
                size={28}
                color="white"
                style={[{padding: 8}]}
              />
            }
          />
        </View>
      </View>
      <View style={styles.postLikeContainer}>
        <Icon name="bolt" type="font-awesome" size={22} color={'grey'} />
        {item.liked_list.length > 0 && (
          <>
            <Text style={[styles.postLikeText, {fontWeight: 'bold'}]}>
              Liked
            </Text>
            <Text
              numberOfLines={1}
              style={[styles.postLikeText, {color: 'grey'}]}>
              By {' ' + getLikeText(item)}
            </Text>
          </>
        )}
        {item.liked_list.length === 0 && (
          <>
            <Text style={[styles.postLikeText, {color: 'grey'}]}>0</Text>
            <Text style={[styles.postLikeText, {fontWeight: 'bold'}]}>
              Like
            </Text>
          </>
        )}
      </View>
      <View style={styles.postFooterContainer}>
        <TouchableOpacity style={styles.postFooterBtn}>
          <Icon
            name="message-outline"
            type="material-community"
            size={26}
            color={BaseBackgroundColors.profileColor}
          />
          <Text style={styles.postFooterBtnTxt}>Comment</Text>
        </TouchableOpacity>
        <View style={styles.postFooterHr} />
        <TouchableOpacity style={styles.postFooterBtn}>
          <Icon
            name="send"
            type="feather"
            size={26}
            color={BaseBackgroundColors.profileColor}
          />
          <Text style={styles.postFooterBtnTxt}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PostItem;
