import React, {useMemo} from 'react';
import {Marker} from 'react-native-maps';

const CustomMarker = ({item}: any) => {
  const {id, position, mark, model} = item;

  const location = useMemo(() => {
    const [lat, long] = position.split('/');
    return {latitude: Number(lat), longitude: Number(long)};
  }, []);

  return (
    <Marker key={id} coordinate={location} title={mark} description={model} />
  );
};

export default CustomMarker;
