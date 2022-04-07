import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getImgSource, getUserName} from '../../constants';
import {cancelBooking} from '../../redux/reducers/cancelBookingReducer';
import {fetchCustomerCars} from '../../redux/reducers/customerCarsReducer';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import CustomButton from '../common/CustomButton';
import {formatDate, rentData} from '../Search/constants';

const BookedItem = ({item}: any) => {
  const dispatch = useDispatch();
  const userName = useSelector(getUserName);

  const {id, mark, model, rentDate, rentTime, cost} = item;

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

  const memoRentTime = useMemo(() => {
    const rentDataObj = rentData.find(per => per.value === rentTime);
    return rentDataObj?.label;
  }, [rentTime]);

  const memoRentDate = useMemo(() => {
    return formatDate(rentDate);
  }, [rentDate]);

  const onCancelRent = useCallback(() => {
    dispatch(cancelBooking({item, userName}));
    dispatch(fetchCustomerCars(userName))
  }, []);

  return (
    <View style={[styles.card, styles.shadow]} key={id + rentTime}>
      <Text style={styles.textDate}>{memoRentDate}</Text>
      {imgSource !== '' ? (
        <Image source={memoImageSource} style={styles.image} />
      ) : (
        <></>
      )}
      <Text style={styles.textModel}>
        {mark} {model}
      </Text>

      <Text style={styles.textSubTitle}>Details</Text>
      <View style={styles.containerDetails}>
        <Text style={styles.textDetails}>Picked time:</Text>
        <Text style={styles.textDetailsValue}>{memoRentTime}</Text>
      </View>
      <View style={styles.containerDetails}>
        <Text style={styles.textDetails}>Cost:</Text>
        <Text style={styles.textDetailsValue}>{cost}$ / 4 hours</Text>
      </View>
      <CustomButton title="Cancel rent" onPress={onCancelRent} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.background,
    borderRadius: 30,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  textSubTitle: {
    color: colors.black,
    fontSize: fontSizes.medium,
    margin: 10,
    fontWeight: '500',
  },
  containerDetails: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textDate: {
    color: colors.black,
    fontSize: fontSizes.large,
    fontWeight: '700',
  },
  textDetails: {
    color: colors.black,
    fontSize: fontSizes.medium,
  },
  textDetailsValue: {},
  textModel: {
    textAlign: 'center',
    paddingLeft: 10,
    color: colors.black,
    fontSize: fontSizes.large,
    fontWeight: '700',
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
});

export default BookedItem;
