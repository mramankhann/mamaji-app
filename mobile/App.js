import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './screens/LoginScreen';
import OTPScreen from './screens/OTPScreen';
import HomeScreen from './screens/HomeScreen';
import ComplaintScreen from './screens/ComplaintScreen';
import ComplaintHistoryScreen from './screens/ComplaintHistoryScreen';
import BroadcastScreen from './screens/BroadcastScreen';
import EventScreen from './screens/EventScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Broadcasts" component={BroadcastScreen} />
      <Tab.Screen name="Events" component={EventScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Complaint" component={ComplaintScreen} />
        <Stack.Screen name="ComplaintHistory" component={ComplaintHistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
