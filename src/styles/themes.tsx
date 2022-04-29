import colors from './colors';

export interface ICustomTheme {
  white: string;
  gray: string;
  background: string;
  backgroundLight: string;
  backgroundDark: string;
  secondary: string;
  text: string;
  secondaryText: string;
  error: string;
}

export const LightTheme = {
  white: colors.white,
  gray: colors.gray,
  background: colors.lightBackground,
  backgroundLight: colors.white,
  backgroundDark: colors.primaryDark,
  secondary: colors.secondary,
  text: colors.black,
  secondaryText: colors.gray,
  error: '#D32F2F',
};

export const DarkTheme = {
  white: colors.white,
  gray: colors.gray,
  background: colors.darkBackground,
  backgroundLight: colors.primaryLight,
  backgroundDark: colors.primaryDark,
  secondary: colors.secondary,
  text: colors.white,
  secondaryText: colors.gray,
  error: '#EF9A9A',
};
