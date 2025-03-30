import React, { useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView
} from 'react-native';
import { formatTimeDigital } from '../utils/formatTime';
import useTimers from '../hooks/useTimers';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TimerHistory = () => {
  const { history, clearHistory } = useTimers();
  console.log("🚀 ~ TimerHistory ~ history:", history);
  
  const sortedHistory = useMemo(() => {
    return [...history].sort((a, b) => 
      new Date(b.completedAt) - new Date(a.completedAt)
    );
  }, [history]);

  console.log('Sorted History:', sortedHistory);

  const renderHistoryItem = ({ item }) => {
    const completedDate = new Date(item.completedAt);
    
    return (
      <View style={styles.historyItem}>
        <View style={styles.historyHeader}>
          <Text style={styles.historyName}>{item.name}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        
        <View style={styles.historyDetails}>
          <View style={styles.timeInfo}>
            <Icon name="timer" size={16} color="#666" />
            <Text style={styles.durationText}>
              Duration: {formatTimeDigital(item.duration)}
            </Text>
          </View>
          
          <View style={styles.dateInfo}>
            <Icon name="event" size={16} color="#666" />
            <Text style={styles.dateText}>
              {completedDate.toLocaleDateString()} at {completedDate.toLocaleTimeString()}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Timer History</Text>
        {history.length > 0 && (
          <TouchableOpacity 
            style={styles.clearButton}
            onPress={clearHistory}
          >
            <Icon name="delete-sweep" size={20} color="#FF3B30" />
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name="history" size={64} color="#CCCCCC" />
          <Text style={styles.emptyText}>No completed timers yet</Text>
          <Text style={styles.emptySubtext}>
            Completed timers will appear here
          </Text>
        </View>
      ) : (
        <FlatList
          data={sortedHistory}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id + item.completedAt}
          contentContainerStyle={styles.listContent}
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
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButtonText: {
    marginLeft: 4,
    color: '#FF3B30',
    fontWeight: 'bold',
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
  },
  listContent: {
    padding: 16,
  },
  historyItem: {
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
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  categoryBadge: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
  },
  historyDetails: {
    gap: 8,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  durationText: {
    fontSize: 14,
    color: '#666',
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
});

export default TimerHistory;
