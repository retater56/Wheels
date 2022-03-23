import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import {Navigation} from '../Search/types';
import moment from 'moment';

const NewsItem = ({item}: any) => {
  const navigation = useNavigation<Navigation>();
  const {publishedAt, urlToImage, title} = item;

  const memoImageSource = useMemo(() => {
    return {
      uri: urlToImage,
    };
  }, []);

  const date = useMemo(() => {
    return moment(publishedAt).format('YYYY-MM-DD h:mm a');
  }, [publishedAt]);

  return (
    <TouchableOpacity
      style={styles.card}
      key={publishedAt}
      onPress={() => {
        navigation.navigate('NewsDetails', {item: item});
      }}>
      {urlToImage && <Image style={styles.image} source={memoImageSource} />}
      <Text style={styles.text}>{title}</Text>
      <Text style={styles.textInfo}>{date}</Text>
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
