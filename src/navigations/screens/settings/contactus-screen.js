import React, {useState} from 'react';
import {styles} from '../../../styles/setting-component-styles';
import {
  StatusBar,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
} from 'react-native';
import {BaseBackgroundColors} from '../../../styles/constants';
import {Icon, Image, Button} from 'react-native-elements';
import SettingComponentHeader from '../../../components/settings/setting-component-header';

const ContactUsScreen = ({navigation}) => {
  const [userMessage, setUserMessage] = useState('');
  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      <SafeAreaView style={styles.mainContainer}>
        <SettingComponentHeader title="Contact Us" navigation={navigation} />
        <ScrollView
          style={styles.mainContainer}
          showsVerticalScrollIndicator={false}>
          <Image
            resizeMode={'stretch'}
            source={{
              uri: 'https://miro.medium.com/max/9216/0*KEs-jZkVHlcbBEuY',
            }}
            style={styles.image}
          />
          <Text style={styles.para}>
            When you give a feedback, It means you offer a helpful response to
            someone's work or idea. Feedback is almost offered or requested with
            the intention of improving the final product. Another meaning of
            feedback is a kind of sound disortion from an ampilifier microphone.
          </Text>
          <View style={styles.hrLine} />
          <TextInput
            multiline={true}
            placeholder="Type your feedback here..."
            style={styles.input}
            value={userMessage}
            onChangeText={text => {
              setUserMessage(text);
            }}
          />
          <Button
            title="Submit"
            containerStyle={styles.submitBtnContainer}
            buttonStyle={styles.submitBtn}
            onPress={() => {}}
          />
          <View style={styles.bottomContainer}>
            <FAB
              onPress={() => {}}
              iconType={'material-community'}
              iconName="phone"
            />
            <FAB
              onPress={() => {}}
              iconType={'material-community'}
              iconName="email"
            />
            <FAB
              onPress={() => {}}
              iconType={'material'}
              iconName="keyboard-voice"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const FAB = ({onPress, style, iconType, iconName, iconSize}) => {
  return (
    <Button
      onPress={onPress}
      containerStyle={styles.fabBtn}
      buttonStyle={styles.fabBgClr}
      icon={
        <Icon
          name={iconName}
          type={iconType}
          size={28}
          color="white"
          style={[{padding: 8}]}
        />
      }
    />
  );
};
export default ContactUsScreen;
