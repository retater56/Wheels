import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import NewsNavigation from './NewsNavigation';
import AuthNavigation from './AuthNavigation';
import AdsNavigation from './AdsNavigation';
import SearchNavigation from './SearchNavigation';
import { RootTabParamList } from '../types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const MainTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="News" component={NewsNavigation} />
      <Tab.Screen name="Search" component={SearchNavigation} /> 
      <Tab.Screen name="Ads" component={AdsNavigation} />
      <Tab.Screen name="Registration" component={AuthNavigation} />
    </Tab.Navigator>
  );
};

export default MainTabNavigation;
