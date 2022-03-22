import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import {Navigation} from '../Search/types';

const NewsItem = ({item}: any) => {
  const navigation = useNavigation<Navigation>();
  const {publishedAt, urlToImage, title} = item;

  const memoImageSource = useMemo(() => {
    return {
      uri: urlToImage,
    };
  }, []);

  return (
    <TouchableOpacity
      style={styles.card}
      key={publishedAt}
      onPress={() => {
        navigation.navigate('NewsDetails', {item: item});
      }}>
      <Image style={styles.image} source={memoImageSource} />
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.textInfo}>{publishedAt.substring(0, 10)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '95%',
    padding: 10,
    margin: 10,
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

export default NewsItem;
