import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import TimerItem from './TimerItem';

const CategoryGroup = ({ 
  category, 
  timers, 
  onStartTimer, 
  onPauseTimer, 
  onResetTimer, 
  onDeleteTimer,
  onStartAll,
  onPauseAll,
  onResetAll
}) => {
  const [expanded, setExpanded] = useState(true);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  const runningCount = timers.filter(timer => timer.status === 'running').length;
  const completedCount = timers.filter(timer => timer.status === 'completed').length;
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleExpanded}>
        <View style={styles.titleContainer}>
          <MaterialIcons 
            name={expanded ? 'keyboard-arrow-down' : 'keyboard-arrow-right'} 
            size={24} 
            color="#007AFF" 
          />
          <Text style={styles.title}>{category}</Text>
        </View>
        <View style={styles.countContainer}>
          {runningCount > 0 && (
            <View style={styles.countBadge}>
              <Text style={styles.countText}>{runningCount} running</Text>
            </View>
          )}
          <Text style={styles.count}>{timers.length} timers</Text>
        </View>
      </TouchableOpacity>
      
      {expanded && (
        <View style={styles.content}>
          <View style={styles.bulkActions}>
            <TouchableOpacity 
              style={[styles.bulkButton, styles.startAllButton]}
              onPress={() => onStartAll(category)}
            >
              <MaterialIcons name="play-arrow" size={16} color="white" />
              <Text style={styles.bulkButtonText}>Start All</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.bulkButton, styles.pauseAllButton]}
              onPress={() => onPauseAll(category)}
            >
              <MaterialIcons name="pause" size={16} color="white" />
              <Text style={styles.bulkButtonText}>Pause All</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.bulkButton, styles.resetAllButton]}
              onPress={() => onResetAll(category)}
            >
              <MaterialIcons name="replay" size={16} color="white" />
              <Text style={styles.bulkButtonText}>Reset All</Text>
            </TouchableOpacity>
          </View>
          
          {timers.map(timer => (
            <TimerItem 
              key={timer.id}
              timer={timer}
              onStart={onStartTimer}
              onPause={onPauseTimer}
              onReset={onResetTimer}
              onDelete={onDeleteTimer}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  countText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  count: {
    color: '#666',
    fontSize: 14,
  },
  content: {
    padding: 16,
  },
  bulkActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  bulkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 4,
  },
  startAllButton: {
    backgroundColor: '#4CAF50',
  },
  pauseAllButton: {
    backgroundColor: '#FFC107',
  },
  resetAllButton: {
    backgroundColor: '#9E9E9E',
  },
  bulkButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 4,
  },
});

export default CategoryGroup;
