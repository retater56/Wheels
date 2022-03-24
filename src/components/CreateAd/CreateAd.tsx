import React, {useCallback, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Button,
  ScrollView,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PickerSelect from 'react-native-picker-select';
import fontSizes from '../../styles/fontSizes';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootTabParamList} from '../../types';
import colors from '../../styles/colors';

import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {CreateAdSchema} from './validation';
import {fuelData, transmissionData} from './constants';
import {addCar} from '../../redux/actions/createAd';
import {getUserName} from '../../constants';

type Props = NativeStackScreenProps<RootTabParamList, 'Create'>;

const CreateAd = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const owner = useSelector(getUserName);

  const {handleChange, handleSubmit, setFieldValue, values, errors, isValid} =
    useFormik({
      initialValues: {
        imgSourceBase64: '',
        mark: '',
        model: '',
        fuel: '',
        doors: '',
        transmission: '',
        seats: '',
        baggageCapacity: '',
        capacity: '',
      },
      validateOnChange: false,
      validateOnBlur: false,
      validationSchema: CreateAdSchema,
      onSubmit: (values, {resetForm}) => {
        dispatch(addCar({...values, owner}));
        resetForm();
      },
    });
  const memoFuelData = useMemo(() => {
    return fuelData;
  }, []);

  const memoTransmissionData = useMemo(() => {
    return transmissionData;
  }, []);

  const memoImageSource = useMemo(() => {
    return {
      uri: `data:image/jpeg;base64,${values.imgSourceBase64}`,
    };
  }, [values.imgSourceBase64]);

  const onPressMark = useCallback(() => {
    navigation.navigate('CreateAdDetails', {
      paramType: 'mark',
      onSelect: onSelect,
    });
  }, []);

  const onPressModel = useCallback(() => {
    if (!values.mark) {
      return Alert.alert('Please, choose mark');
    }
    navigation.navigate('CreateAdDetails', {
      mark: values.mark,
      paramType: 'model',
      onSelect: onSelect,
    });
  }, [values.mark]);

  const onSelect = (paramType: string, item: string) => {
    setFieldValue(paramType, item);
    if (paramType === 'mark') {
      setFieldValue('model', '');
    }
  };

  const onChoosePhoto = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
    };

    launchImageLibrary(options, response => {
      if (response.assets) {
        setFieldValue('imgSourceBase64', response.assets[0].base64);
      }
    });
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Add a photo</Text>
        <View style={styles.centerContainer}>
          {values.imgSourceBase64 !== '' ? (
            <View>
              <Image
                source={memoImageSource}
                style={[styles.photoData, {width: 300}]}
              />
            </View>
          ) : (
            <TouchableOpacity style={styles.photoData} onPress={onChoosePhoto}>
              <View style={styles.photoCard}>
                <Icon name="plus" size={50} color={colors.primaryLight} />
              </View>
            </TouchableOpacity>
          )}
          {errors.imgSourceBase64 && (
            <Text style={styles.errors}>{errors.imgSourceBase64}</Text>
          )}
        </View>
        <Text style={styles.title}>Mark</Text>
        <View style={styles.centerContainer}>
          <TouchableOpacity style={styles.inputData} onPress={onPressMark}>
            <Text>{values.mark}</Text>
          </TouchableOpacity>
          {errors.mark && <Text style={styles.errors}>{errors.mark}</Text>}
        </View>
        <Text style={styles.title}>Model</Text>
        <View style={styles.centerContainer}>
          <TouchableOpacity style={styles.inputData} onPress={onPressModel}>
            <Text>{values.model}</Text>
          </TouchableOpacity>
          {errors.model && <Text style={styles.errors}>{errors.model}</Text>}
        </View>
        <Text style={styles.title}>Fuel type</Text>
        <View style={styles.centerContainer}>
          <PickerSelect
            value={values.fuel}
            style={pickerStyle}
            onValueChange={handleChange('fuel')}
            placeholder={{label: 'Select an item...', value: ''}}
            items={memoFuelData}
          />
          {errors.fuel && <Text style={styles.errors}>{errors.fuel}</Text>}
        </View>
        <Text style={styles.title}>Doors</Text>
        <View style={styles.centerContainer}>
          <TextInput
            value={values.doors}
            style={styles.inputData}
            keyboardType={'numeric'}
            onChangeText={handleChange('doors')}></TextInput>
          {errors.doors && <Text style={styles.errors}>{errors.doors}</Text>}
        </View>
        <Text style={styles.title}>Transmission</Text>
        <View style={styles.centerContainer}>
          <PickerSelect
            value={values.transmission}
            style={pickerStyle}
            onValueChange={handleChange('transmission')}
            placeholder={{label: 'Select an item...', value: ''}}
            items={memoTransmissionData}
          />
          {errors.transmission && (
            <Text style={styles.errors}>{errors.transmission}</Text>
          )}
        </View>
        <Text style={styles.title}>Seats</Text>
        <View style={styles.centerContainer}>
          <TextInput
            value={values.seats}
            style={styles.inputData}
            keyboardType={'numeric'}
            onChangeText={handleChange('seats')}></TextInput>
          {errors.seats && <Text style={styles.errors}>{errors.seats}</Text>}
        </View>
        <Text style={styles.title}>Baggage Capacity</Text>
        <View style={styles.centerContainer}>
          <TextInput
            value={values.baggageCapacity}
            style={styles.inputData}
            keyboardType={'numeric'}
            onChangeText={handleChange('baggageCapacity')}></TextInput>
          {errors.baggageCapacity && (
            <Text style={styles.errors}>{errors.baggageCapacity}</Text>
          )}
        </View>
        <Text style={styles.title}>Capacity</Text>
        <View style={styles.centerContainer}>
          <TextInput
            value={values.capacity}
            style={styles.inputData}
            keyboardType={'numeric'}
            onChangeText={handleChange('capacity')}></TextInput>
          {errors.capacity && (
            <Text style={styles.errors}>{errors.capacity}</Text>
          )}
        </View>
        <Button title="Add a car" onPress={() => handleSubmit()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 10,
  },
  centerContainer: {
    alignItems: 'center',
  },
  photoData: {
    backgroundColor: colors.primaryLight,
    width: '90%',
    height: 200,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoCard: {
    backgroundColor: colors.white,
    borderRadius: 50,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSizes.medium,
  },
  inputData: {
    padding: 10,
    margin: 10,
    width: '90%',
    height: 40,
    backgroundColor: colors.primaryLight,
    borderRadius: 5,
  },
  errors: {
    fontSize: fontSizes.small,
    color: 'red',
  },
});

const pickerStyle = {
  inputIOS: {
    padding: 10,
    height: 40,
    color: colors.black,
    marginHorizontal: 20,
    borderRadius: 5,
    backgroundColor: colors.primaryLight,
  },
  inputAndroid: {
    color: 'black',
  },
};

export default CreateAd;
