import React from 'react';
import { View, StyleSheet } from 'react-native';

const ProgressBar = ({ progress, color = '#007AFF' }) => {
  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.progress, 
          { width: `${progress}%`, backgroundColor: color }
        ]} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    width: '100%',
  },
  progress: {
    height: '100%',
    borderRadius: 3,
  },
});

export default ProgressBar;
