import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabNavigation from './src/navigation/MainTabNavigation';
import NewsNavigation from './src/navigation/NewsNavigation';
import {Provider} from 'react-redux';
import {rootStore} from './src/redux/store';

const Stack = createNativeStackNavigator();

const store = rootStore;

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <NewsNavigation /> */}
        <MainTabNavigation />
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({});

export default App;
