import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Platform,
  StatusBar,
  ScrollView,
  ImageBackground,
  TextInput,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  getUserDetails,
  sendUserProfilePic,
  getAllSkills,
  uploadProfile,
  sendUserSkills,
  deleteExpirence,
  deleteEducation,
} from '../../../apis/account-operations';
import {formatDate} from '../../../utils/utils';
import {setUserDetails} from '../../../redux/actions/user-details-actions';
import {BaseBackgroundColors} from '../../../styles/constants';
import {Icon, Button, Overlay} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import {mainApi} from '../../../apis/constants';
import AsyncStorage from '@react-native-community/async-storage';
import SkillsContainer from '../../../components/acc-setup/skills-container';
import ExpirenceContainer from '../../../components/acc-setup/expirence-container';
import Toast from 'react-native-simple-toast';
import RNFetchBlob from 'rn-fetch-blob';
import moment from 'moment';

const width = Dimensions.get('window').width;

const SeeProfile = ({navigation, route}) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const utils = useSelector(state => state.utils);
  const {userData} = userDetails;

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [work, setWork] = useState('');
  const [workLocation, setWorkLocation] = useState('');
  const [about, setAbout] = useState('');
  const [skills, setSkills] = useState([]);
  const [expirences, setExpirences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [date, setDate] = useState(new Date());
  const [showCalendar, setCalendar] = useState(false);
  const [modalType, setModalType] = useState('');
  const [errorType, setErrorType] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageType, setImageType] = useState('');
  const [img, setImg] = useState(null);
  const [showSkills, setShowSkills] = useState(false);
  const [selectedItem, selectItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [loadingStatus, setLoadingStatus] = useState('loading');

  const handleDateChange = (e, date) => {
    setCalendar(false);
    if (e.type === 'set') {
      setDate(date);
      const newDate = formatDate(date);
      setDob(newDate);
    }
  };

  const pickImageHandler = () => {
    ImagePicker.showImagePicker(
      {title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
      res => {
        if (res.didCancel) {
          console.log('User cancelled!');
        } else if (res.error) {
          console.log('Error', res.error);
        } else {
          setImageType('');

          setImg(res);
          setImageType('local');
          uploadPic(res);
        }
      },
    );
  };

  function uploadPic(img) {
    const propicData = new FormData();
    propicData.append('IMAGE', img.data);

    // propicData.append('PROFILE_DISPLAY', false);
    sendUserProfilePic(propicData, utils.token)
      .then(res => {
        console.log(res, 'image uploaded');
      })
      .catch(err => {
        console.log(err, 'image error');
      });
  }

  function resetValue(data) {
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setGender(data.gender);
    setWork(data.work);
    setWorkLocation(data.work);
    setAbout(data.about);
    setDate(data.dob);
    setExpirences(data.expirences);
    setEducations(data.educations);
    setDob(moment(data.dob).format('DD-MMM-YY'));
    if (data.profileImage) {
      setImg(data.profileImage);
      setImageType('url');
    }
    const myskills = data.skills.map((item, index) => ({
      name: item,
      isAdded: true,
    }));
    setSkills(myskills);
  }

  function submitDetails() {
    setErrorType('');
    setError('');
    const fname = firstname.trim();
    const lname = lastname.trim();
    if (!fname) {
      setError("First name can't be empty");
      setErrorType('firstname');
    } else if (!lastname) {
      setError("Last name can't be empty");
      setErrorType('lastname');
    } else {
      setLoading(true);
      const data = new FormData();
      data.append('first_name', fname);
      data.append('last_name', lname);
      data.append('GENDER', gender);
      data.append('DATE_OF_BIRTH', dob);
      data.append('WORK', work);
      data.append('WORK_LOCATION', workLocation);
      data.append('ABOUT', about);

      uploadProfile(data, utils.token)
        .then(async res => {
          setLoading(false);
          getUserData();
          console.log(res);
        })
        .catch(err => {
          setLoading(false);
          setError('Request Failed!');
          console.log(err);
        });

      if (skills.length > 0) {
        const addedskills = skills.filter(item => item.isAdded);
        if (addedskills.length > 0) {
          const fskills = addedskills.map(item => item.name);
          let skillsData = new FormData();

          skillsData.append('skills', JSON.stringify(fskills));

          sendUserSkills(skillsData, utils.token)
            .then(res => console.log(res, 'skills posted'))
            .catch(err => console.log(err, 'skills error'));
        }
      }
    }
  }
  async function getUserData() {
    setLoadingStatus('loading');
    getUserDetails(utils.token)
      .then(res => {
        //  dispatch(setUserDetails(res.data));
        resetValue(res.data);
        setLoadingStatus('done');
      })
      .catch(err => {
        setLoadingStatus('error');
        console.log(err, 'getUserdetails api');
      });
  }
  function handleDeleteExpirence(item, index) {
    deleteExpirence(item.id, utils.token)
      .then(res => {
        let newExpirences = expirences;
        let updatedExpirences = newExpirences.filter(i => i.id !== item.id);

        setExpirences(updatedExpirences);

        Toast.show('Expirence removed!', Toast.SHORT);
      })
      .catch(err => {
        Toast.show('Unable to remove expirence!', Toast.SHORT);
        console.log(err.response.data);
      });
  }
  function handleDeleteEducation(item, index) {
    deleteEducation(item.id, utils.token)
      .then(res => {
        let newEducations = educations;
        let updatedEducations = newEducations.filter(i => i.id !== item.id);

        setEducations(updatedEducations);

        Toast.show('Education removed!', Toast.SHORT);
      })
      .catch(err => {
        Toast.show('Unable to remove education!', Toast.SHORT);
        console.log(err.response.data);
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
      <View style={styles.container}>
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
          <Text style={styles.plugTextStyle}>See Profile</Text>
        </View>
        {loadingStatus === 'done' && (
          <ScrollView>
            {/* upload photo */}
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: width,
              }}>
              <View
                style={{
                  height: 160,
                  width: 160,
                  borderRadius: 80,
                  backgroundColor: 'rgb(243,245,249)',
                  marginTop: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    height: 140,
                    width: 140,
                    borderRadius: 70,
                    backgroundColor: BaseBackgroundColors.profileColor,
                    flexDirection: 'row',
                  }}>
                  {imageType != '' && (
                    <Image
                      style={styles.profileImageStyle}
                      source={{
                        uri: `${
                          imageType === 'local'
                            ? 'data:' + img.type + ';base64,' + img.data
                            : img
                        }`,
                      }}
                    />
                  )}
                  {imageType === '' && (
                    <View style={styles.profileImageStyle}>
                      <Text style={styles.firstLetter}>
                        {userData ? userData.firstName[0].toUpperCase() : ''}
                      </Text>
                    </View>
                  )}
                  {/* <TouchableOpacity
                  onPress={() => pickImageHandler()}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                    backgroundColor: BaseBackgroundColors.profileColor,
                    marginTop: '60%',
                    marginLeft: '-30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    type="font-awesome"
                    size={22}
                    color="white"
                  />
                </TouchableOpacity> */}
                </View>
              </View>
              {/* <Text style={{fontSize: 16, color: 'grey', marginTop: 20}}>
              Upload Profile Picture
            </Text> */}
            </View>

            {/* form */}

            <View style={{marginTop: 40, marginHorizontal: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, color: 'grey'}}>First name</Text>
                <View
                  style={{
                    height: 1,
                    flexGrow: 1,
                    backgroundColor: BaseBackgroundColors.profileColor,
                    marginLeft: 20,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                  marginHorizontal: 20,
                }}>
                <View style={{flexGrow: 1}}>
                  <TextInput
                    value={firstname}
                    editable={false}
                    placeholder="Enter first name"
                    onChangeText={text => {
                      setError('');
                      setErrorType('');
                      setFirstName(text);
                    }}
                    style={{
                      color: BaseBackgroundColors.profileColor,
                      fontSize: 16,
                    }}
                  />
                </View>
                {errorType === 'firstname' && (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Icon
                      name="times-circle"
                      type="font-awesome"
                      size={28}
                      color={'red'}
                    />
                  </View>
                )}
              </View>
            </View>

            <View style={{marginTop: 20, marginHorizontal: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, color: 'grey'}}>Last name</Text>
                <View
                  style={{
                    height: 1,
                    flexGrow: 1,
                    backgroundColor: BaseBackgroundColors.profileColor,
                    marginLeft: 20,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                  marginHorizontal: 20,
                }}>
                <View style={{flexGrow: 1}}>
                  <TextInput
                    value={lastname}
                    editable={false}
                    placeholder="Enter last name"
                    onChangeText={text => {
                      setError('');
                      setErrorType('');
                      setLastName(text);
                    }}
                    style={{
                      color: BaseBackgroundColors.profileColor,
                      fontSize: 16,
                    }}
                  />
                </View>
                {errorType === 'lastname' && (
                  <View
                    style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Icon
                      name="times-circle"
                      type="font-awesome"
                      size={28}
                      color={'red'}
                    />
                  </View>
                )}
              </View>
            </View>
            <View style={{marginTop: 20, marginHorizontal: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, color: 'grey'}}>Date of birth</Text>
                <View
                  style={{
                    height: 1,
                    flexGrow: 1,
                    backgroundColor: BaseBackgroundColors.profileColor,
                    marginLeft: 20,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                  marginHorizontal: 20,
                }}>
                <View style={{flexGrow: 1}}>
                  <TextInput
                    editable={false}
                    value={dob}
                    placeholder="Enter your birth date"
                    style={{
                      color: BaseBackgroundColors.profileColor,
                      fontSize: 16,
                    }}
                  />
                </View>
                {/* <TouchableOpacity
                onPress={() => setCalendar(true)}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: BaseBackgroundColors.profileColor,
                  }}>
                  Edit
                </Text>
              </TouchableOpacity> */}
              </View>
            </View>
            <View style={{marginTop: 20, marginHorizontal: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, color: 'grey'}}>Gender</Text>
                <View
                  style={{
                    height: 1,
                    flexGrow: 1,
                    backgroundColor: BaseBackgroundColors.profileColor,
                    marginLeft: 20,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',

                  marginVertical: 20,
                  marginHorizontal: 20,
                }}>
                {gender === 'male' && (
                  <TouchableOpacity
                    style={[
                      {
                        marginRight: 20,
                        borderRadius: 4,
                        paddingHorizontal: 8,
                        backgroundColor: 'white',
                      },
                    ]}
                    onPress={() => {
                      //   setErrorType('');
                      //   setError('');
                      //   setGender('male');
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: BaseBackgroundColors.profileColor,
                      }}>
                      Male
                    </Text>
                  </TouchableOpacity>
                )}
                {gender === 'female' && (
                  <TouchableOpacity
                    style={[
                      {
                        marginRight: 20,
                        borderRadius: 4,
                        paddingHorizontal: 8,
                        backgroundColor: 'white',
                      },
                    ]}
                    onPress={() => {
                      //   setErrorType('');
                      //   setError('');
                      //   setGender('female');
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: BaseBackgroundColors.profileColor,
                      }}>
                      Female
                    </Text>
                  </TouchableOpacity>
                )}
                {gender === 'others' && (
                  <TouchableOpacity
                    style={[
                      {
                        marginRight: 20,
                        borderRadius: 4,
                        paddingHorizontal: 8,
                        backgroundColor: 'white',
                      },
                    ]}
                    onPress={() => {
                      //   setErrorType('');
                      //   setError('');
                      //   setGender('others');
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: BaseBackgroundColors.profileColor,
                      }}>
                      Other
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={{marginTop: 10, marginHorizontal: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, color: 'grey'}}>Work</Text>
                <View
                  style={{
                    height: 1,
                    flexGrow: 1,
                    backgroundColor: BaseBackgroundColors.profileColor,
                    marginLeft: 20,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                  marginHorizontal: 20,
                }}>
                <View style={{flexGrow: 1}}>
                  <TextInput
                    editable={false}
                    value={work}
                    placeholder="No work update!"
                    onChangeText={text => {
                      setWork(text);
                    }}
                    style={{
                      color: BaseBackgroundColors.profileColor,
                      fontSize: 16,
                    }}
                  />
                </View>
                {/* <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: BaseBackgroundColors.profileColor,
                }}>
                Edit
              </Text>
            </TouchableOpacity> */}
              </View>
            </View>
            <View style={{marginTop: 20, marginHorizontal: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, color: 'grey'}}>Work location</Text>
                <View
                  style={{
                    height: 1,
                    flexGrow: 1,
                    backgroundColor: BaseBackgroundColors.profileColor,
                    marginLeft: 20,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                  marginHorizontal: 20,
                }}>
                <View style={{flexGrow: 1}}>
                  <TextInput
                    editable={false}
                    value={workLocation}
                    placeholder="No Work location"
                    onChangeText={text => {
                      setWorkLocation(text);
                    }}
                    style={{
                      color: BaseBackgroundColors.profileColor,
                      fontSize: 16,
                    }}
                  />
                </View>
                {/* <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: BaseBackgroundColors.profileColor,
                }}>
                Edit
              </Text>
            </TouchableOpacity> */}
              </View>
            </View>

            <View style={{marginTop: 20, marginHorizontal: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, color: 'grey'}}>About </Text>
                <View
                  style={{
                    height: 1,
                    flexGrow: 1,
                    backgroundColor: BaseBackgroundColors.profileColor,
                    marginLeft: 20,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                  marginHorizontal: 20,
                }}>
                <View style={{flexGrow: 1}}>
                  <TextInput
                    editable={false}
                    value={about}
                    placeholder="Not Available"
                    onChangeText={text => {
                      setAbout(text);
                    }}
                    style={{
                      color: BaseBackgroundColors.profileColor,
                      fontSize: 16,
                    }}
                  />
                </View>
                {/* <TouchableOpacity
              style={{alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  color: BaseBackgroundColors.profileColor,
                }}>
                Edit
              </Text>
            </TouchableOpacity> */}
              </View>
            </View>

            <View style={{marginHorizontal: 20, marginTop: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 16, color: 'grey'}}>Skills</Text>
                <View
                  style={{
                    height: 1,
                    flexGrow: 1,
                    backgroundColor: BaseBackgroundColors.profileColor,
                    marginLeft: 20,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                  marginHorizontal: 20,
                }}>
                <FlatList
                  data={skills}
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
                        <Text style={{margin: 5, color: 'white', fontSize: 14}}>
                          No skills available
                        </Text>
                      </View>
                    </View>
                  )}
                  contentContainerStyle={{
                    flex: 1,
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
                    return (
                      <View style={{marginTop: 10}}>
                        <View
                          style={{
                            backgroundColor: BaseBackgroundColors.profileColor,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginLeft: 5,
                            paddingHorizontal: 8,
                            borderRadius: 20,
                            flexDirection: 'row',
                          }}>
                          <Text
                            style={{
                              marginVertical: 5,
                              marginHorizontal: 5,
                              color: 'white',
                              fontSize: 18,
                            }}>
                            {item.name}
                          </Text>
                          {/* <TouchableOpacity
                          onPress={() => {
                            const newSkills = skills.filter(
                              curr => curr.name !== item.name,
                            );
                            setSkills(newSkills);
                          }}>
                          <Icon
                            name="times"
                            type="font-awesome"
                            size={25}
                            color="white"
                          />
                        </TouchableOpacity> */}
                        </View>
                      </View>
                    );
                  }}
                />
                {/* <TouchableOpacity
                onPress={() => {
                  setShowSkills(true);
                }}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: BaseBackgroundColors.profileColor,
                  }}>
                  Add
                </Text>
              </TouchableOpacity> */}
              </View>
            </View>
            <View style={{marginHorizontal: 20, marginTop: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 16, color: 'grey'}}>Expirences</Text>
                <View
                  style={{
                    height: 1,
                    flexGrow: 1,
                    backgroundColor: BaseBackgroundColors.profileColor,
                    marginLeft: 20,
                  }}
                />
              </View>
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 20,
                }}>
                {/* <TouchableOpacity
                onPress={() => {
                  setModalType('expirence');
                  setShowModal(true);
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: BaseBackgroundColors.profileColor,
                  }}>
                  Add
                </Text>
              </TouchableOpacity> */}
                <FlatList
                  data={expirences}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={() => (
                    <View style={{marginTop: 10}}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: 5,
                          borderRadius: 20,
                        }}>
                        <Text
                          style={{
                            margin: 5,
                            color: BaseBackgroundColors.profileColor,
                            fontSize: 14,
                          }}>
                          No Expirences available
                        </Text>
                      </View>
                    </View>
                  )}
                  contentContainerStyle={{
                    flex: 1,
                    marginTop: 20,
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        style={{marginTop: 10}}
                        onPress={() => {
                          // selectItem({...item, index: index});
                          // setModalType('expirence');
                          // setShowModal(true);
                        }}>
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
                              {item.START_YEAR}
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
                              {item.END_YEAR}
                            </Text>
                          </View>
                          {/* <TouchableOpacity
                          onPress={() => {
                            handleDeleteExpirence(item, index);
                          }}>
                          <Icon
                            name="delete"
                            type="material"
                            size={25}
                            color={'grey'}
                          />
                        </TouchableOpacity> */}
                        </View>
                        <Text
                          style={{
                            marginVertical: 5,
                            marginHorizontal: 5,
                            color: BaseBackgroundColors.secondary,
                            fontSize: 16,
                            alignSelf: 'flex-start',
                          }}>
                          {item.DESCRIPTION}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>
            <View style={{marginHorizontal: 20, marginTop: 20}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 16, color: 'grey'}}>Education</Text>
                <View
                  style={{
                    height: 1,
                    flexGrow: 1,
                    backgroundColor: BaseBackgroundColors.profileColor,
                    marginLeft: 20,
                  }}
                />
              </View>
              <View
                style={{
                  marginVertical: 10,
                  marginHorizontal: 20,
                }}>
                {/* <TouchableOpacity
                onPress={() => {
                  setShowModal(true);
                  setModalType('education');
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-end',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: BaseBackgroundColors.profileColor,
                  }}>
                  Add
                </Text>
              </TouchableOpacity> */}
                <FlatList
                  data={educations}
                  showsVerticalScrollIndicator={false}
                  ListEmptyComponent={() => (
                    <View style={{marginTop: 10}}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: 5,
                          borderRadius: 20,
                        }}>
                        <Text
                          style={{
                            margin: 5,
                            color: BaseBackgroundColors.profileColor,
                            fontSize: 14,
                          }}>
                          No Education available
                        </Text>
                      </View>
                    </View>
                  )}
                  contentContainerStyle={{
                    flex: 1,
                    marginTop: 20,
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        style={{marginTop: 10}}
                        onPress={() => {
                          // selectItem({...item, index: index});
                          // setModalType('education');
                          // setShowModal(true);
                        }}>
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
                              {item.START_YEAR}
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
                              {item.END_YEAR}
                            </Text>
                          </View>
                          {/* <TouchableOpacity
                          onPress={() => {
                            handleDeleteEducation(item, index);
                          }}>
                          <Icon
                            name="delete"
                            type="material"
                            size={25}
                            color={'grey'}
                          />
                        </TouchableOpacity> */}
                        </View>
                        <Text
                          style={{
                            marginVertical: 5,
                            marginHorizontal: 5,
                            color: BaseBackgroundColors.secondary,
                            fontSize: 16,
                            alignSelf: 'flex-start',
                          }}>
                          {item.DESCRIPTION}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            </View>

            {error !== '' && (
              <Text
                style={{
                  alignSelf: 'center',
                  marginVertical: 10,
                  color: 'red',
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                {error}
              </Text>
            )}
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
        {/* <Button
          onPress={() => {
            if (!loading) submitDetails();
          }}
          title="Update"
          icon={
            loading && (
              <ActivityIndicator
                size={22}
                color={BaseBackgroundColors.secondary}
                style={{marginHorizontal: 10}}
              />
            )
          }
          containerStyle={{marginHorizontal: 20, marginBottom: 20}}
          buttonStyle={{
            backgroundColor: BaseBackgroundColors.profileColor,
          }}
        /> */}
        {showCalendar && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            maximumDate={new Date()}
            display="default"
            onChange={(e, date) => {
              handleDateChange(e, date);
            }}
          />
        )}
        <Overlay
          isVisible={showSkills}
          onBackdropPress={() => setShowSkills(false)}
          fullScreen
          onRequestClose={() => setShowSkills(false)}
          children={
            <SkillsContainer
              skills={skills}
              backBtn={true}
              onBack={() => setShowSkills(false)}
              onSubmit={newSkills => {
                setSkills(newSkills);
                setShowSkills(false);
              }}
            />
          }
        />
        <Overlay
          isVisible={showModal}
          onBackdropPress={() => setShowModal(true)}
          onRequestClose={() => {
            setShowModal(false);
            selectItem(null);
          }}
          children={
            <ExpirenceContainer
              modalType={modalType}
              onCancel={() => {
                setShowModal(false);
                selectItem(null);
              }}
              addExpirence={expirence => {
                let newExpirences = expirences;
                newExpirences.push(expirence);
                setExpirences(newExpirences);
                selectItem(null);
                setShowModal(false);
              }}
              addEducation={education => {
                let newEducations = educations;
                newEducations.push(education);
                setEducations(newEducations);
                selectItem(null);
                setShowModal(false);
              }}
              editEducation={education => {
                let newEducations = educations;
                newEducations[selectedItem.index] = education;
                setEducations(newEducations);
                selectItem(null);
                setShowModal(false);
              }}
              editExpirence={expirence => {
                //not working yet
                let newExpirences = expirences;
                newExpirences[selectedItem.index] = expirence;
                setExpirences(newExpirences);
                selectItem(null);
                setShowModal(false);
              }}
              expirences={expirences}
              currExpience={selectedItem}
            />
          }
        />
      </View>
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
    alignSelf: 'center',
  },
  plugTextStyle: {
    fontSize: 18,
    color: BaseBackgroundColors.profileColor,
    marginLeft: '22%',
  },
  leftIconStyle: {
    height: 20,
    width: 30,
    resizeMode: 'stretch',
    marginLeft: 20,
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
});

export default SeeProfile;
