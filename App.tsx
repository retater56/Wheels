import React, {useEffect, useState} from 'react';
import MainTabNavigation from './src/navigation/MainTabNavigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import IntroNavigation from './src/navigation/IntroNavigation';
import {getFirstOpen} from './src/components/Intro/checkFirstInstall';
import {AppearanceProvider} from 'react-native-appearance';
import {ThemeProvider} from './src/ThemeProvider';
import LoadingScreen from './src/components/common/LoadingScreen';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();

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
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <AppearanceProvider>
      <ThemeProvider>
        <Provider store={store}>
          {opened == '' ? <IntroNavigation /> : <MainTabNavigation />}
        </Provider>
      </ThemeProvider>
    </AppearanceProvider>
  );
};

export default App;
