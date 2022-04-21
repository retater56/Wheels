import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LogoSvg from '../../assets/LogoSvg';
import {useTheme} from '../../ThemeProvider';
import commonStyles from './styles';

const NotLoggedScreen = () => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.logoContainer, {borderColor: colors.secondary}]}>
        <LogoSvg />
      </View>
      <Text style={[styles.title, {color: colors.text, textAlign: 'center'}]}>
        Sorry, but you aren't authorized yet...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 150,
    height: 150,
    margin: 20,
    borderRadius: 30,
    borderWidth: 2,
    ...commonStyles.shadow,
  },
  title: {
    marginBottom: 10,
    ...commonStyles.largeText,
  },
});

export default NotLoggedScreen;
