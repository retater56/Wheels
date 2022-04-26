import React from 'react';
import useOrientation from '../common/useOrientation';
import {ScrollView, StyleSheet, View, ViewProps, ViewStyle} from 'react-native';

interface IProps {
  scroll?: boolean;
}

const OrientationContainer = (
  props: JSX.IntrinsicAttributes &
    Readonly<ViewProps> &
    ViewStyle &
    IProps &
    Readonly<{children?: React.ReactNode}>,
) => {
  const portrait = useOrientation();
  return (
    <>
      {props.scroll && !portrait ? (
        <ScrollView style={styles.portraitContainer}>
          <View style={styles.center}>
            <View
              style={[
                portrait ? styles.portraitContainer : styles.landscapeContainer,
              ]}>
              <View {...props}>{props.children}</View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View
          style={[
            portrait ? styles.portraitContainer : styles.landscapeContainer,
          ]}>
          <View {...props}>{props.children}</View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  portraitContainer: {
    width: '100%',
  },
  landscapeContainer: {
    width: '70%',
  },
  center: {
    alignItems: 'center',
  },
});

export default OrientationContainer;
