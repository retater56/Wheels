import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';

const BookedItem = ({item}: any) => {
  const {id, mark, imgSourceBase64, model, imageSource, rentDate, rentTime} =
    item;

  const [imgSource, setImgSource] = useState('');

  useEffect(() => {
    item.imageSource
      ? setImgSource(imageSource)
      : setImgSource('data:image/jpeg;base64,' + imgSourceBase64);
  }, []);

  const memoImageSource = useMemo(() => {
    return {
      uri: imgSource,
    };
  }, [imgSource]);

  return (
    <TouchableOpacity style={styles.card} key={id} onPress={() => {}}>
      {imgSource !== '' ? (
        <Image source={memoImageSource} style={styles.image} />
      ) : (
        <></>
      )}
      <Text style={styles.text}>
        {mark} {model}
      </Text>
      <Text style={styles.text}>
        {rentDate} {rentTime}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    backgroundColor: colors.primaryLight,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  text: {
    padding: 10,
    color: colors.textPrimary,
    fontSize: fontSizes.medium,
  },
});

export default BookedItem;
