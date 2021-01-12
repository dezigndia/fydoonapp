import React from 'react';
import {store, persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigator from './src/navigations/navigators/root-navigator';
import {MenuProvider} from 'react-native-popup-menu';
const App = () => {
  console.disableYellowBox = true;
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
