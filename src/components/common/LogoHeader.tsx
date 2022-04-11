import React from 'react';
import {View, StyleSheet} from 'react-native';
import LogoSvg from '../../assets/LogoSvg';

const LogoHeader = () => {
  return (
    <View style={styles.logoContainer}>
      <LogoSvg />
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    width: 40,
    height: 40,
  },
});

export default LogoHeader;
