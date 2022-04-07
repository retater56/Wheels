import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import CustomButton from '../common/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootTabParamList} from '../../types';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../styles/colors';
import {Text} from 'react-native';

type Props = NativeStackScreenProps<RootTabParamList, 'CreateAdDetails'>;

const CreateAdMap = ({route, navigation}: Props) => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const {paramType, onSelect} = route.params;

  const onRegionChange = (region: any) => {
    setLatitude(region.latitude);
    setLongitude(region.longitude);
  };

  const onPosition = () => {
    navigation.goBack();
    onSelect(paramType, `${latitude}/${longitude}`);
  };

  return (
    <View style={styles.map}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onRegionChangeComplete={onRegionChange}
      />
      <View style={styles.markerFixed}>
        <Icon name="flag" size={40} color={colors.secondary} />
      </View>
      <SafeAreaView style={styles.footer}>
        <CustomButton title="Pick Location" onPress={onPosition} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  markerFixed: {
    marginLeft: -10,
    marginTop: -40,
    left: '50%',
    position: 'absolute',
    top: '50%',
  },
  footer: {
    alignItems: 'center',
    bottom: 30,
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
