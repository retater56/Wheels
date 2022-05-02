import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateAd from '../components/CreateAd/CreateAd';
import CreateAdDetails from '../components/CreateAd/CreateAdDetails';
import CreateAdMap from '../components/CreateAd/CreateAdMap';
import LogoHeader from '../components/common/LogoHeader';

const Stack = createNativeStackNavigator();

const CreateAdNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Create Ad"
        component={CreateAd}
        options={{
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="CreateAdDetails"
        component={CreateAdDetails}
        options={{
          headerTitleAlign: 'center',
          headerTitle: LogoHeader,
        }}
      />
      <Stack.Screen
        name="CreateAdMap"
        component={CreateAdMap}
        options={{
          headerTitleAlign: 'center',
          headerTitle: LogoHeader,
        }}
      />
    </Stack.Navigator>
  );
};

export default CreateAdNavigation;
