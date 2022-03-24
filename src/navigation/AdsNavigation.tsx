import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import OwnerAds from '../components/Ads/OwnerAds';
import Booked from '../components/Ads/Booked';

const Tab = createMaterialTopTabNavigator();

const AdsNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Booked" component={Booked} />
      <Tab.Screen name="My ads" component={OwnerAds} />
    </Tab.Navigator>
  );
};

export default AdsNavigation;
