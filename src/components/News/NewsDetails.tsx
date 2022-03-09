import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';

const NewsDetails = ({route}: any) => {
  const {item} = route.params;

  console.log(item);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.textTitle}>"{item.title}"</Text>
        {item.image_url ? <Image style={styles.image} source={{uri: `${item.image_url}`}} /> : <></>}
        <Text style={styles.textInfo}>Topic: {item.category[0]}, {item.pubDate}</Text>
        {item.description ? <Text style={styles.textDescription}>{item.description}</Text> : <></>}
        {item.content ? <Text style={styles.textContent}>{item.content}</Text> : <></>}
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
    textAlign: 'center'
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
