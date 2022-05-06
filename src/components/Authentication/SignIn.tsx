import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootTabParamList} from '../../types';
import {useFormik} from 'formik';
import {SignInSchema} from './validation';
import {clearError, logInUser} from '../../redux/reducers/userReducer';
import CustomTextInput from '../common/CustomTextInput';
import CustomButton from '../common/CustomButton';
import {useTheme} from '../../ThemeProvider';
import commonStyles from '../common/styles';
import LoadingScreen from '../common/LoadingScreen';
import {
  getUserError,
  getUserErrorMessage,
  getUserIsFetching,
} from '../../constants';
import OrientationContainer from '../common/OrientationContainer';
import useKeyboard from '../common/useKeyboard';

type Props = NativeStackScreenProps<RootTabParamList, 'Registration'>;

const SignIn = ({navigation}: Props) => {
  const dispatch = useDispatch();
  const isKeyBoardOpen = useKeyboard();
  const isFetching = useSelector(getUserIsFetching);
  const error = useSelector(getUserError);
  const errorMessage = useSelector(getUserErrorMessage);
  const {colors} = useTheme();

  const {handleChange, handleSubmit, values, errors} = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: SignInSchema,
    onSubmit: (userData, {resetForm}) => {
      dispatch(logInUser(userData));
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

  if (error) {
    Alert.alert('Error', errorMessage, [
      {text: 'OK', onPress: () => dispatch(clearError())},
    ]);
  }

  return (
    <SafeAreaView>
      <View
        style={[
          styles.container,
          isKeyBoardOpen ? styles.keyBoardOpen : styles.keyBoardNotOpen,
        ]}>
        <OrientationContainer style={styles.container} scroll={true}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <Text style={[styles.textTitle, {color: colors.text}]}>
                Welcome Back!
              </Text>
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
                autoCapitalize="none"
                secureTextEntry
                onChangeText={handleChange('password')}
                value={values.password}
              />
              <CustomButton title="Log In" onPress={onSubmit} />
              <CustomButton
                title="Don't Have Account?"
                onPress={toRegistration}
              />
            </>
          </TouchableWithoutFeedback>
        </OrientationContainer>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  textTitle: {
    margin: 20,
    ...commonStyles.bigText,
  },
  errors: {
    ...commonStyles.errorText,
  },
  keyBoardOpen: {
    paddingBottom: 120,
  },
  keyBoardNotOpen: {
    paddingBottom: 0,
  },
});

export default SignIn;
