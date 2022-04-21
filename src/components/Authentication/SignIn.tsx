import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootTabParamList} from '../../types';
import {useFormik} from 'formik';
import {SignInSchema} from './validation';
import {logInUser} from '../../redux/reducers/userReducer';
import CustomTextInput from '../common/CustomTextInput';
import CustomButton from '../common/CustomButton';
import {useTheme} from '../../ThemeProvider';
import commonStyles from '../common/styles';
import LoadingScreen from '../common/LoadingScreen';
import { getUserIsFetching } from '../../constants';

type Props = NativeStackScreenProps<RootTabParamList, 'Registration'>;

const SignIn = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const isFetching = useSelector(getUserIsFetching);
  const {colors} = useTheme();

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

  const toRegistration = useCallback(
    () => navigation.navigate('Registration'),
    [],
  );

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={[styles.textTitle, {color: colors.text}]}>
          Welcome Back!
        </Text>
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
        <CustomButton title="Don't Have Account?" onPress={toRegistration} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textTitle: {
    margin: 20,
    ...commonStyles.bigText,
  },
  errors: {
    ...commonStyles.errorText,
  },
});

export default SignIn;


