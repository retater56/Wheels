import React, {useState} from 'react';
import {Button, SafeAreaView, StyleSheet, TextInput} from 'react-native';
import colors from '../../styles/colors';

const createUser = async (userEmail: string, userPassword: string) => {
  const object = {email: userEmail, password: userPassword};
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify(object),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  console.log(JSON.stringify(object));
  const responseText = await response.text();
  console.log(responseText);
};

const SignIn = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = () => {
    if (email === '') {
      return console.log('incorrect email');
    } else if (password === '') {
      return console.log('incorrect password');
    } else {
      console.log(`${email} ${password}`);
      createUser(email, password);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholderTextColor={colors.white}
        placeholder="Email"
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
