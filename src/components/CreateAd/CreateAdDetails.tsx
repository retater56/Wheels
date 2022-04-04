import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {API_MARKS, API_MODELS} from '../../constants';
import colors from '../../styles/colors';
import fontSizes from '../../styles/fontSizes';
import {RootTabParamList} from '../../types';
import CustomTouchableOpacity from '../common/CustomTouchableOpacity';
import {IModel} from './types';

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
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={[styles.item, styles.shadow]}
        key={item}
        onPress={() => {
          navigation.goBack();
          onSelect(paramType, item);
        }}>
        <Text style={styles.text}>{item}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderModels = ({item}: any) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={[styles.item, styles.shadow]}
          key={item.Model_Name}
          onPress={() => {
            navigation.goBack(), onSelect(paramType, item.Model_Name);
          }}>
          <Text style={styles.text}>{item.Model_Name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    setIsFetching(true);
    fetchParams();
  }, []);

  return (
    <View style={styles.container}>
      {isFetching ? <ActivityIndicator style={styles.loading} /> : <></>}
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
    backgroundColor: colors.background,
  },
  itemContainer: {
    alignItems: 'center',
  },
  item: {
    padding: 20,
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 5,
    marginVertical: 10,
  },
  text: {
    color: colors.black,
    fontSize: fontSizes.medium,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

export default CreateAdDetails;
