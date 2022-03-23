import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getLoggedIn, getUserName} from '../../constants';
import {logOutUser} from '../../redux/actions/users';

const LogOut = () => {
  const isLoggedIn = useSelector(getLoggedIn);
  const userName = useSelector(getUserName);
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logOutUser());
  }, []);

  return (
    <View>
      <Text>{JSON.stringify(isLoggedIn)}</Text>
      <Text>{userName}</Text>
      <Text>LogOut</Text>
      <Button title="Log Out" onPress={onLogOut}></Button>
    </View>
  );
};

const styles = StyleSheet.create({});

export default LogOut;
