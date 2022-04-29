import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import basicColors from '../../../styles/colors';
import {useTheme} from '../../../ThemeProvider';
import commonStyles from '../../common/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Appearance} from 'react-native-appearance';
import {getUserTheme, setUserTheme} from './checkUserSettings';
import CustomButton from '../../common/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {Navigation} from '../../Search/types';
import OrientationContainer from '../../common/OrientationContainer';

const UserSettings = () => {
  const navigation = useNavigation<Navigation>();
  const {setScheme, colors} = useTheme();
  const [theme, setTheme] = useState('');

  const checkTheme = async () => {
    const userTheme = await getUserTheme();
    setTheme(userTheme!);
  };

  useEffect(() => {
    checkTheme();
  }, []);

  const setLightScheme = useCallback(() => {
    setUserScheme('light');
  }, []);

  const setDarkScheme = useCallback(() => {
    setUserScheme('dark');
  }, []);

  const setSystemScheme = useCallback(() => {
    setUserScheme('system');
  }, []);

  const setUserScheme = useCallback((userScheme: string) => {
    setTheme(userScheme);
    setUserTheme(userScheme);
    if (userScheme === 'system') {
      const userAppearance = Appearance.getColorScheme();
      return setScheme(userAppearance);
    }
    setScheme(userScheme);
  }, []);

  const onBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const IconCheck = (
    <Icon
      name={'check-circle'}
      size={22}
      color={colors.secondary}
      style={styles.icon}
    />
  );

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <OrientationContainer style={styles.container} scroll={true}>
          <Text style={[styles.textTitle, {color: colors.text}]}>
            Appearance
          </Text>
          <View style={styles.containerCards}>
            <TouchableOpacity
              style={[styles.card, styles.cardLight]}
              onPress={setLightScheme}>
              <View style={[styles.cardSecondary, styles.cardLightSecondary]}>
                <Text style={styles.textInfo}>Wheels</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.rowDirection}>
              <Text style={[styles.textInfo, {color: colors.text}]}>Light</Text>
              {theme === 'light' && IconCheck}
            </View>
          </View>
          <View style={styles.containerCards}>
            <TouchableOpacity
              style={[styles.card, styles.cardDark]}
              onPress={setDarkScheme}>
              <View style={[styles.cardSecondary, styles.cardDarkSecondary]}>
                <Text style={[styles.textInfo, {color: colors.white}]}>
                  Wheels
                </Text>
              </View>
            </TouchableOpacity>
            <View style={styles.rowDirection}>
              <Text style={[styles.textInfo, {color: colors.text}]}>Dark</Text>
              {theme === 'dark' && IconCheck}
            </View>
          </View>
          <View style={styles.containerCards}>
            <TouchableOpacity
              style={[styles.card, styles.cardSystem]}
              onPress={setSystemScheme}>
              <View style={styles.systemDark}>
                <View style={[styles.cardSystemSec, styles.systemDarkSec]}>
                  <Text style={[styles.textInfo, {color: colors.white}]}>
                    Aa
                  </Text>
                </View>
              </View>
              <View style={styles.systemLight}>
                <View style={[styles.cardSystemSec, styles.systemLightSec]}>
                  <Text style={styles.textInfo}>Aa</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.rowDirection}>
              <Text style={[styles.textInfo, {color: colors.text}]}>
                System
              </Text>
              {theme === 'system' && IconCheck}
            </View>
          </View>
          <CustomButton title="Back" onPress={onBack} />
        </OrientationContainer>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  icon: {
    paddingHorizontal: 10,
  },
  card: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '60%',
    margin: 10,
    height: 100,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: basicColors.gray,
  },
  cardSecondary: {
    width: '70%',
    height: '70%',
    paddingHorizontal: 20,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    ...commonStyles.shadow,
  },
  cardLight: {
    backgroundColor: basicColors.background,
    ...commonStyles.shadow,
  },
  cardLightSecondary: {
    backgroundColor: basicColors.white,
  },
  cardDark: {
    backgroundColor: basicColors.black,
  },
  cardDarkSecondary: {
    backgroundColor: basicColors.darkBackground,
  },
  cardSystem: {
    flexDirection: 'row',
    color: basicColors.background,
    ...commonStyles.shadow,
  },
  cardSystemSec: {
    width: '70%',
    height: '70%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  systemDark: {
    width: '50%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderBottomStartRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: basicColors.black,
  },
  systemDarkSec: {
    backgroundColor: basicColors.darkBackground,
    borderTopLeftRadius: 30,
  },
  systemLight: {
    width: '50%',
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    borderTopEndRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: basicColors.background,
  },
  systemLightSec: {
    borderTopLeftRadius: 30,
    borderBottomEndRadius: 30,
    backgroundColor: basicColors.white,
    ...commonStyles.shadow,
  },
  containerCards: {
    alignItems: 'center',
    width: '100%',
  },
  textTitle: {
    padding: 10,
    ...commonStyles.largeText,
  },
  textInfo: {
    textAlign: 'left',
    ...commonStyles.mediumText,
  },
  rowDirection: {
    flexDirection: 'row',
  },
});

export default UserSettings;
