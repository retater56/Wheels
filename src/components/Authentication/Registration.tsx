import React, {useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {RegistrationSchema} from './validation';
import {registerUser} from '../../redux/reducers/userReducer';
import CustomTextInput from '../common/CustomTextInput';
import CustomButton from '../common/CustomButton';
import commonStyles from '../common/styles';
import {useTheme} from '../../ThemeProvider';
import {getUserIsFetching} from '../../constants';
import LoadingScreen from '../common/LoadingScreen';

const Registration = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const isFetching = useSelector(getUserIsFetching);

  const {handleChange, handleSubmit, errors} = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      booked: {},
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

  if (isFetching) {
    return <LoadingScreen />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={[styles.textTitle, {color: colors.text}]}>
          Create An Account!
        </Text>
        {errors.userName && (
          <Text style={styles.errors}>{errors.userName}</Text>
        )}
        <CustomTextInput
          placeholder="Full Name"
          onChangeText={handleChange('userName')}
        />
        {errors.email && <Text style={styles.errors}>{errors.email}</Text>}
        <CustomTextInput
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={handleChange('email')}
        />
        {errors.password && (
          <Text style={styles.errors}>{errors.password}</Text>
        )}
        <CustomTextInput
          placeholder="Password"
          secureTextEntry
          onChangeText={handleChange('password')}
        />
        <CustomButton title="Sign Up" onPress={onSubmit} />
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

export default Registration;
