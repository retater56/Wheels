import React, {useCallback, useEffect} from 'react';
import {StyleSheet, SafeAreaView, View, FlatList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getCars, getCarsIsFetching} from '../../constants';
import {fetchCars} from '../../redux/actions/cars';
import colors from '../../styles/colors';
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

  const keyItem = useCallback(item => item.id, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={cars}
          renderItem={renderItem}
          keyExtractor={keyItem}
          onRefresh={onRefresh}
          refreshing={isFetching}></FlatList>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.primaryDark,
  },
});

export default Search;
