import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput, StatusBar} from 'react-native';
import {styles} from '../../styles/contact-styles';
import {BaseBackgroundColors} from '../../styles/constants';
import {Icon, SearchBar} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';

const NewGroupHeader = ({
  navigation,
  showSearch,
  title,
  searchValue,
  onSearch,
  onCancel,
}) => {
  const [isSearching, openSearchBar] = useState(false);
  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      {!isSearching && (
        <View style={styles.headerContianer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="keyboard-backspace"
              type="materialicon"
              size={30}
              color={BaseBackgroundColors.secondary}
            />
          </TouchableOpacity>
          <Text style={styles.headerTittle}>{title}</Text>
          {showSearch && (
            <TouchableOpacity
              style={styles.headerBtn}
              onPress={() => {
                openSearchBar(true);
              }}>
              <Icon
                name="search"
                color={BaseBackgroundColors.secondary}
                type="material"
                size={30}
              />
            </TouchableOpacity>
          )}
          {!showSearch && <View />}
        </View>
      )}
      {isSearching && (
        <View style={[styles.headerContianer, {justifyContent: 'flex-start'}]}>
          <SearchBar
            containerStyle={{
              flexGrow: 1,
              padding: 0,
              borderBottomWidth: 0,
              borderTopWidth: 0,
            }}
            lightTheme
            showCancel={false}
            inputContainerStyle={{backgroundColor: 'white'}}
            placeholder="Search.."
            value={searchValue}
            onChangeText={text => {
              onSearch(text);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              openSearchBar(false);
              onCancel();
            }}
            style={{
              paddingHorizontal: 10,
            }}>
            <Text style={{color: BaseBackgroundColors.profileColor}}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
export default NewGroupHeader;
