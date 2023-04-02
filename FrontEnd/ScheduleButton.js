import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

function SchedulerButton({onpress}){
    return(
        <TouchableOpacity onPress={onpress}>
            <View style={styles.container}>
                <Ionicons name="md-calendar-outline" size={40} color="white" />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#b9243c',
        borderColor:'white',
        bottom:20,
        borderWidth:10,
        height:90,
        weight:90,
        borderRadius:80,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:15,
        shadowOpacity:0.2
        
    }
})

export default SchedulerButton;