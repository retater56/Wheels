import React, {useCallback} from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCars,
  getCustomerCars,
  getOwnerCars,
  getUserName,
} from '../../constants';
import {logOutUser} from '../../redux/reducers/userReducer';
import {useTheme} from '../../ThemeProvider';
import CustomButton from '../common/CustomButton';
import OrientationContainer from '../common/OrientationContainer';
import commonStyles from '../common/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {clearUserData} from '../Intro/checkFirstInstall';

const LogOut = () => {
  const userName = useSelector(getUserName);
  const ownerCars = useSelector(getOwnerCars);
  const customerCars = useSelector(getCustomerCars);
  const cars = useSelector(getCars);
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const onLogOut = useCallback(() => {
    clearUserData();
    dispatch(logOutUser());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <OrientationContainer style={styles.center} scroll={true}>
        <View style={[styles.container, {backgroundColor: colors.background}]}>
          <Icon
            name={'user-circle'}
            color={colors.secondary}
            size={150}
            style={styles.avatar}
          />
          <Text style={[styles.textTitle, {color: colors.text}]}>
            Hello,
            <Text style={[styles.textTitle, {color: colors.secondary}]}>
              {` ${userName}`}
            </Text>
            !
          </Text>
          <Text style={[styles.textTitle, {color: colors.text}]}>
            Nice to meet you!
          </Text>
        </View>
        <View
          style={[
            styles.infoContainer,
            {backgroundColor: colors.backgroundLight},
          ]}>
          <View style={styles.infoImage}>
            <Icon name={'check'} color={colors.secondary} size={50} />
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={[styles.textTitle, {color: colors.secondary}]}>
              {ownerCars.length}
            </Text>
            <Text style={[styles.textInfo, {color: colors.text}]}>
              Your cars for rent
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.infoContainer,
            {backgroundColor: colors.backgroundLight},
          ]}>
          <View style={styles.infoImage}>
            <Icon name={'check'} color={colors.secondary} size={50} />
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={[styles.textTitle, {color: colors.secondary}]}>
              {customerCars.length}
            </Text>
            <Text style={[styles.textInfo, {color: colors.text}]}>
              Your booked cars
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.infoContainer,
            {backgroundColor: colors.backgroundLight},
          ]}>
          <View style={styles.infoImage}>
            <Icon name={'info'} color={colors.secondary} size={50} />
          </View>
          <View style={{flexDirection: 'column'}}>
            <Text style={[styles.textTitle, {color: colors.secondary}]}>
              {cars.length}
            </Text>
            <Text style={[styles.textInfo, {color: colors.text}]}>
              Cars in app right now
            </Text>
          </View>
        </View>
        <CustomButton title="Log Out" onPress={onLogOut} />
      </OrientationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    ...commonStyles.shadow,
  },
  infoContainer: {
    padding: 10,
    margin: 10,
    borderRadius: 10,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    ...commonStyles.shadow,
  },
  infoImage: {
    width: '25%',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
  },
  avatar: {
    paddingVertical: 10,
    ...commonStyles.shadow,
  },
  textTitle: {
    ...commonStyles.bigText,
  },
  textInfo: {
    textAlign: 'center',
    ...commonStyles.mediumText,
  },
});

export default LogOut;
