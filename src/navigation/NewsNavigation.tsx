import React from 'react';
import News from '../components/News/News';
import NewsDetails from '../components/News/NewsDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const NewsNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="News" component={News} />
      <Stack.Screen name="NewsDetails" component={NewsDetails} />
    </Stack.Navigator>
  );
};

export default NewsNavigation;
