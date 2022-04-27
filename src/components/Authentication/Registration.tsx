import React, {useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {RegistrationSchema} from './validation';
import {clearError, registerUser} from '../../redux/reducers/userReducer';
import CustomTextInput from '../common/CustomTextInput';
import CustomButton from '../common/CustomButton';
import commonStyles from '../common/styles';
import {useTheme} from '../../ThemeProvider';
import OrientationContainer from '../common/OrientationContainer';
import {getUserError, getUserErrorMessage} from '../../constants';

const Registration = () => {
  const {colors} = useTheme();
  const error = useSelector(getUserError);
  const errorMessage = useSelector(getUserErrorMessage);
  const dispatch = useDispatch();

  const {handleChange, handleSubmit, values, errors} = useFormik({
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

  if (error) {
    Alert.alert('Error', errorMessage, [
      {text: 'OK', onPress: () => dispatch(clearError())},
    ]);
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <OrientationContainer style={styles.container} scroll={true}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <Text style={[styles.textTitle, {color: colors.text}]}>
                Create An Account!
              </Text>
              {errors.userName && (
                <Text style={styles.errors}>{errors.userName}</Text>
              )}
              <CustomTextInput
                placeholder="Full Name"
                onChangeText={handleChange('userName')}
                value={values.userName}
              />
              {errors.email && (
                <Text style={styles.errors}>{errors.email}</Text>
              )}
              <CustomTextInput
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={handleChange('email')}
                value={values.email}
              />
              {errors.password && (
                <Text style={styles.errors}>{errors.password}</Text>
              )}
              <CustomTextInput
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange('password')}
                value={values.password}
              />
              <CustomButton title="Sign Up" onPress={onSubmit} />
            </>
          </TouchableWithoutFeedback>
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
    margin: 20,
    ...commonStyles.bigText,
  },
  errors: {
    ...commonStyles.errorText,
  },
});

export default Registration;
