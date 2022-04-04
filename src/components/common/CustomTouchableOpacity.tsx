import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import colors from '../../styles/colors';

const CustomTouchableOpacity = (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<TouchableOpacity> &
    Readonly<TouchableOpacityProps> &
    Readonly<{children?: React.ReactNode}>,
) => {
  return <TouchableOpacity {...props} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    padding: 10,
    marginBottom: 20,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    borderRadius: 5,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  text: {
    paddingLeft: 20,
    paddingVertical: 10,
    width: '90%',
    color: colors.gray,
  },
});

export default CustomTouchableOpacity;
