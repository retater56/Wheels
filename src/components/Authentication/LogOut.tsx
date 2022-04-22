import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getUserName} from '../../constants';
import {logOutUser} from '../../redux/reducers/userReducer';
import {useTheme} from '../../ThemeProvider';
import CustomButton from '../common/CustomButton';
import OrientationContainer from '../common/OrientationContainer';
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
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <OrientationContainer style={styles.center} scroll={true}>
          <Text style={[styles.textTitle, {color: colors.text}]}>
            Hello, {userName}!
          </Text>
          <Text style={[styles.textTitle, {color: colors.text}]}>
            Nice to meet you)
          </Text>
          <CustomButton title="Check map" onPress={onCheckMap} />
          <CustomButton title="Log Out" onPress={onLogOut} />
        </OrientationContainer>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
  },
  textTitle: {
    ...commonStyles.bigText,
  },
});

export default LogOut;
