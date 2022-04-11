import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import INewsDetail from './types';
import {useDispatch, useSelector} from 'react-redux';
import NewsItem from './NewsItem';
import {getNews, getNewsIsFetching} from '../../constants';
import {fetchNews} from '../../redux/reducers/newsReducer';
import {useTheme} from '../../ThemeProvider';

const News = () => {
  const news = useSelector(getNews);
  const isFetching = useSelector(getNewsIsFetching);
  const {colors} = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  const onRefresh = () => {
    dispatch(fetchNews());
  };

  const renderItem = useCallback(({item}: {item: INewsDetail}) => {
    return <NewsItem item={item} />;
  }, []);

  const keyItem = useCallback(item => item.title, []);

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={keyItem}
        onRefresh={onRefresh}
        refreshing={isFetching}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});

export default News;
