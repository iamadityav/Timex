import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import TimerHistory from './src/screens/TimerHistory';
// import TimerHistory from './src/screens/TimerHistory';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Timers') {
                iconName = 'timer';
              } else if (route.name === 'History') {
                iconName = 'history';
              }
              return <MaterialIcons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#007AFF',
            tabBarInactiveTintColor: 'gray',
            headerShown: true,
          })}
        >
          <Tab.Screen name="Timers" component={HomeScreen} />
          <Tab.Screen name="History" component={TimerHistory} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
