import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList, ActivityIndicator} from 'react-native';
import { API_MARKS, API_MODELS } from '../../constants';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import {RootTabParamList} from '../../types';
import {IModel} from './types'

type Props = NativeStackScreenProps<RootTabParamList, 'CreateAdDetails'>;

const CreateAdDetails = ({route, navigation}: Props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [marks, setMarks] = useState([]);
  const [models, setModels] = useState<IModel[]>([]);

  const {mark, paramType, onSelect} = route.params;

  let url = '';
  if (paramType === 'mark') {
    url = API_MARKS;
  } else if (paramType === 'model' && mark) {
    url = API_MODELS(mark);
  }

  const fetchParams = async () => {
    try {
      const response = await fetch(url, {
        method: 'GET',
      });
      const responseData = await response.json();
      if (paramType === 'mark') {
        setMarks(responseData);
      } else if (paramType === 'model') {
        setModels(responseData.Results);
      }
      setIsFetching(false);
    } catch (error) {
      console.log(error);
    }
  };

  const renderMarks = ({item}: any) => (
    <TouchableOpacity
      style={styles.item}
      key={item}
      onPress={() => {
        navigation.goBack();
        onSelect(paramType, item);
      }}>
      <Text style={styles.text}>{item}</Text>
    </TouchableOpacity>
  );

  const renderModels = ({item}: any) => {
    return (
      <TouchableOpacity
        style={styles.item}
        key={item.Model_Name}
        onPress={() => {
          navigation.goBack(), onSelect(paramType, item.Model_Name);
        }}>
        <Text style={styles.text}>{item.Model_Name}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setIsFetching(true);
    fetchParams();
  }, []);

  return (
    <View style={styles.container}>
      {isFetching ? <ActivityIndicator style={styles.loading}/> : <></>}
      {paramType === 'mark' ? (
        <FlatList
          data={marks}
          renderItem={renderMarks}
          keyExtractor={item => item}
          refreshing={isFetching}></FlatList>
      ) : (
        <FlatList
          data={models}
          renderItem={renderModels}
          keyExtractor={item => item.Model_Name}
          refreshing={isFetching}></FlatList>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryLight,
  },
  item: {
    padding: 10,
    margin: 10,
    backgroundColor: colors.primaryDark,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  text: {
    padding: 10,
    color: colors.textPrimary,
    fontSize: fontSizes.medium,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
  }
});

export default CreateAdDetails;
