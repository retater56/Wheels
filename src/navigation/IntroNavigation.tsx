import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import IntroFirst from '../components/Intro/IntroFirst';
import IntroSecond from '../components/Intro/IntroSecond';
import IntroThird from '../components/Intro/IntroThird';
import IntroFourth from '../components/Intro/IntroFourth';

const Stack = createNativeStackNavigator();

const IntroNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="IntroFirst"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="IntroFirst" component={IntroFirst} />
      <Stack.Screen name="IntroSecond" component={IntroSecond} />
      <Stack.Screen name="IntroThird" component={IntroThird} />
      <Stack.Screen name="IntroFourth" component={IntroFourth} />
    </Stack.Navigator>
  );
};

export default IntroNavigation;
