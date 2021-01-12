import React, {useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {styles} from '../../../styles/setting-styles';
import {BaseBackgroundColors} from '../../../styles/constants';
import ToggleSwitch from 'toggle-switch-react-native';
import SettingHeader from '../../../components/settings/setting-header';

const SettingScreen = props => {
  const [state, setState] = useState({
    swithOn1: true,
  });

  return (
    <View style={styles.container}>
      <SettingHeader {...props} />

      <View style={styles.imageSetting}>
        <View style={styles.imageBg}>
          <Image
            style={styles.imageSetting}
            source={{
              uri: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
            }}
          />
        </View>
      </View>

      <ScrollView>
        <View style={styles.innerContainer}>
          <Text style={styles.settingTitle}>Settings</Text>

          <Text style={styles.settingSubTitle}>General Settings</Text>

          <View style={styles.innerContainerForToggle}>
            <Text style={styles.settingItems}>Select Language</Text>

            <ToggleSwitch
              isOn={false}
              onColor="green"
              offColor={BaseBackgroundColors.profileColor}
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="small"
              onToggle={isOn => console.log('changed to : ', isOn)}
            />
          </View>

          <View style={styles.innerContainerForToggle}>
            <Text style={styles.settingItems}>Dark Mode</Text>

            <ToggleSwitch
              isOn={false}
              onColor="green"
              offColor={BaseBackgroundColors.profileColor}
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="small"
              onToggle={isOn => console.log('changed to : ', isOn)}
            />
          </View>

          <View style={styles.innerContainerForToggle}>
            <Text style={styles.settingItems}>Show Live Location</Text>

            <ToggleSwitch
              isOn={false}
              onColor="green"
              offColor={BaseBackgroundColors.profileColor}
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="small"
              onToggle={isOn => console.log('changed to : ', isOn)}
            />
          </View>

          <Text style={styles.settingSubTitle}>Profile Settings</Text>

          <View style={styles.innerContainerForToggle}>
            <Text style={styles.settingItems}>Setting 1</Text>

            <ToggleSwitch
              isOn={false}
              onColor="green"
              offColor={BaseBackgroundColors.profileColor}
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="small"
              onToggle={isOn => console.log('changed to : ', isOn)}
            />
          </View>

          <View style={styles.innerContainerForToggle}>
            <Text style={styles.settingItems}>Setting 1</Text>

            <ToggleSwitch
              isOn={false}
              onColor="green"
              offColor={BaseBackgroundColors.profileColor}
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="small"
              onToggle={isOn => console.log('changed to : ', isOn)}
            />
          </View>

          <View style={styles.innerContainerForToggle}>
            <Text style={styles.settingItems}>Setting 1</Text>

            <ToggleSwitch
              isOn={false}
              onColor="green"
              offColor={BaseBackgroundColors.profileColor}
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="small"
              onToggle={isOn => console.log('changed to : ', isOn)}
            />
          </View>

          <Text style={styles.settingSubTitle}>Profile Settings</Text>

          <View style={styles.innerContainerForToggle}>
            <Text style={styles.settingItems}>Setting 1</Text>

            <ToggleSwitch
              isOn={false}
              onColor="green"
              offColor={BaseBackgroundColors.profileColor}
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="small"
              onToggle={isOn => console.log('changed to : ', isOn)}
            />
          </View>

          <View style={styles.innerContainerForToggle}>
            <Text style={styles.settingItems}>Setting 1</Text>

            <ToggleSwitch
              isOn={false}
              onColor="green"
              offColor={BaseBackgroundColors.profileColor}
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="small"
              onToggle={isOn => console.log('changed to : ', isOn)}
            />
          </View>

          <View style={styles.innerContainerForToggle}>
            <Text style={styles.settingItems}>Setting 1</Text>

            <ToggleSwitch
              isOn={false}
              onColor="green"
              offColor={BaseBackgroundColors.profileColor}
              labelStyle={{color: 'black', fontWeight: '900'}}
              size="small"
              onToggle={isOn => console.log('changed to : ', isOn)}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;
