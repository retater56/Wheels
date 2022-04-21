import AsyncStorage from '@react-native-async-storage/async-storage';

export const setUserTheme = async (value: string) => {
  try {
    await AsyncStorage.setItem('theme', value);
  } catch (e) {
    console.log(e);
  }
};

export const getUserTheme = async () => {
  try {
    const userTheme = await AsyncStorage.getItem('theme');
    const userThemeValue = String(userTheme);
    return userThemeValue;
  } catch (e) {
    console.log(e);
  }
};
