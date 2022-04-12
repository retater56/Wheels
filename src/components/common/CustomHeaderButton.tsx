import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';

const CustomHeaderButton = (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<TouchableOpacity> &
    Readonly<TouchableOpacityProps> &
    Readonly<{children?: React.ReactNode}>,
) => {
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <Icon name="ellipsis-h" color={colors.secondary} size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});

export default CustomHeaderButton;
