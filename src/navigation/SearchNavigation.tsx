import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from '../components/Search/Search';
import SearchDetails from '../components/Search/SearchDetails';
import LogoHeader from '../components/common/LogoHeader';

const Stack = createNativeStackNavigator();

const SearchNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cars" component={Search} />
      <Stack.Screen
        name="SearchDetails"
        component={SearchDetails}
        options={{
          headerTitle: LogoHeader,
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigation;
