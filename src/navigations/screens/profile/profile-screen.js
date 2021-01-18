import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Platform,
  ScrollView,
  ImageBackground,
  TextInput,
  Alert,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Icon} from 'react-native-elements';
import {BaseBackgroundColors} from '../../../styles/constants';
import ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  getUserDetails,
  sendUserProfilePic,
} from '../../../apis/account-operations';
import {setUserDetails} from '../../../redux/actions/user-details-actions';
import {mainApi} from '../../../apis/constants';
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'rn-fetch-blob';
import AddStatus from '../../../components/status/add-status';
import StatusList from '../../../components/status/status-list';
import FriendsPost from '../../../components/status/friends-post';
import Follower from '../../../components/followers/follower';
import moment from 'moment';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const data = [
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    story_name: '24th Feb',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    story_name: 'Posters',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    story_name: 'Motion Graphics',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    story_name: 'Video',
  },
  {
    image_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    story_name: 'Story',
  },
];

var numColumn = 3;

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
  },
];

const data3 = [
  {
    profile_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    update_profile_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    shared_profile_name: '',
    profile_name: 'Vikram',
    date: '15 April',
    time: '3:48 PM',
    liked_by: 'Sanskrit, Vishal & 15 Others',
  },
  {
    profile_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    update_profile_url: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
    shared_profile_name: 'Samuel',
    profile_name: 'Vikram',
    date: '15 April',
    time: '3:48 PM',
    liked_by: 'Sanskrit, Vishal & 15 Others',
  },
];

