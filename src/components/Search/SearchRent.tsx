import {useFormik} from 'formik';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {endOfYear, formatDate, formatDateApi, today} from './constants';
import PickerSelect from 'react-native-picker-select';
import {SearchSchema} from './validation';
import {useDispatch, useSelector} from 'react-redux';
import {
  bookingCar,
  bookingDateData,
  clearBooked,
  clearError,
} from '../../redux/reducers/bookingCarReducer';
import {
  getBookedTime,
  getBookingError,
  getBookingErrorMessage,
  getBookingSuccess,
  getUserName,
} from '../../constants';
import CustomTextInput from '../common/CustomTextInput';
import CustomButton from '../common/CustomButton';
import CustomTouchableOpacity from '../common/CustomTouchableOpacity';
import {useTheme} from '../../ThemeProvider';
import commonStyles, {checkUserPref} from '../common/styles';
import OrientationContainer from '../common/OrientationContainer';
import useOrientation from '../common/useOrientation';
import {SafeAreaView} from 'react-native';

const SearchRent = ({carId}: any) => {
  const bookedTime = useSelector(getBookedTime);
  const customerName = useSelector(getUserName);
  const error = useSelector(getBookingError);
  const errorMessage = useSelector(getBookingErrorMessage);
  const carBooked = useSelector(getBookingSuccess);
  const {colors, isDark} = useTheme();
  const portrait = useOrientation();
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const {handleChange, handleSubmit, setFieldValue, values, errors} = useFormik(
    {
      initialValues: {
        rentDate: '',
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
    return checkUserPref(isDark);
  }, [isDark]);

  const onOpenModal = useCallback(() => {
    setOpen(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  const onConfirmModal = useCallback((date) => {
    setOpen(false);
    setFieldValue('rentDate', date);
  }, []);

  const onSubmit = useCallback(() => {
    handleSubmit();
  }, []);

  if (error) {
    Alert.alert('Error', errorMessage, [
      {text: 'OK', onPress: () => dispatch(clearError())},
    ]);
  }

  if (carBooked) {
    Alert.alert('Car was booked', '', [
      {text: 'OK', onPress: () => dispatch(clearBooked())},
    ]);
  }

  return (
    <SafeAreaView>
      <Text style={[styles.textTitle, {color: colors.text}]}>Take a car</Text>
      <View style={styles.container}>
        <OrientationContainer style={styles.container}>
          {errors.rentDate && (
            <Text style={styles.errors}>{errors.rentDate}</Text>
          )}
          {portrait && (
            <CustomTouchableOpacity onPress={onOpenModal}>
              {values.rentDate ? (
                memoDate
              ) : (
                <Text style={{color: colors.gray}}>Select a date...</Text>
              )}
            </CustomTouchableOpacity>
          )}
          <DatePicker
            modal={portrait ? true : false}
            open={open}
            textColor={
              isDark && !portrait ? colors.white : colors.backgroundDark
            }
            maximumDate={endOfYear}
            minimumDate={today}
            mode={'date'}
            date={today}
            onConfirm={onConfirmModal}
            onCancel={onCloseModal}
          />
          <View style={styles.pickerView}>
            {errors.rentTime && (
              <Text style={styles.errors}>{errors.rentTime}</Text>
            )}
            <PickerSelect
              value={values.rentTime}
              style={memoStyle}
              onValueChange={handleChange('rentTime')}
              placeholder={{label: 'Select a time...', value: ''}}
              items={bookedTime}
            />
          </View>
          {errors.customerPhone && (
            <Text style={styles.errors}>{errors.customerPhone}</Text>
          )}
          <CustomTextInput
            value={values.customerPhone}
            placeholder="Your Phone"
            keyboardType="numeric"
            onChangeText={handleChange('customerPhone')}
          />
          <CustomButton title="Rent" onPress={onSubmit} />
        </OrientationContainer>
      </View>
    </SafeAreaView>
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
  pickerView: {
    alignItems: 'center',
    width: '90%',
  },
  errors: {
    ...commonStyles.errorText,
  },
});

export default SearchRent;
