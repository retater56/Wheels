import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getLoggedIn, getUserName} from '../../constants';
import { logOutUser } from '../../redux/reducers/userReducer';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';

const LogOut = () => {
  const isLoggedIn = useSelector(getLoggedIn);
  const userName = useSelector(getUserName);
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    dispatch(logOutUser());
  }, []);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.textTitle}>{JSON.stringify(isLoggedIn)}</Text> */}
      <Text style={styles.textTitle}>Hello, {userName}!</Text>
      <Text style={styles.textTitle}>Nice to meet you)</Text>
      <Button title="Log Out" onPress={onLogOut}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  textTitle: {
    color: colors.white,
    fontSize: fontSizes.big    
  }
});

export default LogOut;
