import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useMemo} from 'react';
import {StyleSheet, Text, View, Image, ScrollView, Linking} from 'react-native';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import {RootTabParamList} from '../../types';
import CustomButton from '../common/CustomButton';

type Props = NativeStackScreenProps<RootTabParamList, 'NewsDetails'>;

const NewsDetails = ({route}: Props) => {
  const {item} = route.params;

  const {urlToImage, title, description, content, source, url} = item;

  const memoImageSource = useMemo(() => {
    return {
      uri: urlToImage,
    };
  }, [urlToImage]);

  const onPressLink = useCallback(() => Linking.openURL(url), []);

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
        <CustomButton title="Read From Source" onPress={onPressLink} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  image: {
    width: '95%',
    height: 200,
    borderRadius: 5,
  },
  textTitle: {
    padding: 10,
    marginBottom: 10,
    color: colors.black,
    fontSize: fontSizes.large,
    fontWeight: '700',
    textAlign: 'center',
  },
  textInfo: {
    padding: 10,
    paddingHorizontal: 20,
    color: colors.gray,
    fontSize: fontSizes.small,
  },
  textDescription: {
    padding: 10,
    color: colors.primaryLight,
    fontSize: fontSizes.medium,
  },
  textContent: {
    padding: 10,
    color: colors.black,
    fontSize: fontSizes.medium,
  },
});

export default NewsDetails;
