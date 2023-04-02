
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Pressable } from 'react-native'
import RadioButtonGroup, { RadioButtonItem } from 'expo-radio-button'
import Checkbox from 'expo-checkbox'


export default function ProfileScreen(){

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [sex, setSex ] = useState("Male")
    const [bloodType, setBloodType] = useState("A")
    const [history, setHistory] = useState({
        "heart attack" : false,
        "high blood pressure" : false,
        "high cholestrol": false,
        "parkisons disease": false,
        "diabetes": false,
        "alzheimers": false,
        "breast cancer": false,
        "colon cancer": false,
        "ovarian cancer": false,
        "prostate cancer": false,
    })
    
    async function submitProfile() {

        const body = {

            "FirstName" : firstName,
            "LastName": lastName,
            "Sex": sex,
            "BloodType": bloodType,
            "FamilyMedicalHistory": history,

        }

        console.log(JSON.stringify(body))

        const response = await fetch('https://adoption-ff-poem-mi.trycloudflare.com/context', {

            method: "POST",
            body: JSON.stringify(body)
        })

        console.log(JSON.stringify(response))
    
        return 

    }
  
return(
<SafeAreaView style={styles.container}>
    <View style={styles.innerContainer}>
    <ScrollView
    showsVerticalScrollIndicator={false} >
    <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>First Name</Text>
        <TextInput 
        style={styles.input}
        value={firstName}
        placeholder="Enter in  first name"
        onChangeText={setFirstName}
        />
    </View>
    <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Last Name</Text>
    <TextInput 
        style={styles.input}
        value={lastName}
        placeholder="Enter in last name"
        onChangeText={setLastName }
        />
    </View>
    <View>
    <Text style={styles.radioButtonTitle}>What is your sex</Text>
    <RadioButtonGroup
    containerStyle={styles.radioButton}
    selected={sex}
    onSelected={(value) => setSex(value)}
    radioBackground="#B9243C"
    >
        <RadioButtonItem  
        style={styles.radioButtonItem} 
        value="Male" label="Male" />
        <RadioButtonItem  
          style={styles.radioButtonItem}
          value="Female"
          label="Female"
        />
    </RadioButtonGroup>
    </View>
    <View>
    <Text style={styles.radioButtonTitle}>What is your blood type</Text>
    <RadioButtonGroup
    containerStyle={styles.radioButton}
    selected={bloodType}
    onSelected={(value) => setBloodType(value)}
    radioBackground="#B9243C"
    >
        <RadioButtonItem 
        style={styles.radioButtonItem}
        value="+A" label="+A" />
        <RadioButtonItem 
          style={styles.radioButtonItem}
          value="+AB"
          label="+AB"
        />
        <RadioButtonItem 
          style={styles.radioButtonItem}
          value="+B"
          label="+B"
        />
        <RadioButtonItem 
          style={styles.radioButtonItem}
          value="+O"
          label="+O"
        />
          <RadioButtonItem 
            style={styles.radioButtonItem}
            value="-A" label="-A" />
        <RadioButtonItem 
          style={styles.radioButtonItem}
          value="-AB"
          label="-AB"
        />
        <RadioButtonItem 
          style={styles.radioButtonItem}
          value="-B"
          label="-B"
        />
        <RadioButtonItem 
          style={styles.radioButtonItem}
          value="-O"
          label="-O"
        />
    </RadioButtonGroup>
    <Text style={styles.title}>Has your family had any of these illnesses?</Text>
    <View
    style={styles.section}>
        <Text style={styles.label}>Heart Attack</Text>
        <Checkbox style={styles.checkbox} value={history["heart attack"]} 
        color={history["heart attack"]? '#B9243C' : undefined}
        onValueChange={(value) =>{

            const updatedObject = { ...history, "heart attack" : value }

            setHistory(updatedObject)

        }}
         />
        
        <Text style={styles.label}>High Blood Pressure</Text>
        <Checkbox style={styles.checkbox} value={history["high blood pressure"]} 
         color={history["high blood pressure"] ? '#B9243C' : undefined}
         onValueChange={(value) =>{
            
            const updatedObject = { ...history, "high blood pressure" : value }

            setHistory(updatedObject)

        }}/>
          
          <Text style={styles.label}>High Cholestrol</Text>
        <Checkbox style={styles.checkbox} value={history["high cholestrol"]} 
         color={history["high cholestrol"]? '#B9243C' : undefined}
         onValueChange={(value) =>{
            
            const updatedObject = { ...history, "high cholestrol" : value }

            setHistory(updatedObject)

        }}/>
           
           <Text style={styles.label}>Parkinsons Disease</Text>
        <Checkbox style={styles.checkbox} value={history["parkinsons disease"]} 
         color={history["parkinsons disease"]? '#B9243C' : undefined}
         onValueChange={(value) =>{
            
            const updatedObject = { ...history, "parkinsons disease" : value }

            setHistory(updatedObject)

        }}/>
         
         <Text style={styles.label}>Alzheimers</Text>
        <Checkbox style={styles.checkbox} value={history["alzheimers"]}
         color={history["alzheimers"] ? '#B9243C' : undefined}
         onValueChange={(value) =>{
            
            const updatedObject = { ...history, "alzheimers" : value }

            setHistory(updatedObject)

        }}/>
               
               <Text style={styles.label}>Breast Cancer</Text>
        <Checkbox style={styles.checkbox} value={history["breast cancer"]} 
         color={history["breast cancer"] ? '#B9243C' : undefined}
         onValueChange={(value) =>{
            
            const updatedObject = { ...history, "breast cancer" : value }

            setHistory(updatedObject)

        }}/>
                
        <Text style={styles.label}>Colon Cancer</Text>
        <Checkbox style={styles.checkbox} value={history["colon cancer"]}  
        color={history["colon cancer"] ? '#B9243C' : undefined}
        onValueChange={(value) =>{
            
            const updatedObject = { ...history, "colon cancer" : value }

            setHistory(updatedObject)

        }}/>
         
         <Text style={styles.label}>Ovarian Cancer</Text>
        <Checkbox style={styles.checkbox} 
        color={history["ovarian cancer"] ? '#B9243C' : undefined}
        value={history["ovarian cancer"]} 
         onValueChange={(value) =>{
            
            const updatedObject = { ...history, "ovarian cancer" : value }

            setHistory(updatedObject)

        }}/>
              
              <Text style={styles.label}>Prostate Cancer</Text>
        <Checkbox style={styles.checkbox} 

         color={history["prostate cancer"] ? '#B9243C' : undefined}
         value={history["prostate cancer"]} 
         onValueChange={(value) =>{
            
            const updatedObject = { ...history, "prostate cancer" : value }

            setHistory(updatedObject)

        }}/>
           
    </View>

    <TouchableOpacity
        style={styles.submit}
        onPress={submitProfile}
        >
            <Text style={{
                color: 'white', 
                textAlign: 'center'
            }}>Submit</Text>
    </TouchableOpacity>
    </View>
    </ScrollView>
    </View>

</SafeAreaView>
)



}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#B9243C',
      alignItems: 'center',
      justifyContent: 'center',
 
    },
    innerContainer: {

        alignContent: 'center',
        bottom: 0,
        position: 'absolute',
        backgroundColor: '#ffffff',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingTop: 30,
        paddingBottom: 15,
        paddingLeft: 33,
        paddingRight: 33,
        width: '100%',
        height: '90%'

    },
    inputLabel: {

        alignSelf: 'center',
        fontSize: 16
  

    },
    inputContainer: {

        flexDirection: 'row',
        marginTop: 10,
        

    },
    input: {

        height: 40,
        width: 200,
        margin: 12,
        borderRadius: 100,
        borderWidth: 1,
        padding: 10
    },
    radioButtonTitle: {

       textAlign: 'center',
       alignSelf: 'center',
       fontSize: 16,
       width:'50%',
       marginBottom: 10,


    },

    title: {
        fontSize: 16,
        textAlign: 'center',
        alignSelf: 'center',
        width:'70%',
        marginBottom: 10,
    },
    radioButton: {

        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: 200,
        margin: 10,

    },
    radioButtonItem: {

        margin: 10,

    }, 

    section: {

        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '95%',
        alignItems: 'center',
    
    },
    label: {

        width: 100,
        fontSize: 14

    },
    checkbox: {
        margin: 4
    },

    submit: {

        marginTop: 10,
        alignSelf: 'center', 
        backgroundColor: '#B9243C', 
        width: 150, 
        height: 50,
        justifyContent: 'center', 
        borderRadius: 20 
    }


  });
  