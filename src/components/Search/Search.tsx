import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, View, FlatList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCars} from '../../redux/actions/cars';
import {RootState} from '../../redux/reducers/rootReducer';
import colors from '../../styles/colors';
import SearchItem from './SearchItem';
import {ICar} from './types';

export const getCars = (state: RootState) => state.cars.dataCars;

const Search = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [cars, setCars] = useState<ICar[]>([]);

  const dispatch = useDispatch();
  const data = useSelector(getCars);

  const onRefresh = () => {
    setIsFetching(true);
    dispatch(fetchCars());
  };

  useEffect(() => {
    dispatch(fetchCars());
  }, []);

  useEffect(() => {
    setIsFetching(false);
    setCars(data);
  }, [data]);

  const renderItem = ({item}: {item: ICar}) => {
    return <SearchItem item={item} />;
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={cars}
          renderItem={renderItem}
          keyExtractor={item => item.id}
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
