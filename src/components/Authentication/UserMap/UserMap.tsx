import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, SafeAreaView, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { getLoggedIn, getOwnerCars, getOwnerCarsIsFetching, getUserName } from '../../../constants';
import { fetchOwnerCars } from '../../../redux/reducers/ownerCarsReducer';
import colors from '../../../styles/colors';
import fontSizes from '../../../styles/fontSizes';
import CustomMarker from './CustomMarker';


const UserMap = () => {
  const [markers, setMarkers] = useState([]);
  const cars = useSelector(getOwnerCars);
  const isLoggedIn = useSelector(getLoggedIn);
  const userName = useSelector(getUserName);
  const isFetching = useSelector(getOwnerCarsIsFetching);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOwnerCars(userName));
    // console.log(cars)
  }, []);

  // const location = useCallback<any>((position: any) => {
  //   const [lat, long] = position.split('/');
  //   // return {latitude: Number(lat), longitude: Number(long)};
  //   return {latitude: Number(position.split('/')[0]), longitude: Number(position.split('/')[1])};
  // }, []);

  return (
    <MapView
      style={{flex: 1}}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {cars.map(car => (
        <CustomMarker item={car}/>
      ))}
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  textTitle: {
    color: colors.black,
    fontSize: fontSizes.big,
  },
});

export default UserMap;
