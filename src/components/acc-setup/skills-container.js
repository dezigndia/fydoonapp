import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList} from 'react-native';
import {styles} from '../../styles/acc-setup-styles';
import {SearchBar, Icon, Overlay, Button} from 'react-native-elements';

import {useSelector} from 'react-redux';
import {getAllSkills} from '../../apis/account-operations';
import {BaseBackgroundColors} from '../../styles/constants';

const SkillsContainer = props => {
  const [search, setSearch] = useState('');
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [isAddNewSkill, setAddNewSkill] = useState(false);
  const [tempSelection, setTemp] = useState(false);
  const utils = useSelector(state => state.utils);
  const [allSkills, setAllSkills] = useState([]);
  function getSkills() {
    const token = utils.token;
    getAllSkills(token)
      .then(res => {
        const data = res.data.map((item, index) => {
          if (
            props.skills.length > 0 &&
            props.skills.findIndex(myskill => myskill.name === item) !== -1
          ) {
            return {
              name: item.name,
              isAdded: true,
            };
          } else {
            return {
              name: item.name,
              isAdded: false,
            };
          }
        });
        setAllSkills(data);
        setFilteredSkills(data);
      })
      .catch(err => {
        setFilteredSkills([]);

        console.log(err);
      });
  }

  useEffect(() => {
    getSkills();
  }, []);

  function submit() {
    const newSkills = filteredSkills.filter(item => item.isAdded);
    props.onSubmit(newSkills);
  }

  function handleAdd() {
    if (newSkill.trim() != '') {
      const updatedSkills = filteredSkills;
      const skillObj = {
        name: newSkill,
        isAdded: true,
      };
      updatedSkills.unshift(skillObj);
      setAllSkills(updatedSkills);
      setFilteredSkills(updatedSkills);
      setAddNewSkill(false);
      setNewSkill('');
    }
  }
  function handleSearch(value) {
    const searchValue = value.trim().toLowerCase();
    const list = allSkills.filter(item =>
      item.name.toLowerCase().startsWith(searchValue),
    );
    setFilteredSkills(list);
  }

  function selectItem(item) {
    setTemp(!tempSelection);

    item.isAdded = !item.isAdded;

    const index = filteredSkills.findIndex(obj => obj.name === item.name);
    const findex = allSkills.findIndex(obj => obj.name === item.name);
    let data = filteredSkills;
    let fData = allSkills;
    data[index] = item;
    fData[findex] = item;
    setFilteredSkills(data);
    setAllSkills(fData);
  }
  return (
    <>
      {props.backBtn && (
        <TouchableOpacity
          style={{padding: 10, alignSelf: 'flex-start'}}
          onPress={() => props.onBack()}>
          <Icon
            name="times-circle"
            type="font-awesome"
            size={28}
            color={BaseBackgroundColors.profileColor}
          />
        </TouchableOpacity>
      )}
      <SearchBar
        containerStyle={{padding: 0, borderRadius: 8}}
        inputContainerStyle={{
          borderRadius: 4,
          backgroundColor: '#ededed',
        }}
        lightTheme
        placeholder="Search Skill"
        onChangeText={text => {
          handleSearch(text);
          setSearch(text);
        }}
        value={search}
      />
      <TouchableOpacity
        style={styles.addSkillButton}
        onPress={() => {
          setSearch('');
          setFilteredSkills(allSkills);
          setAddNewSkill(!isAddNewSkill);
        }}>
        <Text style={styles.addNewSkillText}>Add new skill</Text>
      </TouchableOpacity>

      <View style={styles.skillsListContainer}>
        {filteredSkills.length > 0 && (
          <FlatList
            extraData={props.skills}
            data={filteredSkills}
            keyExtractor={item => item.name}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.skillsListItem}
                key={index}
                onPress={() => {
                  selectItem(item);
                }}>
                <Text style={styles.skillsListItemName}>{item.name}</Text>
                {item.isAdded && (
                  <Icon
                    name="check-circle"
                    color={BaseBackgroundColors.profileColor}
                  />
                )}
                {!item.isAdded && <View style={styles.skillCircle} />}
              </TouchableOpacity>
            )}
          />
        )}

        {filteredSkills.length == 0 && (
          <Text style={styles.emptylistText}>Please add a new skill</Text>
        )}
        <Button
          onPress={() => submit()}
          title="Submit"
          containerStyle={{marginHorizontal: 10, marginVertical: 10}}
          buttonStyle={{backgroundColor: BaseBackgroundColors.profileColor}}
        />
      </View>

      <Overlay overlayStyle={styles.overlay} isVisible={isAddNewSkill}>
        <Text style={styles.overlayTitle}>Add New Skill</Text>
        <TextInput
          placeholder="Enter skill"
          onChangeText={text => {
            setNewSkill(text);
          }}
          style={styles.overlayInput}
        />
        <View style={styles.overlayButtonContainer}>
          <Button
            title="Cancel"
            titleStyle={styles.cancelBtnTxt}
            buttonStyle={styles.cancelBtnBgClr}
            containerStyle={styles.cancelBtn}
            onPress={() => {
              setAddNewSkill(false);

              setNewSkill('');
            }}
          />
          <Button
            title="Add"
            buttonStyle={styles.addBtnBgClr}
            containerStyle={styles.addBtn}
            onPress={() => {
              handleAdd();
            }}
          />
        </View>
      </Overlay>
    </>
  );
};

export default SkillsContainer;
