import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';

const introStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  imgContainer: {
    flex: 3,
  },
  img: {
    resizeMode: 'contain',
  },
  logoContainer: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 30,
    borderColor: colors.secondary,
    borderWidth: 2,
  },
  textContainer: {
    flex: 2,
    alignItems: 'center',
    borderTopLeftRadius: 100,
    backgroundColor: colors.background,
  },
  textInfo: {
    alignItems: 'center',
    padding: 20,
  },
  textTitle: {
    color: colors.black,
    fontSize: fontSizes.large,
    fontWeight: '700',
  },
});

export default introStyles;
