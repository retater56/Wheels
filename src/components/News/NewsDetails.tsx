import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
  SafeAreaView,
} from 'react-native';
import {useTheme} from '../../ThemeProvider';
import {RootTabParamList} from '../../types';
import CustomButton from '../common/CustomButton';
import OrientationContainer from '../common/OrientationContainer';
import commonStyles from '../common/styles';
import {Navigation} from '../Search/types';

type Props = NativeStackScreenProps<RootTabParamList, 'NewsDetails'>;

const NewsDetails = ({route}: Props) => {
  const navigation = useNavigation<Navigation>();
  const {item} = route.params;
  const {colors} = useTheme();

  const {urlToImage, title, description, content, source, url} = item;

  const memoImageSource = useMemo(() => {
    return {
      uri: urlToImage,
    };
  }, [urlToImage]);

  const onPressLink = useCallback(() => Linking.openURL(url), []);
  const onPressBack = useCallback(() => navigation.goBack(), []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[styles.container]}>
          <OrientationContainer style={styles.container}>
            <Text style={[styles.textTitle, {color: colors.text}]}>
              "{title}"
            </Text>
            {urlToImage && (
              <Image style={styles.image} source={memoImageSource} />
            )}
            <Text style={[styles.textInfo, {color: colors.secondaryText}]}>
              Author: {source.name}
            </Text>
            {description && (
              <Text
                style={[styles.textDescription, {color: colors.secondaryText}]}>
                {description}
              </Text>
            )}
            {content && (
              <Text style={[styles.textContent, {color: colors.text}]}>
                {content}
              </Text>
            )}
            <CustomButton title="Read From Source" onPress={onPressLink} />
            <CustomButton title="Back To News" onPress={onPressBack} />
          </OrientationContainer>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  image: {
    width: '95%',
    height: 200,
    borderRadius: 5,
  },
  textTitle: {
    padding: 10,
    marginBottom: 10,
    textAlign: 'center',
    ...commonStyles.largeText,
  },
  textInfo: {
    padding: 10,
    paddingHorizontal: 20,
    ...commonStyles.smallText,
  },
  textDescription: {
    padding: 10,
    ...commonStyles.mediumText,
  },
  textContent: {
    padding: 10,
    ...commonStyles.mediumText,
  },
});

export default NewsDetails;
