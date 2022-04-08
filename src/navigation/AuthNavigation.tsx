import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../components/Authentication/SignIn';
import Registration from '../components/Authentication/Registration';
import LogOut from '../components/Authentication/LogOut';
import {useSelector} from 'react-redux';
import {getLoggedIn, getUserName} from '../constants';
import UserMap from '../components/Authentication/UserMap/UserMap';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  const isLoggedIn = useSelector(getLoggedIn);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Log Out" component={LogOut} />
          <Stack.Screen name="UserMap" component={UserMap} />
        </>
      ) : (
        <>
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Registration" component={Registration} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigation;
