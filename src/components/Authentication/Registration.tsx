import React, {useState} from 'react';
import {Alert, Button, StyleSheet, TextInput, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../redux/actions/users';
import colors from '../../styles/colors';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onRegistration = () => {
    if (name === '') {
      Alert.alert('Incorrect name');
    } else if (email === '') {
      Alert.alert('Incorrect email');
    } else if (password === '') {
      Alert.alert('Incorrect password');
    } else {
      const data = {
        userName: name,
        email: email,
        password: password,
      };
      dispatch(registerUser(data));
    }
  };

  return (
    <View style={styles.container}>
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

export default Registration;
