import React, {useState} from 'react';
import {Alert, Button, StyleSheet, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../styles/colors';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = async (
    userName: string,
    userEmail: string,
    userPassword: string,
  ) => {
    const object = {
      userName: userName,
      email: userEmail,
      password: userPassword,
    };
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(JSON.stringify(object));
    if (response.status === 400) {
      const responseText = await response.text();
      Alert.alert(responseText);
    }
  };

  const onRegistration = () => {
    if (name === '') {
      Alert.alert('Incorrect name');
    } else if (email === '') {
      Alert.alert('Incorrect email');
    } else if (password === '') {
      Alert.alert('Incorrect password');
    } else {
      createUser(name, email, password);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholderTextColor={colors.white}
        placeholder="Name"
        style={styles.input}
        onChangeText={setName}></TextInput>
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
