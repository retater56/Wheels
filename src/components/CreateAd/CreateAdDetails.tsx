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
import {useTheme} from '../../ThemeProvider';
import {RootTabParamList} from '../../types';
import commonStyles from '../common/styles';
import {IModel} from './types';

type Props = NativeStackScreenProps<RootTabParamList, 'CreateAdDetails'>;

const CreateAdDetails = ({route, navigation}: Props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [marks, setMarks] = useState([]);
  const [models, setModels] = useState<IModel[]>([]);
  const {colors} = useTheme();

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
        style={[styles.item, {backgroundColor: colors.background}]}
        key={item}
        onPress={() => {
          navigation.goBack();
          onSelect(paramType, item);
        }}>
        <Text style={[styles.text, {color: colors.text}]}>{item}</Text>
      </TouchableOpacity>
    </View>
  );

  const renderModels = ({item}: any) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={[styles.item, {backgroundColor: colors.background}]}
          key={item.Model_Name}
          onPress={() => {
            navigation.goBack(), onSelect(paramType, item.Model_Name);
          }}>
          <Text style={[styles.text, {color: colors.text}]}>
            {item.Model_Name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    setIsFetching(true);
    fetchParams();
  }, []);

  return (
    <>
      {isFetching ? (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      ) : (
        <></>
      )}
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
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    alignItems: 'center',
  },
  item: {
    padding: 20,
    width: '90%',
    borderRadius: 5,
    marginVertical: 10,
    ...commonStyles.shadow,
  },
  text: {
    ...commonStyles.mediumText,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CreateAdDetails;
