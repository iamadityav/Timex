import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ProgressBar from './ProgressBar';
import { formatTimeDigital } from '../utils/formatTime';
import  Icon  from 'react-native-vector-icons/MaterialIcons';

const TimerItem = ({ 
  timer, 
  onStart, 
  onPause, 
  onReset, 
  onDelete 
}) => {
  const progress = Math.max(0, Math.min(100, (timer.remainingTime / timer.duration) * 100));
  
  const getStatusColor = () => {
    switch (timer.status) {
      case 'running':
        return '#4CAF50'; // Green
      case 'paused':
        return '#FFC107'; // Yellow
      case 'completed':
        return '#9E9E9E'; // Gray
      default:
        return '#007AFF'; // Blue
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{timer.name}</Text>
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={() => onDelete(timer.id)}
        >
          <Icon name="delete-outline" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.timeContainer}>
        <Text style={[styles.time, { color: getStatusColor() }]}>
          {formatTimeDigital(timer.remainingTime)}
        </Text>
        <Text style={styles.totalTime}>
          / {formatTimeDigital(timer.duration)}
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <ProgressBar progress={progress} color={getStatusColor()} />
      </View>
      
      <View style={styles.controls}>
        {timer.status === 'running' ? (
          <TouchableOpacity 
            style={[styles.button, styles.pauseButton]} 
            onPress={() => onPause(timer.id)}
          >
            <Icon name="pause" size={18} color="white" />
            <Text style={styles.buttonText}>Pause</Text>
          </TouchableOpacity>
        ) : timer.status === 'completed' ? (
          <TouchableOpacity 
            style={[styles.button, styles.resetButton]} 
            onPress={() => onReset(timer.id)}
          >
            <Icon name="replay" size={18} color="white" />
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={[styles.button, styles.startButton]} 
            onPress={() => onStart(timer.id)}
          >
            <Icon name="play-arrow" size={18} color="white" />
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        )}
        
        {timer.status !== 'completed' && (
          <TouchableOpacity 
            style={[styles.button, styles.resetButton]} 
            onPress={() => onReset(timer.id)}
          >
            <Icon name="replay" size={18} color="white" />
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.footer}>
        <View style={styles.statusContainer}>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
          <Text style={styles.statusText}>
            {timer.status.charAt(0).toUpperCase() + timer.status.slice(1)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  deleteButton: {
    padding: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  time: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  totalTime: {
    fontSize: 14,
    color: '#999',
    marginLeft: 4,
  },
  progressContainer: {
    marginBottom: 16,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#FFC107',
  },
  resetButton: {
    backgroundColor: '#9E9E9E',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 6,
    fontSize: 14,
  },
  footer: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#666',
  },
});

export default TimerItem;
