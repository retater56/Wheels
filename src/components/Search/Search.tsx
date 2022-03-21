import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, View, FlatList} from 'react-native';
import {API_CARS} from '../../constants';
import colors from '../../styles/colors';
import SearchItem from './SearchItem';
import {ICar} from './types';

const Search = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [cars, setCars] = useState<ICar[]>([]);

  const fetchCars = async () => {
    try {
      const response = await fetch(API_CARS, {
        method: 'GET',
      });
      const responseData = await response.json();
      setCars(responseData);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = () => {
    setIsFetching(true);
    fetchCars();
  };

  const renderItem = ({item}: {item: ICar}) => {
    return <SearchItem item={item} />;
  };

  useEffect(() => {
    fetchCars();
  }, []);

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
