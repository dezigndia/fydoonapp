import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabBar from './bottom-tab-navigator';
import HomeFooter from '../../../components/home/home-footer';

const Stack = createStackNavigator();

const HomeNavigator = props => {
  return (
    <>
      <Stack.Navigator mode="modal">
        <Stack.Screen
          name="tabbar"
          component={TabBar}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>

      <HomeFooter {...props} />
    </>
  );
};

export default HomeNavigator;
