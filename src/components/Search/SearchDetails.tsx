import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, Text, StyleSheet, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {getImgSource, getLoggedIn, uriImg} from '../../constants';
import {useTheme} from '../../ThemeProvider';
import {RootTabParamList} from '../../types';
import commonStyles from '../common/styles';
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
    doors,
    transmission,
    seats,
    baggageCapacity,
    capacity,
    cost,
  } = item;
  const [imgSource, setImgSource] = useState('');

  useEffect(() => {
    const imgSource = getImgSource(item);
    setImgSource(imgSource);
  }, []);

  const memoImageSource = useMemo(() => uriImg(imgSource), [imgSource]);

  return (
    <ScrollView>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View
          style={[
            styles.imgContainer,
            {backgroundColor: colors.backgroundLight},
          ]}>
          {imgSource !== '' ? (
            <Image source={memoImageSource} style={styles.image} />
          ) : (
            <></>
          )}
          <Text style={[styles.textTitle, {color: colors.text}]}>
            {mark} {model}
          </Text>
        </View>
        <Text style={[styles.textTitle, {color: colors.text}]}>
          Specifications
        </Text>
        <View style={styles.specContainer}>
          <View
            style={[styles.specBox, {backgroundColor: colors.backgroundLight}]}>
            <Icon name={'fuel'} size={50} color={colors.backgroundDark} />
            <Text style={[styles.textInfo, {color: colors.text}]}>{fuel}</Text>
          </View>
          <View
            style={[styles.specBox, {backgroundColor: colors.backgroundLight}]}>
            <Icon name={'car-door'} size={50} color={colors.backgroundDark} />
            <Text style={[styles.textInfo, {color: colors.text}]}>
              {doors} Doors
            </Text>
          </View>
          <View
            style={[styles.specBox, {backgroundColor: colors.backgroundLight}]}>
            <Icon name={'car-cog'} size={50} color={colors.backgroundDark} />
            <Text style={[styles.textInfo, {color: colors.text}]}>
              {transmission}
            </Text>
          </View>
          <View
            style={[styles.specBox, {backgroundColor: colors.backgroundLight}]}>
            <Icon name={'car-seat'} size={50} color={colors.backgroundDark} />
            <Text style={[styles.textInfo, {color: colors.text}]}>
              {seats} Seats
            </Text>
          </View>
          <View
            style={[styles.specBox, {backgroundColor: colors.backgroundLight}]}>
            <Icon
              name={'bag-personal-outline'}
              size={50}
              color={colors.backgroundDark}
            />
            <Text style={[styles.textInfo, {color: colors.text}]}>
              {baggageCapacity} Stars
            </Text>
          </View>
          <View
            style={[styles.specBox, {backgroundColor: colors.backgroundLight}]}>
            <Icon
              name={'speedometer'}
              size={50}
              color={colors.backgroundDark}
            />
            <Text style={[styles.textInfo, {color: colors.text}]}>
              {capacity}
            </Text>
          </View>
        </View>
        <View
          style={[styles.containerCost, {backgroundColor: colors.secondary}]}>
          <Text style={[styles.textCost, {color: colors.white}]}>
            {cost}$ / 4 Hours
          </Text>
        </View>
      </View>
      <View style={styles.rentContainer}>
        {isLoggedIn ? (
          <SearchRent carId={id} />
        ) : (
          <Text style={[styles.textTitle, {color: colors.text}]}>
            You aren't authorized for rent this car
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
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
  containerCost: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 30,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  textCost: {
    ...commonStyles.largeText,
  },
  rentContainer: {
    paddingBottom: 30,
  },
});
export default SearchDetails;
