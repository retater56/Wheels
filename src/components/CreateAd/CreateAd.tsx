import React, {useCallback, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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
import {getUserName} from '../../constants';
import {addCar} from '../../redux/reducers/createAdReducer';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';
import CustomTouchableOpacity from '../common/CustomTouchableOpacity';

type Props = NativeStackScreenProps<RootTabParamList, 'Create'>;

const CreateAd = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const owner = useSelector(getUserName);

  const {handleChange, handleSubmit, setFieldValue, values, errors} = useFormik(
    {
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
        cost: '',
        description: '',
        booking: {},
      },
      validateOnChange: false,
      validateOnBlur: false,
      validationSchema: CreateAdSchema,
      onSubmit: (values, {resetForm}) => {
        dispatch(addCar({...values, owner}));
        resetForm();
      },
    },
  );
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

  const onSubmit = useCallback(() => {
    handleSubmit();
  }, []);

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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Add a photo</Text>
      <View style={styles.centerContainer}>
        {values.imgSourceBase64 !== '' ? (
          <TouchableOpacity onPress={onChoosePhoto}>
            <Image
              source={memoImageSource}
              style={[styles.photoData, {width: 350}]}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.photoData, styles.shadow]}
            onPress={onChoosePhoto}>
            <View style={styles.photoDataCircle}>
              <Icon name="plus" size={70} color={colors.secondary} />
            </View>
          </TouchableOpacity>
        )}
        {errors.imgSourceBase64 && (
          <Text style={styles.errors}>{errors.imgSourceBase64}</Text>
        )}
      </View>
      <Text style={styles.title}>Set Mark and Model</Text>
      <View style={styles.centerContainer}>
        <CustomTouchableOpacity onPress={onPressMark}>
          {values.mark ? (
            <Text>{values.mark}</Text>
          ) : (
            <Text style={styles.colorGray}>Mark</Text>
          )}
        </CustomTouchableOpacity>
        {errors.mark && <Text style={styles.errors}>{errors.mark}</Text>}
        <CustomTouchableOpacity onPress={onPressModel}>
          {values.model ? (
            <Text>{values.model}</Text>
          ) : (
            <Text style={styles.colorGray}>Model</Text>
          )}
        </CustomTouchableOpacity>
        {errors.model && <Text style={styles.errors}>{errors.model}</Text>}
      </View>
      <Text style={styles.title}>Specifications</Text>
      <View style={styles.centerContainer}>
        <PickerSelect
          value={values.fuel}
          style={pickerStyle}
          onValueChange={handleChange('fuel')}
          placeholder={{label: 'Choose fuel type...', value: ''}}
          items={memoFuelData}
        />
        {errors.fuel && <Text style={styles.errors}>{errors.fuel}</Text>}
        <CustomTextInput keyboardType={'numeric'} placeholder="Doors" />
        {errors.doors && <Text style={styles.errors}>{errors.doors}</Text>}
        <PickerSelect
          value={values.transmission}
          style={pickerStyle}
          onValueChange={handleChange('transmission')}
          placeholder={{label: 'Choose transmission type...', value: ''}}
          items={memoTransmissionData}
        />
        {errors.transmission && (
          <Text style={styles.errors}>{errors.transmission}</Text>
        )}
        <CustomTextInput keyboardType={'numeric'} placeholder="Seats" />
        {errors.seats && <Text style={styles.errors}>{errors.seats}</Text>}
        <CustomTextInput
          keyboardType={'numeric'}
          placeholder="Baggage Capacity"
        />
        {errors.baggageCapacity && (
          <Text style={styles.errors}>{errors.baggageCapacity}</Text>
        )}
        <CustomTextInput keyboardType={'numeric'} placeholder="Capacity" />
        {errors.capacity && (
          <Text style={styles.errors}>{errors.capacity}</Text>
        )}
        <CustomTextInput keyboardType={'numeric'} placeholder="Your cost" />
        {errors.cost && <Text style={styles.errors}>{errors.cost}</Text>}
      </View>
      <Text style={styles.title}>Your description...</Text>
      <View style={styles.centerContainer}>
        <TextInput
          style={[styles.inputDescription, styles.shadow]}
          multiline
          placeholder="Please, give some description about your add..."></TextInput>
        {errors.capacity && (
          <Text style={styles.errors}>{errors.description}</Text>
        )}
        <CustomButton title="Create Add" onPress={onSubmit} />
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
    width: '90%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.secondary,
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  photoDataCircle: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.secondary,
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
    marginBottom: 10,
    color: colors.black,
    fontSize: fontSizes.large,
    fontWeight: '700',
  },
  inputData: {
    padding: 10,
    margin: 10,
    width: '90%',
    height: 40,
    backgroundColor: colors.primaryLight,
    borderRadius: 5,
  },
  inputDescription: {
    height: 200,
    padding: 20,
    width: '90%',
    textAlignVertical: 'top',
    backgroundColor: colors.white,
    borderRadius: 5,
  },
  colorGray: {
    color: colors.gray,
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
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  inputAndroid: {
    color: 'black',
  },
};

export default CreateAd;
