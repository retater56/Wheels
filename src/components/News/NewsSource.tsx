import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import {fetchNews} from '../../redux/reducers/newsReducer';
import {useTheme} from '../../ThemeProvider';
import CustomTouchableOpacity from '../common/CustomTouchableOpacity';
import OrientationContainer from '../common/OrientationContainer';
import commonStyles from '../common/styles';
import {Navigation} from '../Search/types';
import newsSourceArray from './constants';

const NewsSource = () => {
  const navigation = useNavigation<Navigation>();
  const {colors} = useTheme();
  const dispatch = useDispatch();

  const onChoose = useCallback((item) => {
    navigation.goBack();
    dispatch(fetchNews(item.keyword));
  }, []);

  const renderLinks = useCallback(({item}) => {
    return (
      <View style={styles.container}>
        <OrientationContainer style={styles.container}>
          <CustomTouchableOpacity onPress={() => onChoose(item)}>
            {item.name}
          </CustomTouchableOpacity>
        </OrientationContainer>
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.text, {color: colors.text}]}>
        You can choose another news topic
      </Text>
      <FlatList
        style={styles.list}
        data={newsSourceArray}
        renderItem={renderLinks}
        keyExtractor={(item) => item.keyword}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  list: {
    width: '100%',
  },
  text: {
    textAlign: 'center',
    margin: 10,
    ...commonStyles.largeText,
  },
});

export default NewsSource;
