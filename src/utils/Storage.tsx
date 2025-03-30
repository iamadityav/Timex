import AsyncStorage from '@react-native-async-storage/async-storage';


const TIMERS_STORAGE_KEY = '@MyTimers:timers';
const HISTORY_STORAGE_KEY = '@MyTimers:history';

export const storage = {
  // Save timers to AsyncStorage
  saveTimers: async (timers) => {
    try {
      const jsonValue = JSON.stringify(timers);
      await AsyncStorage.setItem(TIMERS_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving timers:', error);
    }
  },

  // Load timers from AsyncStorage
  loadTimers: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(TIMERS_STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error loading timers:', error);
      return [];
    }
  },

  // Save history to AsyncStorage
  saveHistory: async (history) => {
    try {
      const jsonValue = JSON.stringify(history);
      await AsyncStorage.setItem(HISTORY_STORAGE_KEY, jsonValue);
    } catch (error) {
      console.error('Error saving history:', error);
    }
  },

  // Load history from AsyncStorage
  loadHistory: async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (error) {
      console.error('Error loading history:', error);
      return [];
    }
  },

  // Clear all data from AsyncStorage
  clearAllData: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  },

  // Remove a specific item from AsyncStorage
  removeItem: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item with key ${key}:`, error);
    }
  }
};

export default storage;
