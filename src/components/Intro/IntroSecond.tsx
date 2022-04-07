import React, {useCallback} from 'react';
import {View, Image, Text, StatusBar} from 'react-native';
import LogoSvg from '../../assets/LogoSvg';

import CustomButton from '../common/CustomButton';
import introStyles from './introStyles';

const IntroSecond = ({navigation}: any) => {
  const onNextScreen = useCallback(() => navigation.navigate('IntroThird'), []);

  return (
    <View style={introStyles.container}>
      <StatusBar hidden={true} />
      <View style={introStyles.imgContainer}>
        <Image
          source={require('../../assets/images/introImage8.jpeg')}
          style={introStyles.img}
        />
      </View>
      <View style={introStyles.textContainer}>
        <View style={introStyles.logoContainer}>
          <LogoSvg />
        </View>
        <View style={introStyles.textInfo}>
          <Text style={introStyles.textTitle}>Choose your car!</Text>
          <Text>For Rest Or Business Trip</Text>
        </View>
        <CustomButton title="Next" onPress={onNextScreen} />
      </View>
    </View>
  );
};

export default IntroSecond;
