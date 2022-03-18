import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateAd from '../components/CreateAd/CreateAd';
import CreateAdDetails from '../components/CreateAd/CreateAdDetails';

const Stack = createNativeStackNavigator();

const CreateAdNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Create Ad" component={CreateAd} />
      <Stack.Screen name="CreateAdDetails" component={CreateAdDetails} />
    </Stack.Navigator>
  );
};

export default CreateAdNavigation;
