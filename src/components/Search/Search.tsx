import React, {useCallback, useEffect} from 'react';
import {StyleSheet, SafeAreaView, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getCars, getCarsIsFetching} from '../../constants';
import {fetchCars} from '../../redux/reducers/carsReducer';
import SearchItem from './SearchItem';
import {ICar} from './types';

const Search = () => {
  const cars = useSelector(getCars);
  const isFetching = useSelector(getCarsIsFetching);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCars());
  }, []);

  const onRefresh = () => {
    dispatch(fetchCars());
  };

  const renderItem = useCallback(({item}: {item: ICar}) => {
    return <SearchItem item={item} />;
  }, []);

  const keyItem = useCallback((item) => item.id, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.list}
        data={cars}
        renderItem={renderItem}
        keyExtractor={keyItem}
        onRefresh={onRefresh}
        refreshing={isFetching}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
});

export default Search;
