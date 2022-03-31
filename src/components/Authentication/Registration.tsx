import React, {useCallback} from 'react';
import {Button, StyleSheet, TextInput, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import colors from '../../styles/colors';
import {useFormik} from 'formik';
import {RegistrationSchema} from './validation';
import fontSizes from '../../styles/fontSizes';
import {registerUser} from '../../redux/reducers/userReducer';

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
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={colors.white}
        placeholder="Name"
        style={styles.input}
        onChangeText={handleChange('userName')}
      />
      {errors.userName && <Text style={styles.errors}>{errors.userName}</Text>}
      <TextInput
        placeholderTextColor={colors.white}
        placeholder="Email"
        autoCapitalize="none"
        style={styles.input}
        onChangeText={handleChange('email')}
      />
      {errors.email && <Text style={styles.errors}>{errors.email}</Text>}
      <TextInput
        placeholderTextColor={colors.white}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={handleChange('password')}
      />
      {errors.password && <Text style={styles.errors}>{errors.password}</Text>}
      <Button title="Register" onPress={onSubmit}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  input: {
    width: '80%',
    margin: 20,
    padding: 10,
    backgroundColor: colors.primaryLight,
    color: colors.white,
  },
  errors: {
    fontSize: fontSizes.small,
    color: 'red',
  },
});

export default Registration;
