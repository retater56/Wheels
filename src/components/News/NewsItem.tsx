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
    margin: 10,
    backgroundColor: colors.white,
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  text: {
    marginTop: 10,
    paddingHorizontal: 20,
    color: colors.black,
    fontWeight: '500',
    fontSize: fontSizes.medium,
  },
  textInfo: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    textAlign: 'right',
    color: colors.gray,
    fontSize: fontSizes.small,
  },
});

export default NewsItem;
