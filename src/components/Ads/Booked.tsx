import React from 'react';
import { SafeAreaView, Text, View, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const Booked = () => {
    return (
        <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <Text>Booked</Text>
        </View>
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
      alignItems: 'center'
    },
    card: {
      width: '90%',
      height: 200,
      margin: 10,
      backgroundColor: colors.primaryLight,
    },
  });

export default Booked;