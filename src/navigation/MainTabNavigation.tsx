import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewsNavigation from './NewsNavigation';
import AuthNavigation from './AuthNavigation';
import AdsNavigation from './AdsNavigation';
import SearchNavigation from './SearchNavigation';
import {RootTabParamList} from '../types';
import Icon from 'react-native-vector-icons/FontAwesome';
import CreateAdNavigation from './CreateAdNavigation';
import IntroNavigation from './IntroNavigation';
import {getFirstOpen} from '../components/Intro/checkFirstInstall';
import LoadingScreen from '../components/common/LoadingScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

const MainTabNavigation = () => {
  const [opened, setOpened] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const checkUser = async () => {
    const val = await getFirstOpen();
    setOpened(val!);
    setIsLoading(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {opened == '' && (
        <Tab.Screen
          name="IntroNavigation"
          component={IntroNavigation}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {display: 'none'},
          }}
        />
      )}
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
        name="Create"
        component={CreateAdNavigation}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name={'plus-square-o'} color={color} size={size} />
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
