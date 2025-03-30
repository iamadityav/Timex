import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TIMERS_STORAGE_KEY = '@timers_data';
const HISTORY_STORAGE_KEY = '@timers_history';

export default function useTimers() {
  const [timers, setTimers] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedTimer, setCompletedTimer] = useState(null);
  const intervals = useRef({});

  // Load timers and history from storage
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedTimers = await AsyncStorage.getItem(TIMERS_STORAGE_KEY);
        const storedHistory = await AsyncStorage.getItem(HISTORY_STORAGE_KEY);
        
        if (storedTimers) {
          setTimers(JSON.parse(storedTimers));
        }
        
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (error) {
        console.error('Failed to load data', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Save timers to storage whenever they change
  useEffect(() => {
    const saveTimers = async () => {
      try {
        await AsyncStorage.setItem(TIMERS_STORAGE_KEY, JSON.stringify(timers));
      } catch (error) {
        console.error('Failed to save timers', error);
      }
    };
    
    if (!loading) {
      saveTimers();
    }
  }, [timers, loading]);

  // Save history to storage whenever it changes
  useEffect(() => {
    const saveHistory = async () => {
      try {
        await AsyncStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
      } catch (error) {
        console.error('Failed to save history', error);
      }
    };
    
    if (!loading) {
      saveHistory();
    }
  }, [history, loading]);

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      Object.values(intervals.current).forEach(interval => clearInterval(interval));
    };
  }, []);

  const addTimer = useCallback((name, duration, category) => {
    const newTimer = {
      id: Date.now().toString(),
      name,
      duration: parseInt(duration, 10),
      remainingTime: parseInt(duration, 10),
      category,
      status: 'paused',
      createdAt: new Date().toISOString(),
    };
    
    setTimers(prev => [...prev, newTimer]);
  }, []);

  const startTimer = useCallback((id) => {
    setTimers(prev => 
      prev.map(timer => {
        if (timer.id === id) {
          // Clear any existing interval for this timer
          if (intervals.current[id]) {
            clearInterval(intervals.current[id]);
          }
          
          // Set up a new interval
          intervals.current[id] = setInterval(() => {
            setTimers(current => 
              current.map(t => {
                if (t.id === id && t.remainingTime > 0 && t.status === 'running') {
                  const newRemainingTime = t.remainingTime - 1;
                  
                  // Check if timer completed
                  if (newRemainingTime === 0) {
                    clearInterval(intervals.current[id]);
                    delete intervals.current[id];
                    
                    // Add to history
                    const completedTimer = {
                      ...t,
                      completedAt: new Date().toISOString(),
                    };
                    
                    setHistory(prev => [completedTimer, ...prev]);
                    setCompletedTimer(completedTimer);
                    
                    return {
                      ...t,
                      remainingTime: newRemainingTime,
                      status: 'completed',
                    };
                  }
                  
                  return {
                    ...t,
                    remainingTime: newRemainingTime,
                  };
                }
                return t;
              })
            );
          }, 1000);
          
          return {
            ...timer,
            status: 'running',
          };
        }
        return timer;
      })
    );
  }, []);

  const pauseTimer = useCallback((id) => {
    if (intervals.current[id]) {
      clearInterval(intervals.current[id]);
      delete intervals.current[id];
    }
    
    setTimers(prev => 
      prev.map(timer => {
        if (timer.id === id && timer.status === 'running') {
          return {
            ...timer,
            status: 'paused',
          };
        }
        return timer;
      })
    );
  }, []);

  const resetTimer = useCallback((id) => {
    if (intervals.current[id]) {
      clearInterval(intervals.current[id]);
      delete intervals.current[id];
    }
    
    setTimers(prev => 
      prev.map(timer => {
        if (timer.id === id) {
          return {
            ...timer,
            remainingTime: timer.duration,
            status: 'paused',
          };
        }
        return timer;
      })
    );
  }, []);

  const deleteTimer = useCallback((id) => {
    if (intervals.current[id]) {
      clearInterval(intervals.current[id]);
      delete intervals.current[id];
    }
    
    setTimers(prev => prev.filter(timer => timer.id !== id));
  }, []);

  const startAllInCategory = useCallback((category) => {
    setTimers(prev => 
      prev.map(timer => {
        if (timer.category === category && timer.status !== 'completed') {
          if (timer.status !== 'running') {
            // Start this timer
            startTimer(timer.id);
          }
          return {
            ...timer,
            status: 'running',
          };
        }
        return timer;
      })
    );
  }, [startTimer]);

  const pauseAllInCategory = useCallback((category) => {
    setTimers(prev => 
      prev.map(timer => {
        if (timer.category === category && timer.status === 'running') {
          pauseTimer(timer.id);
          return {
            ...timer,
            status: 'paused',
          };
        }
        return timer;
      })
    );
  }, [pauseTimer]);

  const resetAllInCategory = useCallback((category) => {
    setTimers(prev => 
      prev.map(timer => {
        if (timer.category === category) {
          if (intervals.current[timer.id]) {
            clearInterval(intervals.current[timer.id]);
            delete intervals.current[timer.id];
          }
          
          return {
            ...timer,
            remainingTime: timer.duration,
            status: 'paused',
          };
        }
        return timer;
      })
    );
  }, []);

  const clearCompletedTimer = useCallback(() => {
    setCompletedTimer(null);
  }, []);

  const clearHistory = useCallback(async () => {
    setHistory([]);
    try {
      await AsyncStorage.removeItem(HISTORY_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear history', error);
    }
  }, []);

  return {
    timers,
    history,
    loading,
    completedTimer,
    addTimer,
    startTimer,
    pauseTimer,
    resetTimer,
    deleteTimer,
    startAllInCategory,
    pauseAllInCategory,
    resetAllInCategory,
    clearCompletedTimer,
    clearHistory,
  };
}
