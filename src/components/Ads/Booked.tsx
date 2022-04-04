import React, {useCallback, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLoggedIn,
  getCustomerCars,
  getUserName,
  getCustomerCarsIsFetching,
} from '../../constants';
import {fetchCustomerCars} from '../../redux/reducers/customerCarsReducer';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import {ICar} from '../CreateAd/types';
import BookedItem from './BookedItem';

const Booked = () => {
  const cars = useSelector(getCustomerCars);
  const isLoggedIn = useSelector(getLoggedIn);
  const userName = useSelector(getUserName);
  const isFetching = useSelector(getCustomerCarsIsFetching);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomerCars(userName));
  }, []);

  const onRefresh = () => {
    dispatch(fetchCustomerCars(userName));
    console.log(cars);
  };

  const renderItem = useCallback(({item}: {item: ICar}) => {
    return <BookedItem item={item} />;
  }, []);

  const keyItem = useCallback(item => item.id + item.rentTime, []);

  return (
    <>
      {isLoggedIn ? (
        <View style={styles.container}>
          <FlatList
            data={cars}
            renderItem={renderItem}
            keyExtractor={keyItem}
            onRefresh={onRefresh}
            refreshing={isFetching}></FlatList>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.infoText}>Sorry, but you aren't authorized yet...</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  infoText: {
    color: colors.black,
    fontSize: fontSizes.large,
    fontWeight: '500',
    textAlign: 'center',
    padding: 20,
  },
});

export default Booked;
