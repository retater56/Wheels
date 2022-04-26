import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import {StyleSheet} from 'react-native';

const commonStyles = StyleSheet.create({
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  bigText: {
    fontSize: fontSizes.big,
    fontWeight: '700',
  },
  largeText: {
    fontSize: fontSizes.large,
    fontWeight: '700',
  },
  mediumText: {
    fontSize: fontSizes.medium,
    fontWeight: '500',
  },
  smallText: {
    fontSize: fontSizes.small,
  },
  errorText: {
    fontSize: fontSizes.small,
    color: colors.red,
  },
});

const IOSsettings = {modalViewMiddle: {paddingHorizontal: 30}};

const IOSStyle = {
  padding: 10,
  height: 40,
  paddingHorizontal: 20,
  marginBottom: 20,
  borderRadius: 5,
};

const androidStyle = {
  padding: 10,
  height: 40,
  paddingHorizontal: 20,
  marginBottom: 30,
  borderRadius: 5,
};

export const checkUserPref = (isDark: boolean) => {
  return isDark ? pickerStyleDark : pickerStyleLight;
};

export const pickerStyleLight = {
  inputIOS: {
    color: colors.black,
    backgroundColor: colors.background,
    ...commonStyles.shadow,
    ...IOSStyle,
  },
  inputAndroid: {
    color: colors.black,
    backgroundColor: colors.background,
    ...commonStyles.shadow,
    ...androidStyle,
  },
  ...IOSsettings,
};

export const pickerStyleDark = {
  inputIOS: {
    color: colors.white,
    backgroundColor: colors.darkBackground,
    ...commonStyles.shadow,
    ...IOSStyle,
  },
  inputAndroid: {
    color: colors.white,
    backgroundColor: colors.darkBackground,
    ...commonStyles.shadow,
    ...androidStyle,
  },
  ...IOSsettings,
};

export default commonStyles;
