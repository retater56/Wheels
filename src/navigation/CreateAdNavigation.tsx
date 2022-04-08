import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateAd from '../components/CreateAd/CreateAd';
import CreateAdDetails from '../components/CreateAd/CreateAdDetails';
import CreateAdMap from '../components/CreateAd/CreateAdMap';

const Stack = createNativeStackNavigator();

const CreateAdNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Create Ad" component={CreateAd} />
      <Stack.Screen name="CreateAdDetails" component={CreateAdDetails} />
      <Stack.Screen name="CreateAdMap" component={CreateAdMap} />
    </Stack.Navigator>
  );
};

export default CreateAdNavigation;
