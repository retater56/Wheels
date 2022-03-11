import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewsNavigation from './NewsNavigation';
import AuthNavigation from './AuthNavigation';
import AdsNavigation from './AdsNavigation';
import SearchNavigation from './SearchNavigation';
import {RootTabParamList} from '../types';
import Icon from 'react-native-vector-icons/FontAwesome';
Icon.loadFont();

const Tab = createBottomTabNavigator<RootTabParamList>();

const MainTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="News"
        component={NewsNavigation}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name={'newspaper-o'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchNavigation}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name={'search'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Ads"
        component={AdsNavigation}
        options={{
          headerShown: true,
          tabBarIcon: ({size, color}) => (
            <Icon name={'folder-o'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AuthNavigation}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name={'user-o'} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigation;
