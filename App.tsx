import React from 'react';
import MainTabNavigation from './src/navigation/MainTabNavigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {AppearanceProvider} from 'react-native-appearance';
import {ThemeProvider} from './src/ThemeProvider';
import {LogBox} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
LogBox.ignoreAllLogs();
Icon.loadFont();

const App = () => {
  return (
    <AppearanceProvider>
      <ThemeProvider>
        <Provider store={store}>
          <MainTabNavigation />
        </Provider>
      </ThemeProvider>
    </AppearanceProvider>
  );
};

export default App;
