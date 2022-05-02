import React, {useCallback} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../components/Authentication/SignIn';
import Registration from '../components/Authentication/Registration';
import LogOut from '../components/Authentication/LogOut';
import {useSelector} from 'react-redux';
import {getLoggedIn} from '../constants';
import LogoHeader from '../components/common/LogoHeader';
import UserSettings from '../components/Authentication/UserSettings/UserSettings';
import {useNavigation} from '@react-navigation/native';
import {Navigation} from '../components/Search/types';
import CustomHeaderButton from '../components/common/CustomHeaderButton';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  const isLoggedIn = useSelector(getLoggedIn);
  const navigation = useNavigation<Navigation>();
  const settingsNav = useCallback(() => navigation.navigate(UserSettings), []);
  const settingsButton = useCallback(
    () => <CustomHeaderButton onPress={settingsNav} />,
    [],
  );

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen
            name="User"
            component={LogOut}
            options={{
              headerTitleAlign: 'center',
              headerRight: settingsButton,
            }}
          />
          <Stack.Screen
            name="UserSettings"
            component={UserSettings}
            options={{
              headerTitleAlign: 'center',
              headerTitle: LogoHeader,
              presentation: 'modal',
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Sign In"
            component={SignIn}
            options={{
              headerTitleAlign: 'center',
              headerRight: settingsButton,
            }}
          />
          <Stack.Screen
            name="Registration"
            component={Registration}
            options={{headerTitleAlign: 'center'}}
          />
          <Stack.Screen
            name="UserSettings"
            component={UserSettings}
            options={{
              headerTitleAlign: 'center',
              headerTitle: LogoHeader,
              presentation: 'modal',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigation;
