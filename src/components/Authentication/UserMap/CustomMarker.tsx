import React, {useMemo} from 'react';
import {Marker} from 'react-native-maps';

const CustomMarker = ({item}: any) => {
  const {id, position, mark, model, cost} = item;

  const location = useMemo(() => {
    const [lat, long] = position.split('/');
    return {latitude: Number(lat), longitude: Number(long)};
  }, []);

  return (
    <Marker key={id} coordinate={location} title={`${mark} ${model}`} description={`${cost}$ / 4 Hours`} />
  );
};

export default CustomMarker;
