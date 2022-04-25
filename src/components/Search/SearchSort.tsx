import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import {fetchSortedCars} from '../../redux/reducers/carsReducer';
import {useTheme} from '../../ThemeProvider';
import CustomTouchableOpacity from '../common/CustomTouchableOpacity';
import OrientationContainer from '../common/OrientationContainer';
import commonStyles from '../common/styles';
import {Navigation} from '../Search/types';
import {searchSortArray} from './constants';

const SearchSort = () => {
  const navigation = useNavigation<Navigation>();
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const onChoose = useCallback((item) => {
    navigation.goBack();
    dispatch(fetchSortedCars(item.link));
  }, []);

  const renderLinks = useCallback(({item}) => {
    return (
      <View style={styles.container}>
        <OrientationContainer style={styles.container}>
          <CustomTouchableOpacity onPress={() => onChoose(item)}>
            {item.name}
          </CustomTouchableOpacity>
        </OrientationContainer>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.text, {color: colors.text}]}>
        You can choose another sort
      </Text>
      <FlatList
        style={styles.list}
        data={searchSortArray}
        renderItem={renderLinks}
        keyExtractor={(item) => item.link}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
    margin: 10,
    ...commonStyles.largeText,
  },
});

export default SearchSort;
