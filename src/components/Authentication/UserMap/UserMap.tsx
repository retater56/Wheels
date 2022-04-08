import React, {useEffect, useMemo} from 'react';
import MapView from 'react-native-maps';
import {useDispatch, useSelector} from 'react-redux';
import {
  exampleUserLocation,
  getOwnerCars,
  getUserName,
} from '../../../constants';
import {fetchOwnerCars} from '../../../redux/reducers/ownerCarsReducer';
import CustomMarker from './CustomMarker';
import {StyleSheet} from 'react-native';

const UserMap = () => {
  const cars = useSelector(getOwnerCars);
  const userName = useSelector(getUserName);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOwnerCars(userName));
  }, []);

  const userLocation = useMemo(() => {
    return exampleUserLocation;
  }, []);

  return (
    <MapView style={styles.mapView} initialRegion={userLocation}>
      {cars.map(car => (
        <CustomMarker item={car} />
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
});

export default UserMap;
