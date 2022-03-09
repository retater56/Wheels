import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabNavigation from './src/navigation/MainTabNavigation';
import NewsNavigation from './src/navigation/NewsNavigation';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* <NewsNavigation /> */}
      <MainTabNavigation />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
