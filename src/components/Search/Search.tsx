import React, {useCallback, useEffect} from 'react';
import {StyleSheet, SafeAreaView, View, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getCars, getCarsIsFetching} from '../../constants';
import {fetchCars} from '../../redux/reducers/carsReducer';
import {useTheme} from '../../ThemeProvider';
import SearchItem from './SearchItem';
import {ICar} from './types';

const Search = () => {
  const cars = useSelector(getCars);
  const isFetching = useSelector(getCarsIsFetching);
  const {colors} = useTheme();
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
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <FlatList
          data={cars}
          renderItem={renderItem}
          keyExtractor={keyItem}
          onRefresh={onRefresh}
          refreshing={isFetching}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default Search;
