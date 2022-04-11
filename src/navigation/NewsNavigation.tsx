import React from 'react';
import News from '../components/News/News';
import NewsDetails from '../components/News/NewsDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogoHeader from '../components/common/LogoHeader';

const Stack = createNativeStackNavigator();

const NewsNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Today's news" component={News} />
      <Stack.Screen
        name="NewsDetails"
        component={NewsDetails}
        options={{
          headerTitle: LogoHeader,
        }}
      />
    </Stack.Navigator>
  );
};

export default NewsNavigation;
