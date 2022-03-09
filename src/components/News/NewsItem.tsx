import React from 'react';
import {TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import colors from '../../styles/colors';

type data = {
  pubDate: React.Key | null | undefined;
  image_url: string;
  title: string;
};

const NewsItem = (item: data) => {
  return (
    <TouchableOpacity style={styles.card} key={item.pubDate}>
      {item.image_url ? (
        <Image
          style={styles.image}
          source={{
            uri: `${item.image_url}`,
          }}></Image>
      ) : (
        <></>
      )}
      <Text style={styles.text}>{item.title}</Text>
      <Text style={styles.text}>{item.pubDate}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
    fontSize: 18,
  },
});

export default NewsItem;
