import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getLoggedIn, getUserName} from '../../constants';
import {logOutUser} from '../../redux/actions/users';

const LogOut = () => {
  const isLoggedIn = useSelector(getLoggedIn);
  const userName = useSelector(getUserName);
  const dispatch = useDispatch();

  return (
    <View>
      <Text>{JSON.stringify(isLoggedIn)}</Text>
      <Text>{userName}</Text>
      <Text>LogOut</Text>
      <Button title="Log Out" onPress={() => dispatch(logOutUser())}></Button>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LogOut;
