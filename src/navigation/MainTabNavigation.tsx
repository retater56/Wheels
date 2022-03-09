import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewsNavigation from './NewsNavigation';
import AuthNavigation from './AuthNavigation';

const Tab = createBottomTabNavigator();

const MainTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {/* <Tab.Screen name="Registration" component={AuthNavigation} /> */}
      <Tab.Screen name="NewsMain" component={NewsNavigation} />
    </Tab.Navigator>
  );
};

export default MainTabNavigation;
