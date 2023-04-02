import {View, Text} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountScreen from '../Screens/AccountScreen';
import ProfileScreen from '../Screens/Profile';

const Stack = createNativeStackNavigator();

function AccountNavigator(){
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='Account' component={AccountScreen}/>
            <Stack.Screen name='History' component={ProfileScreen}/>
        </Stack.Navigator>
    )
}

export default AccountNavigator;