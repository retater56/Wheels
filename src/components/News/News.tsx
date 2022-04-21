import React, {useCallback, useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import INewsDetail from './types';
import {useDispatch, useSelector} from 'react-redux';
import NewsItem from './NewsItem';
import {getNews, getNewsIsFetching, getNewsTheme} from '../../constants';
import {fetchNews} from '../../redux/reducers/newsReducer';
import LoadingScreen from '../common/LoadingScreen';
import {SafeAreaView} from 'react-native';
import OrientationContainer from '../common/OrientationContainer';

const News = () => {
  const news = useSelector(getNews);
  const theme = useSelector(getNewsTheme);
  const isFetching = useSelector(getNewsIsFetching);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews('supercars'));
  }, []);

  const onRefresh = () => {
    dispatch(fetchNews(theme));
  };

  const renderItem = useCallback(({item}: {item: INewsDetail}) => {
    return <NewsItem item={item} />;
  }, []);

  const keyItem = useCallback((item) => item.title, []);

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <OrientationContainer>
        <FlatList
          data={news}
          renderItem={renderItem}
          keyExtractor={keyItem}
          onRefresh={onRefresh}
          refreshing={isFetching}
        />
      </OrientationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default News;
