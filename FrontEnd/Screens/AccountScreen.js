import {View, SafeAreaView, StyleSheet, TouchableOpacity, Text} from'react-native'
import { Feather } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

function AccountScreen(){
    return(
        <SafeAreaView style={styles.container}>
        <View
        style={styles.innerContainer}>
        <View style={styles.profile}>
        </View>
        <View style={styles.widgetSection}>
        <TouchableOpacity style={styles.widget}>
        <Text style={styles.widgetTitle}>My Medical History</Text>
        <FontAwesome5 name="book-medical" size={36} color='#B9243C'
        style={{
            left: 20, position: 'absolute'
        }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.widget}>
        <Text style={styles.widgetTitle}>Upcoming Appointments</Text>
        <MaterialIcons name="book-online" size={36} color='#B9243C'  style={{
            left: 20, position: 'absolute'
        }} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.widget}>
        <MaterialCommunityIcons name="book-open" size={36} color='#B9243C'  style={{
            left: 20, position: 'absolute'
        }}/>
        <Text style={styles.widgetTitle}>Past Appointments</Text>
        
        </TouchableOpacity>
        <TouchableOpacity style={styles.widget}>
        <Feather name="log-out" size={36} color='#B9243C' style={{
            left: 20, position: 'absolute'
        }}/>
        <Text style={styles.widgetTitle}>Logout</Text>
        </TouchableOpacity>
        </View>
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
    profile: {

        borderRadius: '100%',
        backgroundColor: '#F1F1F1',
        alignSelf: 'center',
        width: 100,
        height: 100,

    },
      innerContainer: {
        alignContent: 'center',
        bottom: 0,
        position: 'absolute',
        backgroundColor: '#ffffff',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingTop: 30,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        width: '100%',
        height: '90%'
    },
    widgetTitle: {

        fontSize: 18,
        fontWeight: 700,
        textAlign: 'center',
        width: '100%',
        color: '#B9243C',
        

    },
    widget: {
        marginTop: 30,
        justifyContent: 'center',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10,
        height: 50,
        backgroundColor: '#F1F1F1',

    },

    widgetSection: {
        marginTop: 50,
     
    }
})


export default AccountScreen;
