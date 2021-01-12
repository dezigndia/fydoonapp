import React, {useState} from 'react';
import {styles} from '../../styles/live-group-styles';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import {BaseBackgroundColors} from '../../styles/constants';

const MyGroupHeader = ({
  navigation,
  title,
  searchValue,
  onSearch,
  onCancel,
}) => {
  const [isSearching, openSearchBar] = useState(false);
  return (
    <>
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
          <TouchableOpacity
            style={styles.headerBtn}
            onPress={() => {
              openSearchBar(true);
            }}>
            <Icon
              name="search"
              color={BaseBackgroundColors.profileColor}
              type="material"
              size={30}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Icon
              name={'bell'}
              type="material-community"
              size={30}
              color={BaseBackgroundColors.profileColor}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterBtn}>
            <Icon
              name={'filter-variant'}
              type="material-community"
              size={30}
              color={BaseBackgroundColors.profileColor}
            />
          </TouchableOpacity>
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
            placeholder="Search.."
            inputContainerStyle={{
              backgroundColor: 'white',
            }}
            showCancel={false}
            value={searchValue}
            onChangeText={text => {
              onSearch(text);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              openSearchBar(false);
              if (onCancel) {
                onCancel();
              }
            }}
            style={{
              padding: 10,
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
export default MyGroupHeader;
