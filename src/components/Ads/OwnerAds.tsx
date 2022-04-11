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
import {useTheme} from '../../ThemeProvider';
import NotLoggedScreen from '../common/NotLoggedScreen';
import commonStyles from '../common/styles';
import {ICar} from '../CreateAd/types';
import SearchItem from '../Search/SearchItem';

const OwnerAds = () => {
  const cars = useSelector(getOwnerCars);
  const isLoggedIn = useSelector(getLoggedIn);
  const userName = useSelector(getUserName);
  const isFetching = useSelector(getOwnerCarsIsFetching);
  const {colors} = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOwnerCars(userName));
  }, []);

  const onRefresh = () => {
    dispatch(fetchOwnerCars(userName));
    console.log(cars);
  };

  const renderItem = useCallback(({item}: {item: ICar}) => {
    return <SearchItem item={item} />;
  }, []);

  const keyItem = useCallback(item => item.id, []);

  if (!isLoggedIn) {
    return <NotLoggedScreen />;
  }

  return (
    <>
      {cars.length === 0 ? (
        <Text style={[styles.text, {color: colors.text}]}>
          Your own cars will be displayed here...
        </Text>
      ) : (
        <View style={styles.container}>
          <FlatList
            data={cars}
            renderItem={renderItem}
            keyExtractor={keyItem}
            onRefresh={onRefresh}
            refreshing={isFetching} />
        </View>
      )}
    </>
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

export default OwnerAds;
