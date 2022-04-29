import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const SearchMap = (pos: {pos: string}) => {
  const position = pos.pos;

  const location = useMemo(() => {
    const [lat, long] = position.split('/');
    return {latitude: Number(lat), longitude: Number(long)};
  }, []);

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        ...location,
      }}>
      <Marker coordinate={location} />
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '90%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
});

export default SearchMap;
