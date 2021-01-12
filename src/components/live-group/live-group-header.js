import React, {useState} from 'react';
import {styles} from '../../styles/live-group-styles';
import {View, TouchableOpacity} from 'react-native';
import {Icon, SearchBar} from 'react-native-elements';
import {BaseBackgroundColors} from '../../styles/constants';

const LivGroupHeader = props => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.filterBtn}>
        <Icon
          name={'filter-variant'}
          type="material-community"
          size={32}
          color={BaseBackgroundColors.profileColor}
        />
      </TouchableOpacity>
      <SearchBar
        containerStyle={styles.searchConatiner}
        lightTheme
        placeholder="Search.."
        inputContainerStyle={{
          backgroundColor: 'white',
        }}
        inputStyle={{
          borderBottomWidth: 1,
          paddingBottom: 0,
          borderBottomColor: BaseBackgroundColors.profileColor,
          marginBottom: 10,
        }}
        showCancel={false}
        value={searchValue}
        onChangeText={text => {
          setSearchValue(text);
        }}
      />
    </View>
  );
};
export default LivGroupHeader;
