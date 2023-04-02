
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'


export default function Profile(){

return(
<SafeAreaView style={styles.container}>
    <View>
        <TextInput 
        style={styles.input}
        placeholder="Enter in  first name"
        />
    </View>
    <View>
    <TextInput 
        style={styles.input}
        placeholder="Enter in  first name"
        />
    </View>
    <View>
    <TextInput 
        style={styles.input}
        placeholder="Enter in  first name"
        />
    </View>
    <View>
    <TextInput 
        style={styles.input}
        placeholder="Enter in  first name"
        /> 
    </View>

</SafeAreaView>
)



}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {

        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    }
    

  });
  