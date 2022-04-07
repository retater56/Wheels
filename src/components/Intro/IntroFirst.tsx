import React, {useCallback} from 'react';
import {View, Image, Text, StatusBar} from 'react-native';
import LogoSvg from '../../assets/LogoSvg';
import CustomButton from '../common/CustomButton';
import introStyles from './introStyles';

const IntroFirst = ({navigation}: any) => {
  const onNextScreen = useCallback(() => {
    navigation.navigate('IntroSecond');
  }, []);

  return (
    <View style={introStyles.container}>
      <StatusBar hidden={true} />
      <View style={introStyles.imgContainer}>
        <Image
          source={require('../../assets/images/introImage1.jpeg')}
          style={introStyles.img}
        />
      </View>
      <View style={introStyles.textContainer}>
        <View style={introStyles.logoContainer}>
          <LogoSvg />
        </View>
        <View style={introStyles.textInfo}>
          <Text style={introStyles.textTitle}>Welcome to Wheels!</Text>
          <Text>Your Car Rental App</Text>
        </View>
        <CustomButton title="Let's Go!" onPress={onNextScreen} />
      </View>
    </View>
  );
};

export default IntroFirst;
