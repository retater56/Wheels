import React, {useEffect, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainTabNavigation from './src/navigation/MainTabNavigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import IntroNavigation from './src/navigation/IntroNavigation';
import {getFirstOpen} from './src/components/Intro/checkFirstInstall';
import {ActivityIndicator} from 'react-native';

const App = () => {
  const [opened, setOpened] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const checkUser = async () => {
    const val = await getFirstOpen();
    setOpened(val!);
    setIsLoading(false);
  };

  useEffect(() => {
    checkUser();
    console.log(opened);
  }, []);

  if (isLoading) {
    return <ActivityIndicator style={{alignItems: 'center', flex: 1}} />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        {opened == '' ? <IntroNavigation /> : <MainTabNavigation />}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
