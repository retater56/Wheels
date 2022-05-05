import React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import colors from '../../styles/colors';
import commonStyles from './styles';

export const useNetInfo = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>();

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
  }, []);

  return isConnected;
};

export const NetInfoText = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        You are offline. Please, check you connection
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  text: {
    color: colors.white,
    ...commonStyles.mediumText,
  },
});
