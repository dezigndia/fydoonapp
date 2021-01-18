import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  SafeAreaView,
  Image,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {styles} from '../../../styles/acc-setup-styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Geolocation from '@react-native-community/geolocation';
import {Icon, Button} from 'react-native-elements';
import {
  uploadProfile,
  getAllSkills,
  sendUserSkills,
  sendUserProfilePic,
} from '../../../apis/account-operations';
import {BaseBackgroundColors} from '../../../styles/constants';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import SkillsContainer from '../../../components/acc-setup/skills-container';
import DateTimePicker from '@react-native-community/datetimepicker';
import {formatDate} from '../../../utils/utils';
import {useSelector, useDispatch} from 'react-redux';
import {checkIsAccountSetuped} from '../../../redux/actions/utils-actions';
import {acc} from 'react-native-reanimated';

const AccountSetupScreen = props => {
  //console.disableYellowBox = true;
  const [showSkill, setShowSkills] = useState(false);
  const [img, setImg] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDOB] = useState('');
  const [gender, setGender] = useState('male');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState('');
  const [showCalendar, setCalendar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [skills, setSkills] = useState([]);
  const [work, setWork] = useState('');
  // Geolocation.getCurrentPosition((info) => console.log(info));

  const utils = useSelector(state => state.utils);
  const dispatch = useDispatch();

  function handleNext() {
    setError('');
    setErrorType('');

    if (firstName.trim() === '') {
      setErrorType('firstname');
      setError("First name can't be empty!");
      return;
    } else if (lastName.trim() === '') {
      setErrorType('lastname');
      setError("Last name can't be empty!");
      return;
    } else if (dob.trim() === '') {
      setErrorType('lastname');
      setError("Last name can't be empty!");
      return;
    } else {
      // setShowSkills(!showSkill); change this to enable skill container
      handlesubmit();
    }
  }
  async function handlesubmit() {
    setError('');
    setErrorType('');

    setLoading(true);
    const data = {
      firstName,
      lastName,
      gender,
      work,
      workLocation: '',
      about: '',
      dob,
      skills: [],
      experiences: [],
      educations: [],
    };
    const token = await AsyncStorage.getItem('token');
    uploadProfile(data, token)
      .then(async user_res => {
        if (img) {
          const propicData = {
            profileImage: 'data:image/jpeg;base64,' + img.data,
          };

          sendUserProfilePic(propicData, token)
            .then(res => {
              dispatch(checkIsAccountSetuped(true));
              setLoading(false);
              console.log(res, 'image uploaded');
              props.navigation.replace('home');
            })
            .catch(err => {
              console.log(err, 'image error');
            });
        } else {
          dispatch(checkIsAccountSetuped(true));
          setLoading(false);
          // console.log(user_res);

          props.navigation.replace('home');
        }
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
        let skillsData = {
          skills: fskills,
        };

        sendUserSkills(skillsData, token)
          .then(res => console.log(res, 'skills posted'))
          .catch(err => console.log(err, 'skills error'));
      }
    }
  }
  const pickImageHandler = () => {
    ImagePicker.showImagePicker(
      {title: 'Pick an Image', maxWidth: 800, maxHeight: 600},
      res => {
        if (res.didCancel) {
          console.log('User cancelled!');
        } else if (res.error) {
          console.log('Error', res.error);
        } else {
          setImg(res);
        }
      },
    );
  };

  const handleDateChange = (e, date) => {
    setCalendar(false);
    if (e.type === 'set') {
      setDate(date);
      const newDate = formatDate(date);
      setDOB(newDate);
    }
  };

  // useEffect(() => {
  //   getSkills();
  // }, []);
  function getSkills() {
    const token = utils.token;
    console.log(token);
    getAllSkills(token)
      .then(res => {
        const data = res.data.skill_list.map((item, index) => ({
          name: item,
          isAdded: false,
        }));
        setSkills(data);
        setLoading(false);
      })
      .catch(err => {
        setSkills([]);
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={BaseBackgroundColors.primary}
      />
      <SafeAreaView style={styles.mainContainer}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="always">
          <View style={styles.m20}>
            <View style={[styles.imageContainer]}>
              {!img && !showSkill && (
                <Icon
                  name="person"
                  size={150}
                  color="white"
                  style={styles.imgDefaultIcon}
                />
              )}
              {!img && showSkill && (
                <Text style={styles.defaultLetter}>
                  {firstName !== '' ? firstName[0].toUpperCase() : 'S'}
                </Text>
              )}
              {img && (
                <Image
                  source={{uri: 'data:image/jpeg;base64,' + img.data}}
                  style={styles.inputImage}
                />
              )}
              {!showSkill && (
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
            <Text style={styles.accSetupTitile}>Account Setup</Text>
            <Text style={styles.accSetupSubTitile}>
              {!showSkill
                ? "Few more steps & we're done"
                : `Hi ${firstName}, you are almost there`}
            </Text>
            {showSkill && (
              <SkillsContainer skills={skills} setSkills={setSkills} />
            )}
            {!showSkill && (
              <>
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        borderColor: errorType === 'firstname' ? 'red' : 'grey',
                        marginRight: 10,
                      },
                    ]}
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={text => {
                      setError('');
                      setErrorType();
                      setFirstName(text);
                    }}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      {
                        marginLeft: 10,
                        borderColor: errorType === 'lastname' ? 'red' : 'grey',
                      },
                    ]}
                    placeholder="Last Name"
                    value={lastName}
                    onChangeText={text => {
                      setError('');
                      setErrorType('');
                      setLastName(text);
                    }}
                  />
                </View>
                <View style={styles.genderContainer}>
                  <Text style={styles.genderText}>Gender:</Text>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      {
                        backgroundColor:
                          gender === 'male'
                            ? BaseBackgroundColors.primary
                            : 'white',
                      },
                    ]}
                    onPress={() => {
                      setErrorType('');
                      setError('');
                      setGender('male');
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: gender === 'male' ? 'white' : 'grey',
                      }}>
                      Male
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      {
                        backgroundColor:
                          gender === 'female'
                            ? BaseBackgroundColors.primary
                            : 'white',
                      },
                    ]}
                    onPress={() => {
                      setErrorType('');
                      setError('');
                      setGender('female');
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: gender === 'female' ? 'white' : 'grey',
                      }}>
                      Female
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.genderButton,
                      {
                        backgroundColor:
                          gender === 'others'
                            ? BaseBackgroundColors.primary
                            : 'white',
                      },
                    ]}
                    onPress={() => {
                      setErrorType('');
                      setError('');
                      setGender('others');
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: gender === 'others' ? 'white' : 'grey',
                      }}>
                      Other
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setError('');
                    setErrorType('');
                    setCalendar(true);
                  }}>
                  <TextInput
                    editable={false}
                    style={styles.input}
                    placeholder="Date of Birth"
                    value={dob}
                  />
                </TouchableOpacity>
                <TextInput
                  style={[
                    styles.input,
                    {
                      borderColor: errorType === 'work' ? 'red' : 'grey',
                      marginRight: 5,
                    },
                  ]}
                  placeholder='Work "what do you do?"'
                  value={work}
                  onChangeText={text => {
                    setError('');
                    setErrorType();
                    setWork(text);
                  }}
                />
                {error !== '' && <Text style={styles.errorText}>{error}</Text>}
              </>
            )}
          </View>
          <Button
            title={'Submit'}
            icon={
              loading && (
                <ActivityIndicator
                  size={18}
                  color="white"
                  style={{marginHorizontal: 10}}
                />
              )
            }
            containerStyle={styles.buttonContainer}
            buttonStyle={{backgroundColor: '#485A96'}}
            onPress={() => {
              if (!loading) {
                handleNext();
              }
            }}
          />
        </KeyboardAwareScrollView>
      </SafeAreaView>
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
    </>
  );
};

export default AccountSetupScreen;
