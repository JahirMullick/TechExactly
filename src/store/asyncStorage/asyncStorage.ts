import AsyncStorage from '@react-native-async-storage/async-storage';

// Set data
export const setData = async (key: string, value: any): Promise<boolean> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (e) {
    console.error('AsyncStorage set error:', e);
    return false;
  }
};

// Get data
export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('AsyncStorage get error:', e);
    return null;
  }
};

// Remove single item
export const removeData = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    console.error('AsyncStorage remove error:', e);
    return false;
  }
};

// Remove multiple items
export const removeMultiple = async (keys: string[]): Promise<boolean> => {
  try {
    await AsyncStorage.multiRemove(keys);
    return true;
  } catch (e) {
    console.error('AsyncStorage remove multiple error:', e);
    return false;
  }
};

// Clear all storage
export const clearStorage = async (): Promise<boolean> => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (e) {
    console.error('AsyncStorage clear error:', e);
    return false;
  }
};
