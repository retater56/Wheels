import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {useTheme} from '../../ThemeProvider';
import {Text} from 'react-native';
import commonStyles from './styles';

const CustomTouchableOpacity = (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<TouchableOpacity> &
    Readonly<TouchableOpacityProps> &
    Readonly<{children?: React.ReactNode}>,
) => {
  const {colors} = useTheme();

  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.text, {color: colors.text}]}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 20,
    borderRadius: 5,
    ...commonStyles.shadow,
  },
  text: {
    paddingLeft: 20,
    paddingVertical: 10,
    width: '90%',
  },
});

export default CustomTouchableOpacity;