const BioScreen = ({navigation}) => {
  const di = [
    {
      id: 1,
      skills: 'Photoshop',
    },
    {
      id: 2,
      skills: 'After Effects',
    },
    {
      id: 3,
      skills: 'Cinema Ad',
    },
    {
      id: 4,
      skills: 'Affinity Designer',
    },
    {
      id: 5,
      skills: 'Autocad',
    },
    {id: 6, skills: 'Photoshop'},
  ];
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const utils = useSelector(state => state.utils);
  const {userData} = userDetails;
  const [refreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageType, setImageType] = useState('');
  const [SkillData, setSkillsData] = useState(di);

  const [img, setImg] = useState('');
  const [showFriendsType, setShowFriendsType] = useState('');

  const pickImageHandler = () => {
    ImagePicker.showImagePicker(
      {title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
      res => {
        if (res.didCancel) {
          console.log('User cancelled!');
        } else if (res.error) {
          console.log('Error', res.error);
        } else {
          setImageType('uploading');

          uploadPic(res);
        }
      },
    );
  };

  function uploadPic(img) {
    const propicData = {
      profileImage: 'data:image/jpeg;base64,' + img.data,
    };

    sendUserProfilePic(propicData, utils.token)
      .then(res => {
        Toast.show('Image uploaded!', Toast.SHORT);
        getUserData();
      })
      .catch(err => {
        console.log(err, 'image error');
        if (img !== '') {
          setImageType('url');
        } else {
          setImageType('');
        }

        Toast.show('Image not uploaded!', Toast.SHORT);
      });
  }
  async function getUserData() {
    getUserDetails(utils.token)
      .then(res => {
        dispatch(setUserDetails(res.data));
        if (res.data.profileImage) {
          setImg(res.data.profileImage);
          setImageType('url');
        } else {
          setImg('');
          setImageType('');
        }
      })
      .catch(err => {
        if (img != '') {
          setImageType('url');
        } else {
          setImageType('');
        }
        console.log(err, 'getUserdetails api');
      });
  }
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.plugViewStyle}>
          {/* <TouchableOpacity style={styles.leftIconStyle}>
            <Icon
              name="keyboard-backspace"
              type="materialicon"
              size={30}
              color={BaseBackgroundColors.secondary}
            />
          </TouchableOpacity> 

          <Text style={styles.plugTextStyle}>PLUGS</Text>
        </View> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              colors={[BaseBackgroundColors.secondary]}
              tintColor={BaseBackgroundColors.secondary}
              refreshing={refreshing}
              onRefresh={() => {
                getUserData();
              }}
            />
          }>
          {/* Profile View  Image address info */}

          <View style={styles.commonViewStyle}>
            <View
              style={{
                borderRadius: 150,
                padding: 8,
                backgroundColor: 'rgb(243,245,249)',

                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={[styles.profileImageStyle]}>
                {imageType != '' &&
                  imageType != 'uploading' &&
                  userData != null && (
                    <Image
                      style={styles.profileImageStyle}
                      source={{
                        uri: userData.profileImage,
                      }}
                    />
                  )}
                {imageType === '' && imageType != 'uploading' && (
                  <View style={styles.profileImageStyle}>
                    <Text style={styles.firstLetter}>
                      {userData != null
                        ? userData.firstName
                          ? userData.firstName[0].toUpperCase()
                          : ''
                        : ''}
                    </Text>
                  </View>
                )}
                {imageType == 'uploading' && (
                  <View style={styles.profileImageStyle}>
                    <ActivityIndicator
                      size={28}
                      color={BaseBackgroundColors.profileColor}
                    />
                  </View>
                )}
                {imageType != 'uploading' && (
                  <View style={styles.addPhotoIcon}>
                    <TouchableOpacity
                      style={styles.addPhotoIconBtn}
                      onPress={() => {
                        pickImageHandler();
                      }}>
                      <Icon
                        name="camera"
                        type="font-awesome"
                        size={22}
                        color="white"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text numberOfLines={2} style={{color: 'black', fontSize: 26}}>
                {userData != null &&
                userData.firstName != null &&
                userData.firstName != ''
                  ? userData.firstName + ' ' + userData.lastName
                  : 'Edit profile to enter name'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                width: width,
                justifyContent: 'center',
                marginTop: 5,
              }}>
              <Text style={styles.normaltextStyle}>
                {userData != null &&
                userData.work != null &&
                userData.work != ''
                  ? userData.work
                  : 'Not working yet'}
              </Text>
              <View
                style={{
                  height: 20,
                  width: 1,
                  backgroundColor: BaseBackgroundColors.profileColor,
                  marginLeft: 10,
                }}
              />
              <Icon
                name="location-on"
                type="material"
                size={18}
                color={BaseBackgroundColors.profileColor}
                style={styles.iconStyle}
              />

              <Text style={styles.normaltextStyle}>
                {userData != null &&
                userData.workLocation != null &&
                userData.workLocation != ''
                  ? userData.workLocation
                  : 'No location available'}
              </Text>
            </View>
            {/* <Text
              style={[styles.normaltextStyle, {marginTop: 5, color: 'grey'}]}>
              {userData.user.first_name + ' '} lives within 1 km radius
            </Text> */}
          </View>

          {/* Follow Contact Btn View */}

          <View style={styles.followContactView}>
            <TouchableOpacity
              style={styles.followBtnStyle}
              onPress={() => navigation.navigate('edit-profile')}>
              <Icon
                style={styles.iconStyle}
                name="pencil"
                type="font-awesome"
                size={18}
                color={BaseBackgroundColors.profileColor}
              />
              <Text
                style={{
                  fontSize: 18,
                  color: BaseBackgroundColors.profileColor,
                }}>
                {' '}
                Edit Profile{' '}
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={styles.contactBtnstyle}
              onPress={() => Alert.alert('Switchin', 'Coming soon')}>
              <Text
                style={{
                  fontSize: 18,
                  color: BaseBackgroundColors.profileColor,
                }}>
                Profit
              </Text>
            </TouchableOpacity> */}
          </View>

          {/* Bio View */}

          <View style={styles.commonViewStyle}>
            {/* <Text style={styles.normalTextWithGray}>Bio</Text>
                        <View style={{ width: 50, height: 1, backgroundColor: 'grey', marginTop: 3 }}></View>
                        <Text style={styles.bioText}>Simplifying interfaces and experiences since 2012. Feel free to contact me for full-time or freelance work opportunities.</Text> */}
            <View
              style={{
                height: 200,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FAFAFA',
                borderRadius: 30,
                paddingTop: 10,
              }}>
              <Swiper activeDotColor={BaseBackgroundColors.profileColor}>
                <View style={styles.slide1}>
                  <Text style={styles.normalTextWithGray}>About</Text>
                  <View
                    style={{
                      width: 50,
                      height: 1,
                      backgroundColor: 'grey',
                      marginTop: 3,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />

                  <Text style={styles.bioText}>
                    {userData != null &&
                    userData.about != null &&
                    userData.about != ''
                      ? userData.about
                      : 'Edit profile to add about yourself'}
                  </Text>
                </View>
                <View style={styles.slide2}>
                  <Text style={styles.normalTextWithGray}>Skills</Text>
                  <View
                    style={{
                      width: 50,
                      height: 1,
                      backgroundColor: 'grey',
                      marginTop: 3,
                    }}
                  />
                  <FlatList
                    contentContainerStyle={{
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                    }}
                    data={userData != null ? userData.skills : []}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => (
                      <View style={{marginTop: 10}}>
                        <View
                          style={{
                            backgroundColor: BaseBackgroundColors.profileColor,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: 5,
                            borderRadius: 20,
                          }}>
                          <Text
                            style={{margin: 5, color: 'white', fontSize: 14}}>
                            No skills available
                          </Text>
                        </View>
                      </View>
                    )}
                    renderItem={({item, index}) => {
                      return (
                        <View style={{marginTop: 10}}>
                          <View
                            style={{
                              backgroundColor:
                                BaseBackgroundColors.profileColor,
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginLeft: 5,
                              borderRadius: 20,
                            }}>
                            <Text
                              style={{
                                margin: 5,
                                color: 'white',
                                fontSize: 14,
                              }}>
                              {item}
                            </Text>
                          </View>
                        </View>
                      );
                    }}
                  />
                </View>
                {userData != null && (
                  <View style={styles.slide1}>
                    <Text style={styles.normalTextWithGray}>Date of Birth</Text>
                    <View
                      style={{
                        width: 50,
                        height: 1,
                        backgroundColor: 'grey',
                        marginTop: 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    />

                    <Text style={styles.bioText}>
                      {moment(userData.dob).format('DD-MMM-YY')}
                    </Text>
                  </View>
                )}
                {userData != null &&
                  userData.experiences != null &&
                  userData.experiences.length > 0 && (
                    <View style={styles.slide1}>
                      <Text style={styles.normalTextWithGray}>Expirences</Text>
                      <View
                        style={{
                          width: 50,
                          height: 1,
                          backgroundColor: 'grey',
                          marginTop: 3,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      />

                      <FlatList
                        data={userData.experiences}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                          flex: 1,
                          marginTop: 20,
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item, index}) => {
                          return (
                            <View style={{marginTop: 10}}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}>
                                <View style={{flexDirection: 'row'}}>
                                  <Text
                                    style={{
                                      marginVertical: 5,
                                      marginHorizontal: 5,
                                      color: BaseBackgroundColors.profileColor,
                                      fontSize: 16,
                                    }}>
                                    {moment(item.startDate).format('DD-MMM-YY')}
                                  </Text>
                                  <Text
                                    style={{
                                      marginVertical: 5,
                                      marginHorizontal: 5,
                                      color: BaseBackgroundColors.profileColor,
                                      fontSize: 16,
                                    }}>
                                    -
                                  </Text>
                                  <Text
                                    style={{
                                      marginVertical: 5,
                                      marginHorizontal: 5,
                                      color: BaseBackgroundColors.profileColor,
                                      fontSize: 16,
                                    }}>
                                    {moment(item.endDate).format('DD-MMM-YY')}
                                  </Text>
                                </View>
                              </View>
                              <Text
                                style={{
                                  marginVertical: 5,
                                  marginHorizontal: 5,
                                  color: BaseBackgroundColors.secondary,
                                  fontSize: 16,
                                  alignSelf: 'flex-start',
                                }}>
                                {item.description}
                              </Text>
                            </View>
                          );
                        }}
                      />
                    </View>
                  )}
                {userData != null && userData.educations.length > 0 && (
                  <View style={styles.slide1}>
                    <Text style={styles.normalTextWithGray}>Education</Text>
                    <View
                      style={{
                        width: 50,
                        height: 1,
                        backgroundColor: 'grey',
                        marginTop: 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    />

                    <FlatList
                      data={userData.educations}
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{
                        flex: 1,
                        marginTop: 20,
                      }}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item, index}) => {
                        return (
                          <View style={{marginTop: 10}}>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}>
                              <View style={{flexDirection: 'row'}}>
                                <Text
                                  style={{
                                    marginVertical: 5,
                                    marginHorizontal: 5,
                                    color: BaseBackgroundColors.profileColor,
                                    fontSize: 16,
                                  }}>
                                  {moment(item.startDate).format('DD-MMM-YY')}
                                </Text>
                                <Text
                                  style={{
                                    marginVertical: 5,
                                    marginHorizontal: 5,
                                    color: BaseBackgroundColors.profileColor,
                                    fontSize: 16,
                                  }}>
                                  -
                                </Text>
                                <Text
                                  style={{
                                    marginVertical: 5,
                                    marginHorizontal: 5,
                                    color: BaseBackgroundColors.profileColor,
                                    fontSize: 16,
                                  }}>
                                  {moment(item.endDate).format('DD-MMM-YY')}
                                </Text>
                              </View>
                            </View>
                            <Text
                              style={{
                                marginVertical: 5,
                                marginHorizontal: 5,
                                color: BaseBackgroundColors.secondary,
                                fontSize: 16,
                                alignSelf: 'flex-start',
                              }}>
                              {item.description}
                            </Text>
                          </View>
                        );
                      }}
                    />
                  </View>
                )}
              </Swiper>
            </View>
          </View>

          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 20,
            }}
            onPress={async () => {
              const id = await AsyncStorage.getItem('userId');
              navigation.navigate('see-profile', {
                friendId: id,
              });
            }}>
            <Text
              style={{
                fontSize: 16,
                color: BaseBackgroundColors.profileColor,
              }}>
              View More
            </Text>
          </TouchableOpacity>

          {/* Stories View */}

          {/* <View style={styles.commonViewStyle}>
            <Text style={styles.normalTextWithGray}>Stories</Text>
            <View
              style={{
                width: 60,
                height: 1,
                backgroundColor: 'grey',
                marginTop: 3,
                marginBottom: 10,
              }}
            />

            <StatusList navigation={navigation} />
          </View>

          <View style={styles.commonViewStyle}>
            <Text style={styles.normalTextWithGray}>Posts</Text>
            <View
              style={{
                width: 60,
                height: 1,
                backgroundColor: 'grey',
                marginTop: 3,
                marginBottom: 10,
              }}
            />

            <AddStatus navigation={navigation} />
          </View> */}
          {/* Photos View */}

          {/* <View
            style={[
              styles.commonViewStyle,
              {
                backgroundColor: '#FAFAFA',
                borderRadius: 30,
                paddingVertical: 10,
              },
            ]}>
            <Text style={styles.normalTextWithGray}>Photos</Text>
            <View
              style={{
                width: 60,
                height: 1,
                backgroundColor: 'grey',
                marginTop: 3,
                marginBottom: 20,
              }}
            />

            <FlatList
              data={userData ? userData.profile_images : []}
              contentContainerStyle={{
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}
              ListEmptyComponent={() => (
                <View style={{marginVertical: 10}}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginLeft: 5,
                    }}>
                    <Text
                      style={{
                        margin: 5,
                        color: BaseBackgroundColors.profileColor,
                        fontSize: 14,
                      }}>
                      No Photos available
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => {
                if (index <= 5) {
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
                          source={{uri: item.IMAGE}} //change it while on aws
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }
              }}
            />
          </View> */}

          {/* Photos View More */}

          {/* {userData && userData.profile_images.length > 6 && (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 20,
              }}
              onPress={() => {
                navigation.navigate('photo-gallery', {
                  images: userData.profile_images,
                });
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: BaseBackgroundColors.profileColor,
                }}>
                View More
              </Text>
            </TouchableOpacity>
          )} */}

          {/* Followers Suggestions Btn View */}

          {/* <View style={styles.followerSuggestionView}>
            <TouchableOpacity
              style={[styles.followerSuggestionbtn, {flexDirection: 'row'}]}
              onPress={() => {
                if (showFriendsType === 'followers') {
                  setShowFriendsType('');
                  return;
                }
                setShowFriendsType('followers');
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: BaseBackgroundColors.profileColor,
                }}>
                {' '}
                Followers{' '}
              </Text>
              <Icon
                name={
                  showFriendsType === 'followers'
                    ? 'keyboard-arrow-up'
                    : 'keyboard-arrow-down'
                }
                type="material"
                size={30}
                color={BaseBackgroundColors.profileColor}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.followerSuggestionbtn,
                {marginLeft: 10, flexDirection: 'row'},
              ]}
              onPress={() => {
                if (showFriendsType === 'suggestion') {
                  setShowFriendsType('');
                  return;
                }
                setShowFriendsType('suggestion');
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: BaseBackgroundColors.profileColor,
                }}>
                Suggestions
              </Text>
              <Icon
                name={
                  showFriendsType === 'suggestion'
                    ? 'keyboard-arrow-up'
                    : 'keyboard-arrow-down'
                }
                type="material"
                size={30}
                color={BaseBackgroundColors.profileColor}
              />
            </TouchableOpacity>
          </View> */}

          {/* Activity View */}
          {/* {showFriendsType !== '' && (
            <Follower navigation={navigation} type={showFriendsType} />
          )} */}
          {/* <View style={styles.activityViewStyle}>
            <Text style={styles.normalTextWithGray}>Activity</Text>
            <View
              style={{
                width: 60,
                height: 1,
                backgroundColor: 'grey',
                marginTop: 3,
              }}
            />

            <FriendsPost navigation={navigation} />
          </View> */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  plugViewStyle: {
    marginVertical: 10,

    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhotoIconBtn: {
    height: 48,
    width: 48,
    backgroundColor: BaseBackgroundColors.profileColor,
    justifyContent: 'center',
    borderRadius: 150,
    alignItems: 'center',
  },
  addPhotoIcon: {
    position: 'absolute',
    bottom: 0,
    right: 2,
  },

  plugTextStyle: {
    fontSize: 18,
    color: BaseBackgroundColors.profileColor,
  },
  leftIconStyle: {
    marginLeft: 10,
  },
  rightIconStyle: {
    marginRight: 10,
    width: 50,
  },
  commonViewStyle: {
    width: width,
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'center',
  },
  activityViewStyle: {
    flex: 1,
  },
  profileImageStyle: {
    height: 140,
    width: 140,
    borderRadius: 150,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstLetter: {
    fontSize: 100,
    color: 'white',
  },
  normaltextStyle: {
    fontSize: 14,
    color: BaseBackgroundColors.profileColor,
  },
  normalTextWithGray: {
    fontSize: 14,
    color: 'grey',
  },
  iconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  flatListProfileView: {
    marginLeft: 10,
    flexDirection: 'row',
  },
  followContactView: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    flexDirection: 'row',
  },
  followBtnStyle: {
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: BaseBackgroundColors.profileColor,
    borderWidth: 1.0,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  contactBtnstyle: {
    width: width - 250,
    height: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: BaseBackgroundColors.profileColor,
    borderWidth: 1.0,
    marginLeft: 10,
  },
  bioText: {
    fontSize: 14,
    color: BaseBackgroundColors.profileColor,
    marginTop: 20,
    width: width - 40,
    textAlign: 'center',
  },
  storyViewStyle: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'grey',
    borderWidth: 1.0,
  },
  storyImageStyle: {
    height: 65,
    width: 65,
    borderRadius: 32.5,
  },
  followerSuggestionView: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    flexDirection: 'row',
    marginBottom: 20,
  },
  followerSuggestionbtn: {
    width: width - 230,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: BaseBackgroundColors.profileColor,
    borderWidth: 1.0,
  },
  slide1: {
    height: 200,
    alignItems: 'center',
  },
  slide2: {
    height: 200,
    alignItems: 'center',
  },
  slide3: {
    height: 200,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default BioScreen;
