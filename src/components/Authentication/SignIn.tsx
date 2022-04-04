import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch} from 'react-redux';
import colors from '../../styles/colors';
import {RootTabParamList} from '../../types';
import {useFormik} from 'formik';
import {SignInSchema} from './validation';
import fontSizes from '../../styles/fontSizes';
import {logInUser} from '../../redux/reducers/userReducer';
import CustomTextInput from '../common/CustomTextInput';
import CustomButton from '../common/CustomButton';

type Props = NativeStackScreenProps<RootTabParamList, 'Registration'>;

const SignIn = ({navigation}: Props) => {
  const dispatch = useDispatch();

  const {handleChange, handleSubmit, values, errors} = useFormik({
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.textTitle}>Welcome Back!</Text>
        <CustomTextInput
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={handleChange('email')}
          value={values.email}
        />
        {errors.email && <Text style={styles.errors}>{errors.email}</Text>}
        <CustomTextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={handleChange('password')}
        />
        {errors.password && (
          <Text style={styles.errors}>{errors.password}</Text>
        )}
        <CustomButton title="Log In" onPress={onSubmit} />
        <CustomButton
          title="Don't have account?"
          onPress={() => navigation.navigate('Registration')}
        />
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

export default SignIn;
