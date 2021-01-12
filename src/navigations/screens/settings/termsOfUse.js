import React, {useState} from 'react';
import {WebView} from 'react-native-webview';
import {
  ScrollView,
  StatusBar,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {styles} from '../../../styles/setting-component-styles';
import SettingComponentHeader from '../../../components/settings/setting-component-header';
import {BaseBackgroundColors} from '../../../styles/constants';
import {Icon} from 'react-native-elements';
const TermsOfUse = ({navigation}) => {
  const [pageLoadStatus, setPageLoadStatus] = useState('');

  return (
    <>
      <StatusBar
        backgroundColor={BaseBackgroundColors.secondary}
        barStyle="light-content"
      />
      <SafeAreaView style={[styles.mainContainer]}>
        <SettingComponentHeader title="Terms of Use" navigation={navigation} />

        <WebView
          startInLoadingState={true}
          renderError={() => {
            <View
              style={{
                flex: 1,
                marginTop: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
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
            </View>;
          }}
          startInLoadingState={true}
          renderLoading={() => (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator
                size="large"
                color={BaseBackgroundColors.profileColor}
              />
            </View>
          )}
          style={{marginHorizontal: 10}}
          pullToRefreshEnabled={true}
          showsVerticalScrollIndicator={false}
          javaScriptEnabled={true}
          onLoadStart={() => setPageLoadStatus('loading')}
          onLoad={() => setPageLoadStatus('done')}
          onError={() => setPageLoadStatus('error')}
          source={{uri: 'http://plugs.live/terms-of-use/'}}
        />
      </SafeAreaView>
    </>
  );
};
export default TermsOfUse;
