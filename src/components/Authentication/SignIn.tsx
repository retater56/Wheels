import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Alert, Button, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import { useDispatch } from 'react-redux';
import { logInUser } from '../../redux/actions/users';
import colors from '../../styles/colors';
import {RootTabParamList} from '../../types';

type Props = NativeStackScreenProps<RootTabParamList, 'Registration'>;

const SignIn = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const createUser = async (userEmail: string, userPassword: string) => {
    const object = {email: userEmail, password: userPassword};
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 400) {
      const responseText = await response.text();
      Alert.alert(responseText);
    } else if (response.status === 200) {
      const responseText = await response.text();
      Alert.alert(responseText);
      dispatch(logInUser())
    }
  };

  const onSignIn = () => {
    if (email === '') {
      Alert.alert('Incorrect email');
    } else if (password === '') {
      Alert.alert('Incorrect password');
    } else {
      createUser(email, password);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
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
