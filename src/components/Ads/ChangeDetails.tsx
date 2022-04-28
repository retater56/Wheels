import React, {useCallback, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
} from 'react-native';
import PickerSelect from 'react-native-picker-select';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootTabParamList} from '../../types';
import {useFormik} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {CreateAdSchema} from '../CreateAd/validation';
import {fuelData, transmissionData, vehicleTypes} from '../CreateAd/constants';
import {getLoggedIn, getUserName, uriImgBase64} from '../../constants';
import {updateCar} from '../../redux/reducers/createAdReducer';
import CustomButton from '../common/CustomButton';
import CustomTextInput from '../common/CustomTextInput';
import CustomTouchableOpacity from '../common/CustomTouchableOpacity';
import {useTheme} from '../../ThemeProvider';
import commonStyles, {checkUserPref} from '../common/styles';
import NotLoggedScreen from '../common/NotLoggedScreen';
import {fetchOwnerCars} from '../../redux/reducers/ownerCarsReducer';
import OrientationContainer from '../common/OrientationContainer';
import useOrientation from '../common/useOrientation';

type Props = NativeStackScreenProps<RootTabParamList, 'ChangeDetails'>;

const ChangeDetails = ({navigation, route}: Props) => {
  const dispatch = useDispatch();
  const {item} = route.params;
  const portrait = useOrientation();
  const {
    id,
    imgSourceBase64,
    mark,
    model,
    fuel,
    vehicleType,
    transmission,
    seats,
    maxSpeed,
    capacity,
    cost,
    position,
    description,
  } = item;
  const owner = useSelector(getUserName);
  const isLoggedIn = useSelector(getLoggedIn);
  const {colors, isDark} = useTheme();

  const {handleChange, handleSubmit, setFieldValue, values, errors} = useFormik(
    {
      initialValues: {
        id: id,
        imgSourceBase64: imgSourceBase64,
        mark: mark,
        model: model,
        fuel: fuel,
        vehicleType: vehicleType,
        transmission: transmission,
        seats: seats,
        maxSpeed: maxSpeed,
        capacity: capacity,
        cost: cost,
        position: position,
        description: description,
      },
      validateOnChange: false,
      validateOnBlur: false,
      validationSchema: CreateAdSchema,
      onSubmit: (values, {resetForm}) => {
        dispatch(updateCar({...values, owner}));
        dispatch(fetchOwnerCars(owner));
        navigation.goBack();
        resetForm();
      },
    },
  );

  const memoImageSource = useMemo(() => uriImgBase64(values.imgSourceBase64!), [
    values.imgSourceBase64,
  ]);

  const memoStyle = useMemo(() => {
    return checkUserPref(isDark);
  }, [portrait, isDark]);

  const memoCapacity = useMemo(() => {
    return values.capacity.split(' ')[0];
  }, []);

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

  if (!isLoggedIn) {
    return <NotLoggedScreen />;
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <OrientationContainer>
            <View style={styles.centerContainer}>
              <Image
                source={memoImageSource}
                style={[
                  styles.photoData,
                  {
                    backgroundColor: colors.background,
                    borderColor: colors.secondary,
                    width: 350,
                  },
                ]}
              />
            </View>
            <Text style={[styles.title, {color: colors.text}]}>
              Set Mark and Model
            </Text>
            <View style={styles.centerContainer}>
              <CustomTouchableOpacity onPress={onPressMark}>
                {values.mark ? (
                  <Text>{values.mark}</Text>
                ) : (
                  <Text style={{color: colors.gray}}>Mark</Text>
                )}
              </CustomTouchableOpacity>
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
              {errors.fuel && <Text style={styles.errors}>{errors.fuel}</Text>}
              <View style={styles.pickerView}>
                <PickerSelect
                  value={values.fuel}
                  style={memoStyle}
                  onValueChange={handleChange('fuel')}
                  placeholder={{label: 'Choose fuel type...', value: ''}}
                  items={fuelData}
                />
              </View>
              {errors.vehicleType && (
                <Text style={styles.errors}>{errors.vehicleType}</Text>
              )}
              <View style={styles.pickerView}>
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
                placeholder="Maximum speed"
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
              <CustomTextInput
                keyboardType={'numeric'}
                placeholder="Your cost , $"
                onChangeText={handleChange('cost')}>
                {values.cost}
              </CustomTextInput>
            </View>
            <Text style={[styles.title, {color: colors.text}]}>Car place</Text>
            <View style={styles.centerContainer}>
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
              <CustomButton title="Save changes" onPress={onSubmit} />
            </View>
          </OrientationContainer>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 10,
    alignItems: 'center',
    marginBottom: 50,
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
  title: {
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
});

export default ChangeDetails;
