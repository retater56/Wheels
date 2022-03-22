import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import colors from '../../styles/colors';
import INewsDetail from './types';
import {useDispatch, useSelector} from 'react-redux';
import {fetchNews} from '../../redux/actions/news';
import {RootState} from '../../redux/reducers/rootReducer';
import NewsItem from './NewsItem';


export const getNews = (state: RootState) => state.news.dataNews;

const News = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [news, setNews] = useState<INewsDetail[]>([]);
  const dispatch = useDispatch();
  const data = useSelector(getNews);

  const onRefresh = () => {
    setIsFetching(true);
    dispatch(fetchNews());
  };

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  useEffect(() => {
    setIsFetching(false);
    setNews(data);
  }, [data]);

  const renderItem = ({item}: {item: INewsDetail}) => <NewsItem item={item} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={item => item.title}
        onRefresh={onRefresh}
        refreshing={isFetching}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.primaryDark,
  },
});

export default News;
