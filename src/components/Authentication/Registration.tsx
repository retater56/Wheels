import React, { useState } from 'react';
import {Button, StyleSheet, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../styles/colors';

const Registration = () => {
  const [name, setName] = useState('');
  const [sername, setSername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = async (userEmail: string, userPassword: string) => {
    const object = {email: userEmail, password: userPassword};
    const response = await fetch('http://localhost:3000/register', {
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

  const onRegistration = () => {
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
        placeholder="Name"
        style={styles.input}
        onChangeText={setName}
        ></TextInput>
      <TextInput
        placeholderTextColor={colors.white}
        placeholder="Sername"
        style={styles.input}
        onChangeText={setSername}
        ></TextInput>
      <TextInput
        placeholderTextColor={colors.white}
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
        ></TextInput>
      <TextInput
        placeholderTextColor={colors.white}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
        ></TextInput>
      <Button title="Register" onPress={onRegistration}></Button>
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

export default Registration;
