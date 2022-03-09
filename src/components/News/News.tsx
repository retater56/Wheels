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

const News = ({navigation}: any) => {
  const [isFetching, setIsFetching] = useState(false);
  const [news, setNews] = useState<any[]>([]);

  const fetchNews = async () => {
    try {
      const newsData = await axios.get('http://localhost:8080/news');
      //   console.log(newsData.data[0]);
      setNews(newsData.data);
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
