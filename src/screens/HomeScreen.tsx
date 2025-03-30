import React, { useState, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Alert
} from 'react-native';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import CategoryGroup from '../components/CategoryGroup';
import AddTimerModal from '../components/AddTimer';
import CompletionModal from '../components/CompletionModal';
import useTimers from '../hooks/useTimers';
import { formatTime } from '../utils/formatTime';

const HomeScreen = () => {
  const {
    timers,
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
    clearCompletedTimer
  } = useTimers();
  
  const [isAddTimerVisible, setIsAddTimerVisible] = useState(false);
  
  const timersByCategory = useMemo(() => {
    const grouped = {};
    
    timers.forEach(timer => {
      if (!grouped[timer.category]) {
        grouped[timer.category] = [];
      }
      grouped[timer.category].push(timer);
    });
    
    return grouped;
  }, [timers]);
  
  const categories = useMemo(() => {
    return Object.keys(timersByCategory).sort();
  }, [timersByCategory]);
  
  const handleAddTimer = useCallback((name, duration, category) => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a timer name');
      return;
    }
    
    if (!duration || isNaN(duration) || parseInt(duration) <= 0) {
      Alert.alert('Error', 'Please enter a valid duration in seconds');
      return;
    }
    
    if (!category.trim()) {
      Alert.alert('Error', 'Please select or enter a category');
      return;
    }
    
    addTimer(name, parseInt(duration, 10), category);
    setIsAddTimerVisible(false);
  }, [addTimer]);
  
  const handleDeleteTimer = useCallback((timerId) => {
    Alert.alert(
      'Delete Timer',
      'Are you sure you want to delete this timer?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => deleteTimer(timerId),
          style: 'destructive'
        }
      ]
    );
  }, [deleteTimer]);
  
  const allCategories = useMemo(() => {
    return categories.length > 0 ? categories : ['Work', 'Study', 'Exercise', 'Break'];
  }, [categories]);
  
  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Loading timers...</Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>My Timers</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setIsAddTimerVisible(true)}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      {timers.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="timer" size={64} color="#CCCCCC" />
          <Text style={styles.emptyText}>No timers yet</Text>
          <Text style={styles.emptySubtext}>
            Tap the + button to create your first timer
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.content} contentContainerStyle={styles.scrollContent}>
          {categories.map(category => (
            <CategoryGroup
              key={category}
              category={category}
              timers={timersByCategory[category]}
              onStartTimer={startTimer}
              onPauseTimer={pauseTimer}
              onResetTimer={resetTimer}
              onDeleteTimer={handleDeleteTimer}
              onStartAll={startAllInCategory}
              onPauseAll={pauseAllInCategory}
              onResetAll={resetAllInCategory}
            />
          ))}
          <View style={styles.bottomPadding} />
        </ScrollView>
      )}
      
      <AddTimerModal
        visible={isAddTimerVisible}
        onClose={() => setIsAddTimerVisible(false)}
        onAddTimer={handleAddTimer}
        categories={allCategories}
      />
      
      {completedTimer && (
        <CompletionModal
          visible={!!completedTimer}
          onClose={clearCompletedTimer}
          timerName={completedTimer.name}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666666',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    marginTop: 8,
    maxWidth: '80%',
  },
  bottomPadding: {
    height: 20,
  },
});

export default HomeScreen;
