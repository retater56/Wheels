import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo} from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import {RootTabParamList} from '../../types';

type Props = NativeStackScreenProps<RootTabParamList, 'NewsDetails'>;

const NewsDetails = ({route}: Props) => {
  const {item} = route.params;

  const {urlToImage, title, description, content, source} = item;

  const memoImageSource = useMemo(() => {
    return {
      uri: urlToImage,
    };
  }, [urlToImage]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.textTitle}>"{title}"</Text>
        {urlToImage && <Image style={styles.image} source={memoImageSource} />}
        <Text style={styles.textInfo}>Author: {source.name}</Text>
        {description ? (
          <Text style={styles.textDescription}>{description}</Text>
        ) : (
          <></>
        )}
        {content ? <Text style={styles.textContent}>{content}</Text> : <></>}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.primaryDark,
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
  textTitle: {
    padding: 10,
    color: colors.textPrimary,
    fontSize: fontSizes.large,
    textAlign: 'center',
  },
  textInfo: {
    padding: 10,
    color: colors.textSecondary,
    fontSize: fontSizes.small,
  },
  textDescription: {
    padding: 10,
    color: colors.textSecondary,
    fontSize: fontSizes.medium,
  },
  textContent: {
    padding: 10,
    color: colors.textPrimary,
    fontSize: fontSizes.medium,
  },
});

export default NewsDetails;
