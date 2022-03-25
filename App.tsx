import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainTabNavigation from './src/navigation/MainTabNavigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainTabNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
