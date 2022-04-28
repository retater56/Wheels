import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewsNavigation from './NewsNavigation';
import AuthNavigation from './AuthNavigation';
import AdsNavigation from './AdsNavigation';
import SearchNavigation from './SearchNavigation';
import {RootTabParamList} from '../types';
import Icon from 'react-native-vector-icons/FontAwesome';
import CreateAdNavigation from './CreateAdNavigation';
import IntroNavigation from './IntroNavigation';
import {getFirstOpen, getUserData} from '../components/Intro/checkFirstInstall';
import LoadingScreen from '../components/common/LoadingScreen';
import {useDispatch, useSelector} from 'react-redux';
import {getLoggedIn} from '../constants';
import UserMap from '../components/UserMap/UserMap';
import LogoHeader from '../components/common/LogoHeader';
import {logInUser} from '../redux/reducers/userReducer';

const Tab = createBottomTabNavigator<RootTabParamList>();

const MainTabNavigation = () => {
  const [opened, setOpened] = useState<string>('');
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getLoggedIn);
  const [isLoading, setIsLoading] = useState(true);

  const checkUser = async () => {
    const opened = await getFirstOpen();
    const user = await getUserData();
    if (user) {
      const userData = await JSON.parse(user);
      dispatch(logInUser(userData));
    }
    setOpened(opened!);
    setIsLoading(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {opened == '' && (
        <Tab.Screen
          name="IntroNavigation"
          component={IntroNavigation}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {display: 'none'},
          }}
        />
      )}
      <Tab.Screen
        name="Search"
        component={SearchNavigation}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name={'search'} color={color} size={size} />
          ),
        }}
      />
      {isLoggedIn ? (
        <Tab.Screen
          name="Map"
          component={UserMap}
          options={{
            headerShown: true,
            headerTitle: LogoHeader,
            tabBarIcon: ({size, color}) => (
              <Icon name={'map'} color={color} size={size} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="News"
          component={NewsNavigation}
          options={{
            tabBarIcon: ({size, color}) => (
              <Icon name={'newspaper-o'} color={color} size={size} />
            ),
          }}
        />
      )}
      {isLoggedIn && (
        <>
          <Tab.Screen
            name="Create"
            component={CreateAdNavigation}
            options={{
              tabBarIcon: ({size, color}) => (
                <Icon name={'plus-square-o'} color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Cars"
            component={AdsNavigation}
            options={{
              headerShown: true,
              tabBarIcon: ({size, color}) => (
                <Icon name={'folder'} color={color} size={size} />
              ),
            }}
          />
        </>
      )}
      <Tab.Screen
        name="Account"
        component={AuthNavigation}
        options={{
          tabBarIcon: ({size, color}) => (
            <Icon name={'user'} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigation;
