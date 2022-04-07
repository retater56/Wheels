import React, {useCallback} from 'react';
import {View, Image, Text, StatusBar} from 'react-native';
import LogoSvg from '../../assets/LogoSvg';
import CustomButton from '../common/CustomButton';
import {setFirstOpen} from './checkFirstInstall';
import introStyles from './introStyles';

const IntroSecond = () => {
  const onStartUsing = useCallback(() => {
    setFirstOpen('true');
  }, []);

  return (
    <View style={introStyles.container}>
      <StatusBar hidden={true} />
      <View style={introStyles.imgContainer}>
        <Image
          source={require('../../assets/images/introImage4.jpeg')}
          style={introStyles.img}
        />
      </View>
      <View style={introStyles.textContainer}>
        <View style={introStyles.logoContainer}>
          <LogoSvg />
        </View>
        <View style={introStyles.textInfo}>
          <Text style={introStyles.textTitle}>Trust in Wheels!</Text>
          <Text>Feel Our Experience And Enjoy</Text>
        </View>
        <CustomButton title="Got It!" onPress={onStartUsing} />
      </View>
    </View>
  );
};

export default IntroSecond;
