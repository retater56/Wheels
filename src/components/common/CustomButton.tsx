import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';

interface IProps {
  title: string;
}

const CustomButton = (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<TouchableOpacity> &
    Readonly<TouchableOpacityProps> &
    Readonly<{children?: React.ReactNode}> &
    IProps,
) => {
  const {title} = props;

  return (
    <TouchableOpacity {...props} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 5,
    backgroundColor: colors.secondary,
    margin: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  text: {
    fontWeight: '700',
    fontSize: fontSizes.medium,
    color: 'white',
  },
});

export default CustomButton;
