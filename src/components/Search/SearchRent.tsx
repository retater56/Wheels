import {useFormik} from 'formik';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import {endOfYear, formatDate, formatDateApi, today} from './constants';
import PickerSelect from 'react-native-picker-select';
import {SearchSchema} from './validation';
import {useDispatch, useSelector} from 'react-redux';
import {
  bookingCar,
  bookingDateData,
} from '../../redux/reducers/bookingCarReducer';
import {
  getBookedTime,
  getCustomerCarsError,
  getUserName,
} from '../../constants';
import CustomTextInput from '../common/CustomTextInput';
import CustomButton from '../common/CustomButton';
import CustomTouchableOpacity from '../common/CustomTouchableOpacity';

const SearchRent = ({carId}: any) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const bookedTime = useSelector(getBookedTime);
  const customerName = useSelector(getUserName);
  const bookError = useSelector(getCustomerCarsError);

  const {handleChange, handleSubmit, setFieldValue, values, errors} = useFormik(
    {
      initialValues: {
        rentDate: today,
        rentTime: '',
        customerPhone: '',
      },
      validateOnChange: false,
      validateOnBlur: false,
      validationSchema: SearchSchema,
      onSubmit: (values, {resetForm}) => {
        dispatch(
          bookingCar({
            ...values,
            rentDate: formatDateApi(values.rentDate),
            carId: carId,
            customerName: customerName,
          }),
        );
        resetForm();
      },
    },
  );

  useEffect(() => {
    const rentDateFormat = formatDateApi(values.rentDate);
    dispatch(bookingDateData({carId, rentDateFormat}));
  }, []);

  useEffect(() => {
    const rentDateFormat = formatDateApi(values.rentDate);
    dispatch(bookingDateData({carId, rentDateFormat}));
  }, [values.rentDate]);

  const memoDate = useMemo(() => {
    return formatDate(values.rentDate);
  }, [values.rentDate]);

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  const onConfirmModal = useCallback(date => {
    setOpen(false);
    setFieldValue('rentDate', date);
  }, []);

  const onSubmit = useCallback(() => {
    handleSubmit();
  }, []);

  return (
    <>
      <Text style={styles.textTitle}>Take a car</Text>
      <View style={styles.container}>
        <CustomTouchableOpacity onPress={onOpenModal}>
          <Text>{memoDate}</Text>
        </CustomTouchableOpacity>
        <DatePicker
          modal
          open={open}
          maximumDate={endOfYear}
          minimumDate={today}
          mode={'date'}
          date={today}
          onConfirm={onConfirmModal}
          onCancel={onCloseModal}
        />
        {errors.rentDate && (
          <Text style={styles.errors}>{errors.rentDate}</Text>
        )}
        <PickerSelect
          value={values.rentTime}
          style={pickerStyle}
          onValueChange={handleChange('rentTime')}
          placeholder={{label: 'Select a time...', value: ''}}
          items={bookedTime}
        />
        {errors.rentTime && (
          <Text style={styles.errors}>{errors.rentTime}</Text>
        )}
        <CustomTextInput
          value={values.customerPhone}
          placeholder="Your Phone"
          keyboardType="numeric"
          onChangeText={handleChange('customerPhone')}
        />
        {errors.customerPhone && (
          <Text style={styles.errors}>{errors.customerPhone}</Text>
        )}
        <CustomButton title="Rent" onPress={onSubmit} />
      </View>
    </>
    // <>
    //   <Text style={styles.textInfo}>Pickup Date</Text>
    //   <TouchableOpacity onPress={onOpenModal} style={styles.inputData}>
    //     <Text>{memoDate}</Text>
    //   </TouchableOpacity>
    //   <DatePicker
    //     modal
    //     open={open}
    //     maximumDate={endOfYear}
    //     minimumDate={today}
    //     mode={'date'}
    //     date={today}
    //     onConfirm={onConfirmModal}
    //     onCancel={onCloseModal}
    //   />
    //   <Text style={styles.textInfo}>Pickup Time</Text>
    //   <PickerSelect
    //     value={values.rentTime}
    //     style={pickerStyle}
    //     onValueChange={handleChange('rentTime')}
    //     placeholder={{label: 'Select a time...', value: ''}}
    //     items={bookedTime}
    //   />
    //   {errors.rentTime && <Text style={styles.errors}>{errors.rentTime}</Text>}
    //   <Text style={styles.textInfo}>Your Phone</Text>
    //   <TextInput
    //     value={values.customerPhone}
    //     placeholderTextColor={colors.white}
    //     placeholder="Phone"
    //     keyboardType="numeric"
    //     style={styles.inputData}
    //     onChangeText={handleChange('customerPhone')}
    //   />
    //   {errors.customerPhone && (
    //     <Text style={styles.errors}>{errors.customerPhone}</Text>
    //   )}
    //   <Button title="Rent a car" onPress={onSubmit}></Button>
    // </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textTitle: {
    padding: 10,
    color: colors.black,
    fontSize: fontSizes.large,
    fontWeight: '700',
    textAlign: 'center',
  },
  selectedDateContainerStyle: {
    height: 35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  selectedDateStyle: {
    fontWeight: 'bold',
    color: 'white',
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

export default SearchRent;
