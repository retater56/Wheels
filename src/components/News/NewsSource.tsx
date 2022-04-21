import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import {fetchNews} from '../../redux/reducers/newsReducer';
import {useTheme} from '../../ThemeProvider';
import CustomTouchableOpacity from '../common/CustomTouchableOpacity';
import commonStyles from '../common/styles';
import {Navigation} from '../Search/types';
import newsSourceArray from './constants';

const NewsSource = () => {
  const navigation = useNavigation<Navigation>();
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const onChoose = useCallback(item => {
    navigation.goBack();
    dispatch(fetchNews(item.keyword));
  }, []);

  const renderLinks = useCallback(({item}) => {
    return (
      <View style={styles.container}>
        <CustomTouchableOpacity onPress={() => onChoose(item)}>
          {item.name}
        </CustomTouchableOpacity>
      </View>
    );
  }, []);

  return (
    <>
      <Text style={[styles.text, {color: colors.text}]}>
        You can choose another news topic
      </Text>
      <FlatList
        data={newsSourceArray}
        renderItem={renderLinks}
        keyExtractor={item => item.keyword}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
    margin: 10,
    ...commonStyles.largeText,
  },
});

export default NewsSource;
