import {useNavigation} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {Navigation} from '../Search/types';
import moment from 'moment';
import {useTheme} from '../../ThemeProvider';
import commonStyles from '../common/styles';

const NewsItem = ({item}: any) => {
  const navigation = useNavigation<Navigation>();
  const {publishedAt, urlToImage, title} = item;
  const {colors} = useTheme();

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
      style={[styles.card, {backgroundColor: colors.background}]}
      key={publishedAt}
      onPress={() => {
        navigation.navigate('NewsDetails', {item: item});
      }}>
      {urlToImage && (
        <Image
          style={[styles.image, {borderColor: colors.secondary}]}
          source={memoImageSource}
        />
      )}
      <Text style={[styles.text, {color: colors.text}]}>{title}</Text>
      <Text style={[styles.textInfo, {color: colors.secondaryText}]}>
        {date}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 30,
    ...commonStyles.shadow,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 30,
    borderWidth: 2,
  },
  text: {
    marginTop: 10,
    paddingHorizontal: 20,
    ...commonStyles.mediumText,
  },
  textInfo: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    textAlign: 'right',
    ...commonStyles.smallText,
  },
});

export default NewsItem;
