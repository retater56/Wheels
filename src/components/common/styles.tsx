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

export const pickerStyleLight = {
  inputIOS: {
    padding: 10,
    height: 40,
    color: colors.black,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: colors.white,
    ...commonStyles.shadow,
  },
  inputAndroid: {
    padding: 10,
    height: 50,
    color: colors.black,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    ...commonStyles.shadow,
  },
};

export const pickerStyleDark = {
  inputIOS: {
    padding: 10,
    height: 40,
    color: colors.white,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: colors.darkBackground,
    ...commonStyles.shadow,
  },
  inputAndroid: {
    padding: 10,
    height: 50,
    color: colors.white,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: colors.darkBackground,
    ...commonStyles.shadow,
  },
};

export default commonStyles;
