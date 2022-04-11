import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserName} from '../../constants';
import {logOutUser} from '../../redux/reducers/userReducer';
import {useTheme} from '../../ThemeProvider';
import CustomButton from '../common/CustomButton';
import commonStyles from '../common/styles';
import {Navigation} from '../Search/types';

const LogOut = () => {
  const navigation = useNavigation<Navigation>();
  const userName = useSelector(getUserName);
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const onCheckMap = useCallback(() => {
    navigation.navigate('UserMap');
  }, []);

  const onLogOut = useCallback(() => {
    dispatch(logOutUser());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.textTitle, {color: colors.text}]}>
        Hello, {userName}!
      </Text>
      <Text style={[styles.textTitle, {color: colors.text}]}>
        Nice to meet you)
      </Text>
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
  },
  textTitle: {
    ...commonStyles.bigText,
  },
});

export default LogOut;
