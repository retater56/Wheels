import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import {ScrollView, Text, StyleSheet, Image, View, Button} from 'react-native';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import {RootTabParamList} from '../../types';

type Props = NativeStackScreenProps<RootTabParamList, 'SearchDetails'>;

const SearchDetails = ({route}: Props) => {
  const {item} = route.params;
  const [imgSource, setImgSource] = useState('');

  useEffect(() => {
    item.imageSource
      ? setImgSource(item.imageSource)
      : setImgSource('data:image/jpeg;base64,' + item.imgSourceBase64);
  }, []);

  const memoImageSource = useMemo(() => {
    return {
      uri: imgSource,
    };
  }, [imgSource]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {imgSource !== '' ? (
          <Image source={memoImageSource} style={styles.image} />
        ) : (
          <></>
        )}
        <Text style={styles.textTitle}>
          {item.mark} {item.model}
        </Text>
        <View style={styles.textContent}>
          <Text style={styles.textInfo}>Fuel type</Text>
          <Text style={styles.textInfo}>{item.fuel}</Text>
        </View>
        <View style={styles.textContent}>
          <Text style={styles.textInfo}>Doors count</Text>
          <Text style={styles.textInfo}>{item.doors}</Text>
        </View>
        <View style={styles.textContent}>
          <Text style={styles.textInfo}>Transmission type</Text>
          <Text style={styles.textInfo}>{item.transmission}</Text>
        </View>
        <View style={styles.textContent}>
          <Text style={styles.textInfo}>Seats count</Text>
          <Text style={styles.textInfo}>{item.seats}</Text>
        </View>
        <View style={styles.textContent}>
          <Text style={styles.textInfo}>Baggage Capacity</Text>
          <Text style={styles.textInfo}>{item.baggageCapacity}</Text>
        </View>
        <View style={styles.textContent}>
          <Text style={styles.textInfo}>Capacity</Text>
          <Text style={styles.textInfo}>{item.capacity}</Text>
        </View>
        <View style={[styles.textContent, {justifyContent: 'space-around'}]}>
          {/* {item.facilities.map(facil => (
            <Text key={facil} style={styles.textInfo}>
            {facil}
          </Text>
        ))} */}
        </View>
        <Button title="Rent a car" onPress={() => {}}></Button>
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
  image: {
    width: '100%',
    height: 200,
    margin: 20,
    borderRadius: 5,
    resizeMode: 'contain',
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
    fontSize: fontSizes.medium,
  },
  textContent: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SearchDetails;
