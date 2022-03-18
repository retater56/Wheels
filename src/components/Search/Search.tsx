import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  View,
  FlatList,
} from 'react-native';
import { API_CARS } from '../../constants';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import {RootTabParamList} from '../../types';
import ICar from './types';

type Props = NativeStackScreenProps<RootTabParamList, 'Search'>;

const Search = ({navigation}: Props) => {
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

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.card}
      key={item.id}
      onPress={() => {
        navigation.navigate('SearchDetails', {item});
      }}>
      <Image
        style={styles.image}
        source={{
          uri: `${
            item.imageSource
              ? item.imageSource
              : `data:image/jpeg;base64,${item.imgSourceBase64}`
          }`,
        }}
      />
      <Text style={styles.text}>{item.mark} {item.model}</Text>
    </TouchableOpacity>
  );

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
  card: {
    padding: 10,
    backgroundColor: colors.primaryLight,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  text: {
    padding: 10,
    color: colors.textPrimary,
    fontSize: fontSizes.medium,
  },
});

export default Search;
