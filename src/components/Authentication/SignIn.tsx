import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {logInUser} from '../../redux/actions/users';
import colors from '../../styles/colors';
import {RootTabParamList} from '../../types';

type Props = NativeStackScreenProps<RootTabParamList, 'Registration'>;

const SignIn = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const onSignIn = () => {
    if (email === '') {
      Alert.alert('Incorrect email');
    } else if (password === '') {
      Alert.alert('Incorrect password');
    } else {
      dispatch(logInUser({email, password}));
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholderTextColor={colors.white}
        placeholder="Email"
        autoCapitalize="none"
        style={styles.input}
        onChangeText={setEmail}></TextInput>
      <TextInput
        placeholderTextColor={colors.white}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}></TextInput>
      <Button title="Sign In" onPress={onSignIn}></Button>
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
});

export default SignIn;
