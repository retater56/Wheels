import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {validateYupSchema} from 'formik';
import React, {useEffect, useMemo, useState} from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Image,
  View,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {getImgSource, getLoggedIn, uriImg} from '../../constants';
import {useTheme} from '../../ThemeProvider';
import {RootTabParamList} from '../../types';
import OrientationContainer from '../common/OrientationContainer';
import commonStyles from '../common/styles';
import SearchMap from './SearchMap';
import SearchRent from './SearchRent';

type Props = NativeStackScreenProps<RootTabParamList, 'SearchDetails'>;

const SearchDetails = ({route}: Props) => {
  const isLoggedIn = useSelector(getLoggedIn);
  const {item} = route.params;
  const {colors} = useTheme();
  const {
    id,
    mark,
    model,
    fuel,
    vehicleType,
    transmission,
    seats,
    maxSpeed,
    capacity,
    description,
    position,
    cost,
  } = item;
  const [imgSource, setImgSource] = useState('');

  useEffect(() => {
    const imgSource = getImgSource(item);
    setImgSource(imgSource);
  }, []);

  const memoImageSource = useMemo(() => uriImg(imgSource), [imgSource]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <OrientationContainer>
            <View
              style={[styles.container, {backgroundColor: colors.background}]}>
              <OrientationContainer
                style={[
                  styles.imgContainer,
                  {backgroundColor: colors.backgroundLight},
                ]}>
                {imgSource ? (
                  <Image source={memoImageSource} style={styles.image} />
                ) : (
                  <></>
                )}
                <Text style={[styles.textTitle, {color: colors.text}]}>
                  {mark} {model}
                </Text>
              </OrientationContainer>
              <Text style={[styles.textTitle, {color: colors.text}]}>
                Specifications
              </Text>
              <View style={styles.specContainer}>
                <View
                  style={[
                    styles.specBox,
                    {backgroundColor: colors.backgroundLight},
                  ]}>
                  <Icon name={'fuel'} size={50} color={colors.backgroundDark} />
                  <Text style={[styles.textInfo, {color: colors.text}]}>
                    {fuel}
                  </Text>
                </View>
                <View
                  style={[
                    styles.specBox,
                    {backgroundColor: colors.backgroundLight},
                  ]}>
                  <Icon
                    name={'car-info'}
                    size={50}
                    color={colors.backgroundDark}
                  />
                  <Text style={[styles.textInfo, {color: colors.text}]}>
                    {vehicleType}
                  </Text>
                </View>
                <View
                  style={[
                    styles.specBox,
                    {backgroundColor: colors.backgroundLight},
                  ]}>
                  <Icon
                    name={'car-shift-pattern'}
                    size={50}
                    color={colors.backgroundDark}
                  />
                  <Text style={[styles.textInfo, {color: colors.text}]}>
                    {transmission}
                  </Text>
                </View>
                <View
                  style={[
                    styles.specBox,
                    {backgroundColor: colors.backgroundLight},
                  ]}>
                  <Icon
                    name={'car-seat'}
                    size={50}
                    color={colors.backgroundDark}
                  />
                  <Text style={[styles.textInfo, {color: colors.text}]}>
                    {seats} Seats
                  </Text>
                </View>
                <View
                  style={[
                    styles.specBox,
                    {backgroundColor: colors.backgroundLight},
                  ]}>
                  <Icon
                    name={'speedometer'}
                    size={50}
                    color={colors.backgroundDark}
                  />
                  <Text style={[styles.textInfo, {color: colors.text}]}>
                    {maxSpeed} mph
                  </Text>
                </View>
                <View
                  style={[
                    styles.specBox,
                    {backgroundColor: colors.backgroundLight},
                  ]}>
                  <Icon
                    name={'car-cog'}
                    size={50}
                    color={colors.backgroundDark}
                  />
                  <Text style={[styles.textInfo, {color: colors.text}]}>
                    {capacity} {fuel === 'Electric' ? 'kWh' : 'L'}
                  </Text>
                </View>
              </View>
              <Text style={[styles.textTitle, {color: colors.text}]}>
                Description
              </Text>
              <View>
                <Text style={[styles.textDesc, , {color: colors.text}]}>
                  {description}
                </Text>
              </View>
              <Text style={[styles.textTitle, {color: colors.text}]}>
                Position
              </Text>
              <SearchMap pos={position} />
              <View
                style={[
                  styles.containerCost,
                  {backgroundColor: colors.secondary},
                ]}>
                <Text style={[styles.textCost, {color: colors.white}]}>
                  {cost}$ / 4 Hours
                </Text>
              </View>
            </View>
          </OrientationContainer>
        </View>
        {isLoggedIn ? (
          <SearchRent carId={id} />
        ) : (
          <Text style={[styles.textTitle, {color: colors.text}]}>
            You aren't authorized for rent this car
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...commonStyles.shadow,
  },
  imgContainer: {
    width: '100%',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...commonStyles.shadow,
  },
  image: {
    width: '100%',
    height: 200,
    margin: 20,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  specContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  specBox: {
    margin: 10,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    ...commonStyles.shadow,
  },
  textTitle: {
    padding: 10,
    textAlign: 'center',
    ...commonStyles.largeText,
  },
  textInfo: {
    ...commonStyles.mediumText,
  },
  textDesc: {
    textAlign: 'center',
    padding: 10,
    ...commonStyles.mediumText,
  },
  containerCost: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
    borderRadius: 30,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  textCost: {
    ...commonStyles.largeText,
  },
});
export default SearchDetails;
