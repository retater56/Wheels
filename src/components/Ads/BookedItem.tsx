import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Image, Text, View, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getImgSource, getUserName, uriImg} from '../../constants';
import {cancelBooking} from '../../redux/reducers/cancelBookingReducer';
import {fetchCustomerCars} from '../../redux/reducers/customerCarsReducer';
import {useTheme} from '../../ThemeProvider';
import CustomButton from '../common/CustomButton';
import OrientationContainer from '../common/OrientationContainer';
import commonStyles from '../common/styles';
import {formatDateBooking, rentData} from '../Search/constants';

const BookedItem = ({item}: any) => {
  const dispatch = useDispatch();
  const userName = useSelector(getUserName);
  const {colors} = useTheme();

  const {id, mark, model, rentDate, rentTime, cost} = item;

  const [imgSource, setImgSource] = useState('');

  useEffect(() => {
    const imgSourceFormat = getImgSource(item);
    setImgSource(imgSourceFormat);
  }, []);

  const memoImageSource = useMemo(() => uriImg(imgSource), [imgSource]);

  const memoRentTime = useMemo(() => {
    const rentDataObj = rentData.find((per) => per.value === rentTime);
    return rentDataObj?.label;
  }, [rentTime]);

  const memoRentDate = useMemo(() => {
    return formatDateBooking(rentDate);
  }, [rentDate]);

  const onDeleteCar = useCallback(() => {
    Alert.alert('Cancel rent?', '', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          dispatch(cancelBooking({item, userName}));
          dispatch(fetchCustomerCars(userName));
        },
      },
    ]);
  }, []);

  return (
    <View style={styles.centerContainer}>
      <OrientationContainer>
        <View
          style={[styles.card, {backgroundColor: colors.background}]}
          key={id + rentTime}>
          <Text style={[styles.textDate, {color: colors.text}]}>
            {memoRentDate}
          </Text>
          {imgSource ? (
            <Image source={memoImageSource} style={styles.image} />
          ) : (
            <></>
          )}
          <Text style={[styles.textModel, {color: colors.text}]}>
            {mark} {model}
          </Text>

          <Text style={[styles.textSubTitle, {color: colors.text}]}>
            Details
          </Text>
          <View style={styles.containerDetails}>
            <Text style={[styles.textDetails, {color: colors.text}]}>
              Picked time:
            </Text>
            <Text style={{color: colors.text}}>{memoRentTime}</Text>
          </View>
          <View style={styles.containerDetails}>
            <Text style={[styles.textDetails, {color: colors.text}]}>
              Cost:
            </Text>
            <Text style={{color: colors.text}}>{cost}$ / 4 hours</Text>
          </View>
          <CustomButton title="Cancel rent" onPress={onDeleteCar} />
        </View>
      </OrientationContainer>
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
  centerContainer: {
    alignItems: 'center',
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

export default BookedItem;
