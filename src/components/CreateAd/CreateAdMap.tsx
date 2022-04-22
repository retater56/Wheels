import React, {useMemo, useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import CustomButton from '../common/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootTabParamList} from '../../types';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';
import {exampleUserLocation} from '../../constants';
import OrientationContainer from '../common/OrientationContainer';

type Props = NativeStackScreenProps<RootTabParamList, 'CreateAdMap'>;

const CreateAdMap = ({route, navigation}: Props) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const {paramLocation, onSelect} = route.params;

  const onRegionChange = (region: any) => {
    setLatitude(region.latitude);
    setLongitude(region.longitude);
  };

  const onPosition = () => {
    navigation.goBack();
    onSelect(paramLocation, `${latitude}/${longitude}`);
  };

  const location = useMemo(() => {
    return exampleUserLocation;
  }, []);

  return (
    <View style={styles.mapView}>
      <MapView
        style={styles.mapView}
        initialRegion={location}
        onRegionChangeComplete={onRegionChange}
      />
      <View style={styles.markerFixed}>
        <Icon name="flag" size={40} color={colors.secondary} />
      </View>
      <SafeAreaView style={styles.footer}>
        <OrientationContainer style={styles.center}>
          <CustomButton title="Pick Location" onPress={onPosition} />
        </OrientationContainer>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
  markerFixed: {
    marginLeft: -10,
    marginTop: -40,
    left: '50%',
    position: 'absolute',
    top: '50%',
  },
  center: {
    alignItems: 'center',
  },
  footer: {
    alignItems: 'center',
    bottom: 20,
    position: 'absolute',
    width: '100%',
  },
  region: {
    color: '#fff',
    lineHeight: 20,
    margin: 20,
  },
});

export default CreateAdMap;
