import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Image, Text, View, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getImgSource, getUserName, uriImg} from '../../constants';
import {fetchCars} from '../../redux/reducers/carsReducer';
import {
  deleteOwnerCar,
  fetchOwnerCars,
} from '../../redux/reducers/ownerCarsReducer';
import {useTheme} from '../../ThemeProvider';
import CustomButton from '../common/CustomButton';
import commonStyles from '../common/styles';
import {Navigation} from '../Search/types';

const OwnerItem = ({item}: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<Navigation>();
  const userName = useSelector(getUserName);
  const {colors} = useTheme();

  const {id, mark, model, rentTime, cost} = item;

  const [imgSource, setImgSource] = useState('');

  useEffect(() => {
    const imgSource = getImgSource(item);
    setImgSource(imgSource);
  }, []);

  const memoImageSource = useMemo(() => uriImg(imgSource), [imgSource]);

  const onChangeDetails = useCallback(() => {
    navigation.navigate('ChangeDetails', {item});
  }, [item]);

  const onDeleteCar = useCallback(() => {
    Alert.alert('Delete this car?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(deleteOwnerCar(id));
          dispatch(fetchOwnerCars(userName));
          dispatch(fetchCars());
        },
      },
    ]);
  }, []);

  return (
    <View
      style={[styles.card, {backgroundColor: colors.background}]}
      key={id + rentTime}>
      <Text style={[styles.textModel, {color: colors.text}]}>
        {mark} {model}
      </Text>
      {imgSource ? (
        <Image source={memoImageSource} style={styles.image} />
      ) : (
        <></>
      )}
      <View style={styles.containerDetails}>
        <Text style={[styles.textDetails, {color: colors.text}]}>
          Current cost:
        </Text>
        <Text style={{color: colors.text}}>{cost}$ / 4 hours</Text>
      </View>
      <CustomButton title="Change Details" onPress={onChangeDetails} />
      <CustomButton title="Delete Car" onPress={onDeleteCar} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
    marginVertical: 10,
    marginHorizontal: 20,
    ...commonStyles.shadow,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  textSubTitle: {
    margin: 10,
    ...commonStyles.mediumText,
  },
  containerDetails: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textDate: {
    ...commonStyles.largeText,
  },
  textDetails: {
    ...commonStyles.mediumText,
  },
  textDetailsValue: {},
  textModel: {
    textAlign: 'center',
    paddingLeft: 10,
    ...commonStyles.largeText,
  },
});

export default OwnerItem;
