import React, {useCallback} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Search from '../components/Search/Search';
import SearchDetails from '../components/Search/SearchDetails';
import LogoHeader from '../components/common/LogoHeader';
import SearchSort from '../components/Search/SearchSort';
import {useNavigation} from '@react-navigation/native';
import {Navigation} from '../components/Search/types';
import CustomHeaderButton from '../components/common/CustomHeaderButton';

const Stack = createNativeStackNavigator();

const SearchNavigation = () => {
  const navigation = useNavigation<Navigation>();
  const settingsNav = useCallback(() => navigation.navigate(SearchSort), []);
  const settingsButton = useCallback(
    () => <CustomHeaderButton onPress={settingsNav} />,
    [],
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Cars"
        component={Search}
        options={{
          headerRight: settingsButton,
        }}
      />
      <Stack.Screen
        name="SearchDetails"
        component={SearchDetails}
        options={{
          headerTitle: LogoHeader,
        }}
      />
      <Stack.Screen
        name="SearchSort"
        component={SearchSort}
        options={{
          headerTitle: LogoHeader,
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigation;
