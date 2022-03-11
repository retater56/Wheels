import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../components/Authentication/SignIn';
import Registration from '../components/Authentication/Registration';
import LogOut from '../components/Authentication/LogOut';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/reducers/reducer';

const Stack = createNativeStackNavigator();

const AuthNavigation = () => {
  const isLogged = useSelector((state: RootState) => state.isLoggedIn);

  return (
    <Stack.Navigator>
      {/* {isLogged ? (
        <Stack.Screen name="Log Out" component={LogOut} />
      ) : (
        <> */}
      <Stack.Screen name="Sign In" component={SignIn} />
      <Stack.Screen name="Registration" component={Registration} />
      {/* </>
      )} */}
    </Stack.Navigator>
  );
};

export default AuthNavigation;
