import React, {useCallback, useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
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
import OwnerItem from './OwnerItem';

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
  };

  const renderItem = useCallback(({item}: {item: ICar}) => {
    return <OwnerItem item={item} />;
  }, []);

  const keyItem = useCallback((item) => item.id, []);

  if (!isLoggedIn) {
    return <NotLoggedScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {cars.length === 0 ? (
        <Text style={[styles.text, {color: colors.text}]}>
          Your own cars will be displayed here...
        </Text>
      ) : (
        <FlatList
          style={{width: '100%'}}
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
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    padding: 20,
    ...commonStyles.largeText,
  },
});

export default OwnerAds;
