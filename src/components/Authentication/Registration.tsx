import React, {useCallback} from 'react';
import {StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import colors from '../../styles/colors';
import {useFormik} from 'formik';
import {RegistrationSchema} from './validation';
import fontSizes from '../../styles/fontSizes';
import {registerUser} from '../../redux/reducers/userReducer';
import CustomTextInput from '../common/CustomTextInput';
import CustomButton from '../common/CustomButton';

const Registration = () => {
  const dispatch = useDispatch();

  const {handleChange, handleSubmit, errors} = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      booked: {}
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: RegistrationSchema,
    onSubmit: (values, {resetForm}) => {
      console.log(values);
      dispatch(registerUser(values));
      resetForm();
    },
  });

  const onSubmit = useCallback(() => {
    handleSubmit();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Text style={styles.textTitle}>Create An Account!</Text>
      <CustomTextInput placeholder='Full Name' onChangeText={handleChange('userName')}/>
      {errors.userName && <Text style={styles.errors}>{errors.userName}</Text>}
      <CustomTextInput placeholder='Email' autoCapitalize='none' onChangeText={handleChange('email')}/>
      {errors.email && <Text style={styles.errors}>{errors.email}</Text>}
      <CustomTextInput placeholder='Password' secureTextEntry onChangeText={handleChange('password')}/>
      {errors.password && <Text style={styles.errors}>{errors.password}</Text>}
      <CustomButton title='Sign Up' onPress={onSubmit} />
    </View>
  </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  input: {
    width: '80%',
    margin: 20,
    padding: 10,
    backgroundColor: colors.primaryLight,
    color: colors.white,
  },
  textTitle: {
    color: colors.black,
    fontSize: fontSizes.big,
    fontWeight: '700',
    margin: 20,
  },
  errors: {
    fontSize: fontSizes.small,
    color: 'red',
  },
});

export default Registration;
