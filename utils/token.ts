import AsyncStorage from '@react-native-async-storage/async-storage';

export const setToken = async token => {
  try {
    await AsyncStorage.setItem('@token', token);
  } catch (error) {
    console.log(error)
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('@token');
  } catch (error) {
    console.log(error)
  }
};

export const removeToken = async () => {
  try {
    return await AsyncStorage.removeItem('@token');
  } catch (error) {
      console.log(error)
  }
};