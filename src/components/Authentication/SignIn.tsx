import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {Button, StyleSheet, TextInput, View, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import colors from '../../styles/colors';
import {RootTabParamList} from '../../types';
import {useFormik} from 'formik';
import {SignInSchema} from './validation';
import fontSizes from '../../styles/fontSizes';
import {logInUser} from '../../redux/reducers/userReducer';

type Props = NativeStackScreenProps<RootTabParamList, 'Registration'>;

const SignIn = ({navigation}: Props) => {
  const dispatch = useDispatch();

  const {handleChange, handleSubmit, errors} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: SignInSchema,
    onSubmit: (values, {resetForm}) => {
      console.log(values);
      dispatch(logInUser(values));
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
      <Button title="Sign In" onPress={onSubmit}></Button>
      <Button
        title="Don't have account?"
        onPress={() => navigation.navigate('Registration')}></Button>
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

export default SignIn;
