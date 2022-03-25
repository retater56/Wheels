import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getLoggedIn,
  getOwnerCars,
  getOwnerCarsIsFetching,
  getUserName,
} from '../../constants';
import {fetchOwnerCars} from '../../redux/reducers/ownerCarsReducer';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import {ICar} from '../CreateAd/types';
import SearchItem from '../Search/SearchItem';

const OwnerAds = () => {
  const cars = useSelector(getOwnerCars);
  const isLoggedIn = useSelector(getLoggedIn);
  const userName = useSelector(getUserName);
  const isFetching = useSelector(getOwnerCarsIsFetching);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOwnerCars(userName));
  }, []);

  const onRefresh = () => {
    dispatch(fetchOwnerCars(userName));
    console.log(cars)
  };

  const renderItem = useCallback(({item}: {item: ICar}) => {
    return <SearchItem item={item} />;
  }, []);

  const keyItem = useCallback(item => item.id, []);

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
          <Text style={styles.infoText}>You aren't authorized yet...</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  infoText: {
    color: colors.textPrimary,
    fontSize: fontSizes.large,
    textAlign: 'center',
    padding: 20,
  },
});

export default OwnerAds;
