import AsyncStorage from '@react-native-async-storage/async-storage';

export const setFirstOpen = async (value: string) => {
  try {
    await AsyncStorage.setItem('firstOpen', value);
  } catch (e) {
    console.log(e);
  }
};

export const getFirstOpen = async () => {
  try {
    const opened = await AsyncStorage.getItem('firstOpen');
    const openedValue = String(opened);
    console.log(openedValue);
    if (openedValue !== null) {
      return openedValue;
    }
  } catch (e) {
    console.log(e);
  }
};

export const setUserData = async (value: string) => {
  try {
    await AsyncStorage.setItem('userData', value);
  } catch (e) {
    console.log(e);
  }
};

export const getUserData = async () => {
  try {
    const user = await AsyncStorage.getItem('userData');
    if (user) {
      return user;
    }
  } catch (e) {
    console.log(e);
  }
};

export const clearUserData = async () => {
  try {
    await AsyncStorage.setItem('userData', '');
  } catch (e) {
    console.log(e);
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
    alert('Storage successfully cleared!');
  } catch (e) {
    alert('Failed to clear the async storage.');
  }
};
