import {useFormik} from 'formik';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
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
import {useTheme} from '../../ThemeProvider';
import commonStyles, {
  pickerStyleDark,
  pickerStyleLight,
} from '../common/styles';

const SearchRent = ({carId}: any) => {
  const bookedTime = useSelector(getBookedTime);
  const customerName = useSelector(getUserName);
  const bookError = useSelector(getCustomerCarsError);
  const {colors, isDark} = useTheme();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

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

  const memoStyle = useMemo(() => {
    return isDark ? pickerStyleDark : pickerStyleLight;
  }, [isDark]);

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
      <Text style={[styles.textTitle, {color: colors.text}]}>Take a car</Text>
      <View style={styles.container}>
        <CustomTouchableOpacity onPress={onOpenModal}>
          {memoDate}
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
          style={memoStyle}
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
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  textTitle: {
    padding: 10,
    textAlign: 'center',
    ...commonStyles.largeText,
  },
  selectedDateContainerStyle: {
    height: 35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errors: {
    ...commonStyles.errorText,
  },
});

export default SearchRent;
