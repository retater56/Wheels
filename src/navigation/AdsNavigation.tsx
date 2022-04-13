import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OwnerAds from '../components/Ads/OwnerAds';
import Booked from '../components/Ads/Booked';
import ChangeDetails from '../components/Ads/ChangeDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogoHeader from '../components/common/LogoHeader';
import CreateAdDetails from '../components/CreateAd/CreateAdDetails';
import CreateAdMap from '../components/CreateAd/CreateAdMap';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

const AdsTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Booked" component={Booked} />
      <Tab.Screen name="My ads" component={OwnerAds} />
    </Tab.Navigator>
  );
};

const AdsNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdsNavigation"
        component={AdsTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ChangeDetails"
        component={ChangeDetails}
        options={{
          title: 'Change Details',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="CreateAdDetails"
        component={CreateAdDetails}
        options={{
          headerTitle: LogoHeader,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="CreateAdMap"
        component={CreateAdMap}
        options={{
          headerTitle: LogoHeader,
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default AdsNavigation;
