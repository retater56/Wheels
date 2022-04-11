import {
  NavigationContainer,
  DarkTheme as DarkNav,
  DefaultTheme as LightNav,
  Theme,
} from '@react-navigation/native';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {useColorScheme} from 'react-native-appearance';
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
  const colorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(colorScheme === 'dark');

  useEffect(() => {
    setIsDark(colorScheme === 'dark');
  }, [colorScheme]);

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
