import React, { useState, useEffect,useRef } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Image} from 'react-native'
import { FontAwesome, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'
import LottieView from 'lottie-react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatScreen from './Screens/ChatScreen'
import AccountScreen from './Screens/AccountScreen'
import SchedulerScreen from './Screens/SchedulerScreen'
import ProfileScreen from './Screens/Profile'
import SchedulerButton from './ScheduleButton'


const Tab = createBottomTabNavigator();

export default function App() {
 

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name='Chat' component={ChatScreen} options={({navigation}) => ({
          tabBarIcon: ({size, color}) => (
            <MaterialIcons name="keyboard-voice" size={30} color="#b9243c"/>
          )
        })}/>
        <Tab.Screen name='Schedule' component={SchedulerScreen} options={({navigation}) => ({
          tabBarButton: () => <SchedulerButton onpress={()=> navigation.navigate('Schedule')}/>,
          tabBarIcon: ({size, color}) => (
            <MaterialIcons name="keyboard-voice" size={30} color="#b9243c"/>
          )
        })}/>
        <Tab.Screen name='Account' component={AccountScreen} options={{
          tabBarIcon: ({size, color}) => (
            <MaterialCommunityIcons name="account" size={30} color="#b9243c" />
          )
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  recordingText: {
    color: 'white',
  },
  tabIcons: {
    width:20,
    height:20
  }
});
