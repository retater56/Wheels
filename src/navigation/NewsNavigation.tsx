import React, {useCallback} from 'react';
import News from '../components/News/News';
import NewsDetails from '../components/News/NewsDetails';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogoHeader from '../components/common/LogoHeader';
import CustomHeaderButton from '../components/common/CustomHeaderButton';
import NewsSource from '../components/News/NewsSource';
import {useNavigation} from '@react-navigation/native';
import {Navigation} from '../components/Search/types';

const Stack = createNativeStackNavigator();

const NewsNavigation = () => {
  const navigation = useNavigation<Navigation>();
  const settingsNav = useCallback(() => navigation.navigate(NewsSource), []);
  const settingsButton = useCallback(
    () => <CustomHeaderButton onPress={settingsNav} />,
    [],
  );

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Today's news"
        component={News}
        options={{
          headerRight: settingsButton,
        }}
      />
      <Stack.Screen
        name="NewsSource"
        component={NewsSource}
        options={{
          headerTitle: LogoHeader,
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="NewsDetails"
        component={NewsDetails}
        options={{
          headerTitle: LogoHeader,
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default NewsNavigation;
