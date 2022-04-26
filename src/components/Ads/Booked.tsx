import React, {useCallback, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLoggedIn,
  getCustomerCars,
  getUserName,
  getCustomerCarsIsFetching,
} from '../../constants';
import {fetchCustomerCars} from '../../redux/reducers/customerCarsReducer';
import {useTheme} from '../../ThemeProvider';
import NotLoggedScreen from '../common/NotLoggedScreen';
import commonStyles from '../common/styles';
import {ICar} from '../CreateAd/types';
import BookedItem from './BookedItem';

const Booked = () => {
  const cars = useSelector(getCustomerCars);
  const isLoggedIn = useSelector(getLoggedIn);
  const userName = useSelector(getUserName);
  const isFetching = useSelector(getCustomerCarsIsFetching);
  const {colors} = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomerCars(userName));
  }, []);

  const onRefresh = () => {
    dispatch(fetchCustomerCars(userName));
  };

  const renderItem = useCallback(({item}: {item: ICar}) => {
    return <BookedItem item={item} />;
  }, []);

  const keyItem = useCallback((item) => item.id + item.rentTime, []);

  if (!isLoggedIn) {
    return <NotLoggedScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {cars.length === 0 ? (
        <Text style={[styles.text, {color: colors.text}]}>
          Your booked cars will be displayed here...
        </Text>
      ) : (
        <FlatList
          data={cars}
          renderItem={renderItem}
          keyExtractor={keyItem}
          onRefresh={onRefresh}
          refreshing={isFetching}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    padding: 20,
    ...commonStyles.largeText,
  },
});

export default Booked;
