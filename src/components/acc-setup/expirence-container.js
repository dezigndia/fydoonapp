import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from 'react-native';
import {styles} from '../../styles/acc-setup-styles';
import {SearchBar, Icon, Overlay, Button} from 'react-native-elements';

import {BaseBackgroundColors} from '../../styles/constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import {formatDate} from '../../utils/utils';
import {useSelector} from 'react-redux';
import {
  editExpirence,
  addEducation,
  editEducation,
  addExpirence,
} from '../../apis/account-operations';
import Toast from 'react-native-simple-toast';

const ExpirenceContainer = props => {
  const utils = useSelector(state => state.utils);

  const [showCalendar, setShowCalendar] = useState(false);
  const [sdate, setSDate] = useState(
    props.currExpience ? new Date(props.currExpience.START_YEAR) : new Date(),
  );
  const [edate, setEDate] = useState(
    props.currExpience ? new Date(props.currExpience.END_YEAR) : new Date(),
  );
  const [currSelection, setCurrentSelection] = useState('');
  const [description, setDescription] = useState(
    props.currExpience ? props.currExpience.DESCRIPTION : '',
  );
  const [formatedSDate, setFormatedSDate] = useState(
    props.currExpience ? props.currExpience.START_YEAR : '',
  );
  const [formatedEDate, setFormatedEDate] = useState(
    props.currExpience ? props.currExpience.END_YEAR : '',
  );
  const [errorType, setErrorType] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDateChange = (e, date) => {
    setShowCalendar(false);
    if (e.type === 'set') {
      if (currSelection === 'sdate') {
        setSDate(date);
        const newSdate = formatDate(date);
        setFormatedSDate(newSdate);
        return;
      } else if (currSelection === 'edate') {
        setEDate(date);
        const newEdate = formatDate(date);
        setFormatedEDate(newEdate);
        return;
      }
    }
  };
  const handleSubmit = () => {
    setError('');
    setErrorType('');
    if (!formatedSDate) {
      setError('Enter start date!');
      setErrorType('date');
    } else if (!formatedEDate) {
      setError('Enter end date!');
      setErrorType('date');
    } else if (description == '') {
      setError('Enter a description!');
      setErrorType('description');
    } else {
      setLoading(true);
      if (props.currExpience) {
        //edit expirence
        let data = new FormData();
        data.append('START_YEAR', formatedSDate);
        data.append('END_YEAR', formatedEDate);
        data.append('DESCRIPTION', description);
        if (props.modalType == 'education') {
          editEducation(data, props.currExpience.id, utils.token)
            .then(res => {
              setLoading(false);
              props.editEducation(res.data);
              Toast.show('Education has been edited', Toast.SHORT);
            })
            .catch(err => {
              console.log(err.response.data);
              setLoading(false);
              Toast.show('Unable to edit education!', Toast.SHORT);
            });
        } else if (props.modalType == 'expirence') {
          editExpirence(data, props.currExpience.id, utils.token)
            .then(res => {
              setLoading(false);
              props.editExpirence(res.data);
              Toast.show('Expirence has been edited', Toast.SHORT);
            })
            .catch(err => {
              console.log(err.response.data);
              setLoading(false);
              Toast.show('Unable to edit expirence!', Toast.SHORT);
            });
        }
      } else {
        //add new expirence
        let data = new FormData();
        data.append('START_YEAR', formatedSDate);
        data.append('END_YEAR', formatedEDate);
        data.append('DESCRIPTION', description);
        if (props.modalType === 'education') {
          addEducation(data, utils.token)
            .then(res => {
              console.log(res);
              setLoading(false);
              props.addEducation(res.data);
              Toast.show('Education has been added', Toast.SHORT);
            })
            .catch(err => {
              console.log(err.response.data);
              setLoading(false);

              Toast.show('Unable to add education!', Toast.SHORT);
            });
        } else if (props.modalType === 'expirence') {
          addExpirence(data, utils.token)
            .then(res => {
              console.log(res);
              setLoading(false);
              props.addExpirence(res.data);
              Toast.show('Expirence has been added', Toast.SHORT);
            })
            .catch(err => {
              console.log(err.response.data);
              setLoading(false);

              Toast.show('Unable to add expirence!', Toast.SHORT);
            });
        }
      }
    }
  };
  let width = Dimensions.get('window').width - 100;
  return (
    <>
      <View style={([styles.overlay], {width: width})}>
        <Text style={styles.overlayTitle}>
          {props.modalType === 'expirence' && !props.currExpience
            ? 'Add new expirence'
            : props.modalType === 'expirence' && props.currExpience
            ? 'Edit expirence'
            : null}
          {props.modalType === 'education' && !props.currExpience
            ? 'Add new education'
            : props.modalType === 'education' && props.currExpience
            ? 'Edit education'
            : null}
        </Text>
        <ScrollView style={{maxHeight: 500}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginTop: 20, marginLeft: 10, marginRight: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, color: 'grey'}}>Start Date</Text>
                <View
                  style={{
                    height: 1,
                    flexGrow: 1,
                    backgroundColor: BaseBackgroundColors.profileColor,
                    marginLeft: 10,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <View style={{flexGrow: 1}}>
                  <TouchableOpacity
                    onPress={() => {
                      if (!loading) {
                        setCurrentSelection('sdate');
                        setErrorType('');
                        setError('');
                        setShowCalendar(true);
                      }
                    }}>
                    <TextInput
                      editable={false}
                      value={formatedSDate}
                      placeholder="Enter start date"
                      style={{
                        color: BaseBackgroundColors.profileColor,
                        fontSize: 16,
                      }}
                    />
                  </TouchableOpacity>

                  {/* <TextInput
                  editable={!loading}
                  value={formatedDate}
                  maxLength={4}
                  keyboardType="number-pad"
                  placeholder="Enter year"
                  style={{
                    color: BaseBackgroundColors.profileColor,
                    fontSize: 16,
                  }}
                  onChangeText={text => {
                    setErrorType('');
                    setError('');
                    setFormatedDate(text);
                  }}
                /> */}
                </View>
              </View>
            </View>
            <View style={{marginTop: 20, marginRight: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, color: 'grey'}}>End Date</Text>
                <View
                  style={{
                    height: 1,
                    flexGrow: 1,
                    backgroundColor: BaseBackgroundColors.profileColor,
                    marginLeft: 10,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                }}>
                <View style={{flexGrow: 1}}>
                  <TouchableOpacity
                    onPress={() => {
                      if (!loading) {
                        setCurrentSelection('edate');
                        setErrorType('');
                        setError('');
                        setShowCalendar(true);
                      }
                    }}>
                    <TextInput
                      editable={false}
                      value={formatedEDate}
                      placeholder="Enter end date"
                      style={{
                        color: BaseBackgroundColors.profileColor,
                        fontSize: 16,
                      }}
                    />
                  </TouchableOpacity>

                  {/* <TextInput
                  editable={!loading}
                  value={formatedDate}
                  maxLength={4}
                  keyboardType="number-pad"
                  placeholder="Enter year"
                  style={{
                    color: BaseBackgroundColors.profileColor,
                    fontSize: 16,
                  }}
                  onChangeText={text => {
                    setErrorType('');
                    setError('');
                    setFormatedDate(text);
                  }}
                /> */}
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 20,
              marginHorizontal: 20,
            }}>
            <Text style={{fontSize: 16, color: 'grey'}}>Description</Text>
            <View
              style={{
                height: 1,
                flexGrow: 1,
                backgroundColor: BaseBackgroundColors.profileColor,
                marginLeft: 10,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 10,
              marginBottom: 10,
              marginHorizontal: 20,
            }}>
            <View style={{flexGrow: 1}}>
              <TextInput
                multiline
                editable={!loading}
                value={description}
                placeholder="Enter description"
                onChangeText={text => {
                  setError('');
                  setErrorType('');
                  setDescription(text);
                }}
                style={{
                  color: BaseBackgroundColors.profileColor,
                  fontSize: 16,
                }}
              />
            </View>
            {errorType === 'description' && (
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Icon
                  name="times-circle"
                  type="font-awesome"
                  size={28}
                  color={'red'}
                />
              </View>
            )}
          </View>
          {error !== '' && (
            <Text
              style={{
                alignSelf: 'center',
                marginBottom: 10,
                color: 'red',
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              {error}
            </Text>
          )}
          <View style={styles.overlayButtonContainer}>
            <Button
              title="Cancel"
              titleStyle={styles.cancelBtnTxt}
              buttonStyle={styles.cancelBtnBgClr}
              containerStyle={styles.cancelBtn}
              onPress={() => {
                if (!loading) {
                  props.onCancel();
                }
              }}
            />
            <Button
              title={'Submit'}
              icon={
                loading && (
                  <ActivityIndicator
                    size={22}
                    color={'white'}
                    style={{marginHorizontal: 10}}
                  />
                )
              }
              onPress={() => {
                if (!loading) {
                  handleSubmit();
                }
              }}
              buttonStyle={styles.addBtnBgClr}
              containerStyle={styles.addBtn}
            />
          </View>
        </ScrollView>
      </View>

      {showCalendar && (
        <DateTimePicker
          testID="dateTimePicker"
          value={currSelection === 'edate' ? edate : sdate}
          mode={'date'}
          minimumDate={
            currSelection === 'edate' && formatedSDate ? sdate : null
          }
          maximumDate={currSelection === 'edate' ? new Date() : edate}
          display="default"
          onChange={(e, date) => {
            handleDateChange(e, date);
          }}
        />
      )}
    </>
  );
};

export default ExpirenceContainer;
