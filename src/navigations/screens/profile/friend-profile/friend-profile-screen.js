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
  StatusBar,
  SafeAreaView,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {Icon} from 'react-native-elements';
import {BaseBackgroundColors} from '../../../../styles/constants';
import {useDispatch, useSelector} from 'react-redux';
import {
  getFriendsDetails,
  getUserDetails,
} from '../../../../apis/account-operations';

import Toast from 'react-native-simple-toast';
import _ from 'lodash';
import moment from 'moment';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const numColumn = 3;
const FriendProfileScreen = ({navigation, route}) => {
  const dispatch = useDispatch();

  const utils = useSelector(state => state.utils);
  const [userData, setUserData] = useState(null);

  const [loadingStatus, setLoadingStatus] = useState('loading');

  async function getUserData() {
    const id = route.params.friendId;
    setLoadingStatus('loading');
    getFriendsDetails(id, utils.token)
      .then(res => {
        setUserData(res.data);
        setLoadingStatus('done');
      })
      .catch(err => {
        setLoadingStatus('error');
        console.log(err, 'getfriendDetails api');
        Toast.show('Failed to get friends details!');
      });
  }
  useEffect(() => {
    getUserData();
  }, []);
  // console.log(route.params.friendId, userData);
  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      <SafeAreaView style={styles.container}>
        <View style={styles.plugViewStyle}>
          <TouchableOpacity
            style={styles.leftIconStyle}
            onPress={() => navigation.goBack()}>
            <Icon
              name="keyboard-backspace"
              type="materialicon"
              size={30}
              color={BaseBackgroundColors.secondary}
            />
          </TouchableOpacity>

          {/* <Text style={styles.plugTextStyle}>Friend Profile</Text> */}
          <View />
        </View>
        {loadingStatus === 'done' && userData != null && (
          <ScrollView showsVerticalScrollIndicator={false}>
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
                  {userData.profileImage != null &&
                    !_.isEmpty(userData.profileImage) &&
                    userData.profileImage != '' && (
                      <Image
                        style={styles.profileImageStyle}
                        source={{
                          uri: userData.profileImage,
                        }}
                      />
                    )}
                  {(userData.profileImage == null ||
                    userData.profileImage == '' ||
                    _.isEmpty(userData.profileImage)) && (
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
                </View>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text numberOfLines={2} style={{color: 'black', fontSize: 26}}>
                  {userData != null &&
                    userData.firstName + ' ' + userData.lastName}
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

            {/* <View style={styles.followContactView}>
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
            <TouchableOpacity
              style={styles.contactBtnstyle}
              onPress={() => Alert.alert('Switchin', 'Coming soon')}>
              <Text
                style={{
                  fontSize: 18,
                  color: BaseBackgroundColors.profileColor,
                }}>
                Profit
              </Text>
            </TouchableOpacity>
          </View> */}

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
                        : 'Not available'}
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
                      data={
                        userData != null && userData.skills != null
                          ? userData.skills
                          : []
                      }
                      keyExtractor={(item, index) => index.toString()}
                      ListEmptyComponent={() => (
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
                  {userData != null && userData.dob != null && (
                    <View style={styles.slide1}>
                      <Text style={styles.normalTextWithGray}>
                        Date of Birth
                      </Text>
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
                        <Text style={styles.normalTextWithGray}>
                          Expirences
                        </Text>
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
                                        color:
                                          BaseBackgroundColors.profileColor,
                                        fontSize: 16,
                                      }}>
                                      {moment(item.startDate).format(
                                        'DD-MMM-YY',
                                      )}
                                    </Text>
                                    <Text
                                      style={{
                                        marginVertical: 5,
                                        marginHorizontal: 5,
                                        color:
                                          BaseBackgroundColors.profileColor,
                                        fontSize: 16,
                                      }}>
                                      -
                                    </Text>
                                    <Text
                                      style={{
                                        marginVertical: 5,
                                        marginHorizontal: 5,
                                        color:
                                          BaseBackgroundColors.profileColor,
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
              onPress={() =>
                navigation.navigate('see-profile', {
                  friendId: route.params.friendId,
                })
              }>
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
        )}
        {loadingStatus == 'loading' && (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator
              size="large"
              color={BaseBackgroundColors.profileColor}
            />
          </View>
        )}
        {loadingStatus == 'error' && (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon
              name="error-outline"
              type="material"
              size={70}
              color={BaseBackgroundColors.profileColor}
            />
            <Text
              style={{
                fontSize: 20,
                color: BaseBackgroundColors.profileColor,
                textAlign: 'center',
                marginTop: 20,
              }}>
              Error occured!
            </Text>
          </View>
        )}
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
    marginTop: 5,

    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
export default FriendProfileScreen;
