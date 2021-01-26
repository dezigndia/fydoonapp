import React, { useRef, useEffect, useState } from 'react';
import { store, persistor } from './src/redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import RootNavigator from './src/navigations/navigators/root-navigator';
import { MenuProvider } from 'react-native-popup-menu';
import messaging from '@react-native-firebase/messaging';
import { AppState } from "react-native";
import { changeStatus } from './src/redux/actions/socket-actions';
import { UserStatus } from './src/socket.io/constant'
import { updatePushToken } from './src/apis/chat-operations';
import AsyncStorage from '@react-native-community/async-storage';
const App = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    // Get the device token    
    messaging().getToken().then(token => {
      console.log('token', token);
      AsyncStorage.setItem('pushToken', token)
    });

    // Listen to whether the token changes
    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
      messaging().onTokenRefresh(async (token) => {
        console.log('onTokenRefresh', token);
        const authToken = await AsyncStorage.getItem('token');
        if (authToken) {
          updatePushToken(token, authToken);
        }
      });
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      changeStatus(UserStatus.online)
      console.log("App has come to the foreground!");
    } else {
      changeStatus(UserStatus.offline)
      console.log("App has come to background!");
    }
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <MenuProvider>
          <RootNavigator />
        </MenuProvider>
      </Provider>
    </PersistGate>
  );
};

export default App;
