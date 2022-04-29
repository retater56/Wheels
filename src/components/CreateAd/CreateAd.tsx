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
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PickerSelect from 'react-native-picker-select';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootTabParamList} from '../../types';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {CreateAdSchema} from './validation';
import {fuelData, transmissionData, vehicleTypes} from './constants';
import {getUserName, uriImgBase64} from '../../constants';
import {addCar} from '../../redux/reducers/createAdReducer';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';
import CustomTouchableOpacity from '../common/CustomTouchableOpacity';
import {useTheme} from '../../ThemeProvider';
import commonStyles, {checkUserPref} from '../common/styles';
import {fetchOwnerCars} from '../../redux/reducers/ownerCarsReducer';
import OrientationContainer from '../common/OrientationContainer';
import useKeyboard from '../common/useKeyboard';

type Props = NativeStackScreenProps<RootTabParamList, 'Create'>;

const CreateAd = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const isKeyBoardOpen = useKeyboard();
  const owner = useSelector(getUserName);
  const {colors, isDark} = useTheme();

  const {handleChange, handleSubmit, setFieldValue, values, errors} = useFormik(
    {
      initialValues: {
        imgSourceBase64: '',
        mark: '',
        model: '',
        fuel: '',
        vehicleType: '',
        transmission: '',
        seats: '',
        maxSpeed: '',
        capacity: '',
        cost: '',
        position: '',
        description: '',
        booking: {},
      },
      validateOnChange: false,
      validateOnBlur: false,
      validationSchema: CreateAdSchema,
      onSubmit: (carData, {resetForm}) => {
        Alert.alert('Add was created', '', [{text: 'OK'}]);
        dispatch(addCar({...carData, owner}));
        dispatch(fetchOwnerCars(owner));
        resetForm();
      },
    },
  );

  const memoImageSource = useMemo(() => uriImgBase64(values.imgSourceBase64), [
    values.imgSourceBase64,
  ]);

  const memoStyle = useMemo(() => {
    return checkUserPref(isDark);
  }, [isDark]);

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

  const onPressMap = useCallback(() => {
    navigation.navigate('CreateAdMap', {
      paramLocation: 'position',
      onSelect: onSelect,
    });
  }, []);

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

    launchImageLibrary(options, (response) => {
      if (response.assets) {
        setFieldValue('imgSourceBase64', response.assets[0].base64);
      }
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={[
            styles.container,
            isKeyBoardOpen ? styles.keyBoardOpen : styles.keyBoardNotOpen,
          ]}>
          <OrientationContainer>
            <Text style={[styles.title, {color: colors.text}]}>
              Add a photo
            </Text>
            <View style={styles.centerContainer}>
              {values.imgSourceBase64 ? (
                <TouchableOpacity onPress={onChoosePhoto}>
                  <Image
                    source={memoImageSource}
                    style={[
                      styles.photoData,
                      styles.imgWidth,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.secondary,
                      },
                    ]}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.photoData,
                    {
                      backgroundColor: colors.background,
                      borderColor: colors.secondary,
                    },
                  ]}
                  onPress={onChoosePhoto}>
                  <View
                    style={[
                      styles.photoDataCircle,
                      {borderColor: colors.secondary},
                    ]}>
                    <Icon name="plus" size={70} color={colors.secondary} />
                  </View>
                </TouchableOpacity>
              )}
              {errors.imgSourceBase64 && (
                <Text style={styles.errors}>{errors.imgSourceBase64}</Text>
              )}
            </View>
            <Text style={[styles.title, {color: colors.text}]}>
              Set Mark and Model
            </Text>
            <View style={styles.centerContainer}>
              {errors.mark && <Text style={styles.errors}>{errors.mark}</Text>}
              <CustomTouchableOpacity onPress={onPressMark}>
                {values.mark ? (
                  <Text>{values.mark}</Text>
                ) : (
                  <Text style={{color: colors.gray}}>Mark</Text>
                )}
              </CustomTouchableOpacity>
              {errors.model && (
                <Text style={styles.errors}>{errors.model}</Text>
              )}
              <CustomTouchableOpacity onPress={onPressModel}>
                {values.model ? (
                  <Text>{values.model}</Text>
                ) : (
                  <Text style={{color: colors.gray}}>Model</Text>
                )}
              </CustomTouchableOpacity>
            </View>
            <Text style={[styles.title, {color: colors.text}]}>
              Specifications
            </Text>
            <View style={styles.centerContainer}>
              <View style={styles.pickerView}>
                {errors.fuel && (
                  <Text style={styles.errors}>{errors.fuel}</Text>
                )}
                <PickerSelect
                  value={values.fuel}
                  style={memoStyle}
                  onValueChange={handleChange('fuel')}
                  placeholder={{label: 'Choose fuel type...', value: ''}}
                  items={fuelData}
                />
              </View>
              <View style={styles.pickerView}>
                {errors.fuel && (
                  <Text style={styles.errors}>{errors.fuel}</Text>
                )}
                <PickerSelect
                  value={values.vehicleType}
                  style={memoStyle}
                  onValueChange={handleChange('vehicleType')}
                  placeholder={{label: 'Choose vehicle type...', value: ''}}
                  items={vehicleTypes}
                />
              </View>
              <View style={styles.pickerView}>
                {errors.transmission && (
                  <Text style={styles.errors}>{errors.transmission}</Text>
                )}
                <PickerSelect
                  value={values.transmission}
                  style={memoStyle}
                  onValueChange={handleChange('transmission')}
                  placeholder={{
                    label: 'Choose transmission type...',
                    value: '',
                  }}
                  items={transmissionData}
                />
              </View>
              {errors.seats && (
                <Text style={styles.errors}>{errors.seats}</Text>
              )}
              <CustomTextInput
                keyboardType={'numeric'}
                placeholder="Seats"
                onChangeText={handleChange('seats')}>
                {values.seats}
              </CustomTextInput>
              {errors.maxSpeed && (
                <Text style={styles.errors}>{errors.maxSpeed}</Text>
              )}
              <CustomTextInput
                keyboardType={'numeric'}
                placeholder="Maximum speed , mph"
                onChangeText={handleChange('maxSpeed')}>
                {values.maxSpeed}
              </CustomTextInput>
              {errors.capacity && (
                <Text style={styles.errors}>{errors.capacity}</Text>
              )}
              <CustomTextInput
                keyboardType={'numeric'}
                placeholder="Capacity , L (kWh)"
                onChangeText={handleChange('capacity')}>
                {values.capacity}
              </CustomTextInput>
            </View>
            <Text style={[styles.title, {color: colors.text}]}>Rent cost</Text>
            <View style={styles.centerContainer}>
              {errors.cost && <Text style={styles.errors}>{errors.cost}</Text>}
              <CustomTextInput
                keyboardType={'numeric'}
                placeholder="Your cost , $"
                onChangeText={handleChange('cost')}>
                {values.cost}
              </CustomTextInput>
            </View>
            <Text style={[styles.title, {color: colors.text}]}>Car place</Text>
            <View style={styles.centerContainer}>
              {errors.position && (
                <Text style={styles.errors}>{errors.position}</Text>
              )}
              <CustomTouchableOpacity onPress={onPressMap}>
                {values.position ? (
                  <Text>Position setted</Text>
                ) : (
                  <Text style={{color: colors.gray}}>Position</Text>
                )}
              </CustomTouchableOpacity>
            </View>
            <Text style={[styles.title, {color: colors.text}]}>
              Your description...
            </Text>
            <View style={styles.centerContainer}>
              <TextInput
                onChangeText={handleChange('description')}
                style={[
                  styles.inputDescription,
                  {backgroundColor: colors.background, color: colors.text},
                ]}
                multiline
                placeholderTextColor={colors.gray}
                placeholder="Please, give some description about your add...">
                {values.description}
              </TextInput>
              {errors.description && (
                <Text style={styles.errors}>{errors.description}</Text>
              )}
              <CustomButton title="Create Add" onPress={onSubmit} />
            </View>
          </OrientationContainer>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  centerContainer: {
    alignItems: 'center',
  },
  photoData: {
    width: '90%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 5,
  },
  photoDataCircle: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 2,
  },
  imgWidth: {
    width: 350,
  },
  title: {
    marginHorizontal: 10,
    marginBottom: 10,
    ...commonStyles.largeText,
  },
  inputDescription: {
    height: 200,
    padding: 20,
    width: '90%',
    textAlignVertical: 'top',
    borderRadius: 5,
    ...commonStyles.shadow,
  },
  pickerView: {
    alignItems: 'center',
    width: '90%',
  },
  errors: {
    ...commonStyles.errorText,
  },
  keyBoardOpen: {
    marginBottom: 250,
  },
  keyBoardNotOpen: {
    marginBottom: 30,
  },
});

export default CreateAd;
