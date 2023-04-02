import React, { useState, useEffect,useRef } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import LottieView from 'lottie-react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from './Screens/ChatScreen'
import AccountScreen from './Screens/AccountScreen'
import SchedulerScreen from './Screens/SchedulerScreen'
import ProfileScreen from './Screens/Profile'

const Tab = createBottomTabNavigator();

export default function App() {

 

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown:false}} >
        <Tab.Screen name='Chat' component={ChatScreen}/>
        <Tab.Screen name='Profile' component={ProfileScreen}/>
        <Tab.Screen name='scheduler' component={SchedulerScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  recordingText: {
    color: 'white',
  },
});
