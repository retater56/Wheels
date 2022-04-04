import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import colors from '../../styles/colors';
import INewsDetail from './types';
import {useDispatch, useSelector} from 'react-redux';
import NewsItem from './NewsItem';
import {getNews, getNewsIsFetching} from '../../constants';
import {fetchNews} from '../../redux/reducers/newsReducer';

const News = () => {
  const news = useSelector(getNews);
  const isFetching = useSelector(getNewsIsFetching);
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
    <View style={styles.container}>
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
    backgroundColor: colors.background,
  },
});

export default News;
