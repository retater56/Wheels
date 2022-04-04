import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, Text, StyleSheet, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getImgSource} from '../../constants';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import {RootTabParamList} from '../../types';
import SearchRent from './SearchRent';

type Props = NativeStackScreenProps<RootTabParamList, 'SearchDetails'>;

const SearchDetails = ({route}: Props) => {
  const {item} = route.params;
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

  const memoImageSource = useMemo(() => {
    return {
      uri: imgSource,
    };
  }, [imgSource]);

  return (
    <ScrollView>
      <View style={[styles.container, styles.shadow]}>
        <View style={[styles.imgContainer, styles.shadow]}>
          {imgSource !== '' ? (
            <Image source={memoImageSource} style={styles.image} />
          ) : (
            <></>
          )}
          <Text style={styles.textTitle}>
            {mark} {model}
          </Text>
        </View>
        <Text style={styles.textTitle}>Specifications</Text>
        <View style={styles.specContainer}>
          <View style={[styles.specBox, styles.shadow]}>
            <Icon name={'fuel'} size={50} color={colors.primaryDark} />
            <Text style={styles.textInfo}>{fuel}</Text>
          </View>
          <View style={[styles.specBox, styles.shadow]}>
            <Icon name={'car-door'} size={50} color={colors.primaryDark} />
            <Text style={styles.textInfo}>{doors} Doors</Text>
          </View>
          <View style={[styles.specBox, styles.shadow]}>
            <Icon name={'car-cog'} size={50} color={colors.primaryDark} />
            <Text style={styles.textInfo}>{transmission}</Text>
          </View>
          <View style={[styles.specBox, styles.shadow]}>
            <Icon name={'car-seat'} size={50} color={colors.primaryDark} />
            <Text style={styles.textInfo}>{seats} Seats</Text>
          </View>
          <View style={[styles.specBox, styles.shadow]}>
            <Icon
              name={'bag-personal-outline'}
              size={50}
              color={colors.primaryDark}
            />
            <Text style={styles.textInfo}>{baggageCapacity} Stars</Text>
          </View>
          <View style={[styles.specBox, styles.shadow]}>
            <Icon name={'speedometer'} size={50} color={colors.primaryDark} />
            <Text style={styles.textInfo}>{capacity}</Text>
          </View>
        </View>
        <View style={styles.containerCost}>
          <Text style={styles.textCost}>{cost}$ / 4 Hours</Text>
        </View>
      </View>
      <SearchRent carId={id} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.background,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  imgContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.gray,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
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
    backgroundColor: colors.gray,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  textTitle: {
    padding: 10,
    color: colors.black,
    fontSize: fontSizes.large,
    fontWeight: '700',
    textAlign: 'center',
  },
  textInfo: {
    color: colors.black,
    fontSize: fontSizes.medium,
  },
  containerCost: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 30,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    backgroundColor: colors.secondary,
  },
  textCost: {
    color: colors.white,
    fontSize: fontSizes.large,
    fontWeight: '700',
  },
});
export default SearchDetails;
