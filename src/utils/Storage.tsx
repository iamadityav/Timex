import AsyncStorage from '@react-native-async-storage/async-storage';


const TIMERS_STORAGE_KEY = '@MyTimers:timers';
const HISTORY_STORAGE_KEY = '@MyTimers:history';

export const storage = {
  saveTimers: async (timers) => {
    try {
      const jsonValue = JSON.stringify(timers);
      await AsyncStorage.setItem(TIMERS_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving timers:', error);
    }
  },

  loadTimers: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(TIMERS_STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error loading timers:', error);
      return [];
    }
  },

  saveHistory: async (history) => {
    try {
      const jsonValue = JSON.stringify(history);
      await AsyncStorage.setItem(HISTORY_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving history:', error);
    }
  },

  loadHistory: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error loading history:', error);
      return [];
    }
  },

  clearAllData: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  },

  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item with key ${key}:`, error);
    }
  }
};

export default storage;
