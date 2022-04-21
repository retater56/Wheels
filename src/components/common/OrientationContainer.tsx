import React from 'react';
import useOrientation from '../common/useOrientation';
import {StyleSheet, View, ViewProps, ViewStyle} from 'react-native';

const OrientationContainer = (
  props: JSX.IntrinsicAttributes &
    Readonly<ViewProps> &
    ViewStyle &
    Readonly<{children?: React.ReactNode}>,
) => {
  const portrait = useOrientation();
  return (
    <View
      style={[portrait ? styles.portraitContainer : styles.landscapeContainer]}>
      <View {...props}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  portraitContainer: {
    width: '100%',
  },
  landscapeContainer: {
    width: '70%',
  },
});

export default OrientationContainer;
