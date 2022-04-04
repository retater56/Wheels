import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import {Navigation} from './types';

const SearchItem = ({item}: any) => {
  const navigation = useNavigation<Navigation>();
  const { id, mark, imgSourceBase64, model, imageSource, cost } = item;

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
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.card}
        key={id}
        onPress={() => {
          navigation.navigate('SearchDetails', {item});
        }}>
        {imgSource !== '' ? (
          <Image source={memoImageSource} style={styles.image} />
        ) : (
          <></>
        )}
        <View style={styles.info}>
          <View style={styles.modelContainer}>
            <Text style={styles.textModel}>
              {mark} {model}
            </Text>
          </View>
          <View style={styles.costContainer}>
            <Text style={styles.textCost}>{cost}$ / 4 hr</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  card: {
    justifyContent: 'flex-end',
    backgroundColor: colors.white,
    borderRadius: 30,
    height: 200,
    marginVertical: 10,
    marginHorizontal: 20,
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
    position: 'absolute',
    bottom: 50,
    width: '100%',
    height: 200,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textModel: {
    textAlign: 'center',
    paddingLeft: 10,
    color: colors.black,
    fontSize: fontSizes.large,
    fontWeight: '700',
  },
  modelContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  costContainer: {
    justifyContent: 'center',
    borderRadius: 30,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: colors.secondary,
  },
  textCost: {
    padding: 10,
    color: colors.white,
    fontSize: fontSizes.large,
    fontWeight: '700',
  },
});

export default SearchItem;
