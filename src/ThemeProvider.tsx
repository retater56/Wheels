import {
  NavigationContainer,
  DarkTheme as DarkNav,
  DefaultTheme as LightNav,
  Theme,
} from '@react-navigation/native';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {Appearance, useColorScheme} from 'react-native-appearance';
import {getUserTheme} from './components/Authentication/UserSettings/checkUserSettings';
import LoadingScreen from './components/common/LoadingScreen';
import {LightTheme, DarkTheme, ICustomTheme} from './styles/themes';

type Props = {
  children: JSX.Element;
};

type IDefaultTheme = {
  isDark: boolean;
  colors: ICustomTheme;
  navColors: Theme;
  starusBarColors: 'dark-content' | 'light-content';
  setScheme: (scheme: string) => void;
};

export const ThemeContext = createContext({
  isDark: false,
  colors: LightTheme,
  setScheme: (arg: string) => {},
});

export const ThemeProvider = ({children}: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDark, setIsDark] = useState(false);
  const phoneAppearence = useColorScheme();

  const checkTheme = async () => {
    const theme = await getUserTheme();
    console.log('systemTheme' + theme);
    if (theme === 'system') {
      const systemTheme = Appearance.getColorScheme();
      setIsDark(systemTheme === 'dark');
      setIsLoading(false);
      return;
    }
    setIsDark(theme! === 'dark');
    setIsLoading(false);
  };

  const checkChangeAppearance = async () => {
    const theme = await getUserTheme();
    if (theme === 'system') {
      console.log('phoneAppearence changed');
      const systemTheme = Appearance.getColorScheme();
      setIsDark(systemTheme === 'dark');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkTheme();
  }, []);

  useEffect(() => {
    checkChangeAppearance();
  }, [phoneAppearence]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  const defaultTheme: IDefaultTheme = {
    isDark,
    colors: isDark ? DarkTheme : LightTheme,
    navColors: isDark ? DarkNav : LightNav,
    starusBarColors: isDark ? 'light-content' : 'dark-content',
    setScheme: (scheme: string) => setIsDark(scheme === 'dark'),
  };

  return (
    <ThemeContext.Provider value={defaultTheme}>
      <NavigationContainer theme={defaultTheme.navColors}>
        <StatusBar barStyle={defaultTheme.starusBarColors} />
        {children}
      </NavigationContainer>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
