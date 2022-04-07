import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getLoggedIn, getUserName} from '../../constants';
import {logOutUser} from '../../redux/reducers/userReducer';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import CustomButton from '../common/CustomButton';
import {Navigation} from '../Search/types';

const LogOut = () => {
  const navigation = useNavigation<Navigation>();
  const userName = useSelector(getUserName);
  const dispatch = useDispatch();

  const onCheckMap = useCallback(() => {
    navigation.navigate('UserMap');
  }, []);

  const onLogOut = useCallback(() => {
    dispatch(logOutUser());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Hello, {userName}!</Text>
      <Text style={styles.textTitle}>Nice to meet you)</Text>
      <CustomButton title="Check map" onPress={onCheckMap} />
      <CustomButton title="Log Out" onPress={onLogOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  textTitle: {
    color: colors.black,
    fontSize: fontSizes.big,
  },
});

export default LogOut;
