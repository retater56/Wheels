import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import {Navigation} from './types';
import {useTheme} from '../../ThemeProvider';
import commonStyles from '../common/styles';
import {getImgSource, uriImg} from '../../constants';

const SearchItem = ({item}: any) => {
  const navigation = useNavigation<Navigation>();
  const {colors} = useTheme();
  const {id, mark, model, cost} = item;

  const [imgSource, setImgSource] = useState('');

  useEffect(() => {
    const imgSource = getImgSource(item);
    setImgSource(imgSource);
  }, []);

  const memoImageSource = useMemo(() => uriImg(imgSource), [imgSource]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.card, {backgroundColor: colors.backgroundLight}]}
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
            <Text style={[styles.textModel, {color: colors.text}]}>
              {mark} {model}
            </Text>
          </View>
          <View
            style={[styles.costContainer, {backgroundColor: colors.secondary}]}>
            <Text style={[styles.textCost, {color: colors.white}]}>
              {cost}$ / 4 hr
            </Text>
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
    borderRadius: 30,
    height: 200,
    marginVertical: 10,
    marginHorizontal: 20,
    ...commonStyles.shadow,
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
    ...commonStyles.largeText,
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
  },
  textCost: {
    padding: 10,
    ...commonStyles.largeText,
  },
});

export default SearchItem;
