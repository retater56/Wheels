import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';

const LoadingScreen = () => {
  return <ActivityIndicator style={styles.view} />;
};

const styles = StyleSheet.create({
  view: {alignItems: 'center', flex: 1},
});

export default LoadingScreen;
