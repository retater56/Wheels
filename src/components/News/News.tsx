import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import colors from '../../styles/colors';
import axios from 'axios';
import fontSizes from '../../styles/fontSizes';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootTabParamList } from '../../types';
import INewsDetail from './types';

type Props = NativeStackScreenProps<RootTabParamList, "News">

const News = ({navigation}: Props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [news, setNews] = useState<INewsDetail[]>([]);

  const fetchNews = async () => {
    try {
      const newsData = await axios.get('https://newsdata.io/api/1/news?apikey=pub_5257b286ff40d984dfea206caea9b5dbb764&q=car&language=en&category=business,sports,technology');
      setNews(newsData.data.results);
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = () => {
    setIsFetching(true);
    fetchNews();
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity style={styles.card} key={item.pubDate} onPress={() => {navigation.navigate('NewsDetails', {item: item})}}>
      {item.image_url ? (
        <Image
          style={styles.image}
          source={{
            uri: `${item.image_url}`,
          }}/>
      ) : (
        <></>
      )}
      <Text style={styles.text}>{item.title}</Text>
      <Text style={styles.textInfo}>{item.pubDate}</Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={news}
          renderItem={renderItem}
          keyExtractor={item => item.pubDate}
          onRefresh={onRefresh}
          refreshing={isFetching}></FlatList>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.primaryDark
  },
  card: {
    width: '95%',
    padding: 10,
    backgroundColor: colors.primaryLight,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
  },
  text: {
    padding: 10,
    color: colors.textPrimary,
    fontSize: fontSizes.medium,
  },
  textInfo: {
    textAlign: 'right',
    color: colors.textSecondary,
    fontSize: fontSizes.small,
  },
});

export default News;
