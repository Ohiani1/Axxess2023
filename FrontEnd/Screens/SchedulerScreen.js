import {Platform, View, Button, StyleSheet, Text, TouchableOpacity, Alert, Modal} from 'react-native';
import {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function SchedulerScreen(props){
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(true);
    const [text, setText] = useState('Empty');
    const [uploadVisible, setUploadVisible] = useState(false);
    const [progress, setProgress] = useState(0);
    const [stringDate, setStringDate] = useState((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
    const [stringTime, setStringTime] = useState(date.getHours() + ':' + date.getMinutes());

    const onChange = (event, SelectedDate) => {
        const currentDate = SelectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        let minString = '';


        let tempDate = new Date(currentDate);
        if (tempDate.getMinutes() < 10)
        {
            minString = '0';
        }
        let fDate = (tempDate.getMonth() + 1) + "/" + tempDate.getDate() + "/" +tempDate.getFullYear();
        let fTime =  tempDate.getHours() + ':' + minString + tempDate.getMinutes();
        
        setStringDate(fDate);
        setStringTime(fTime);

        console.log(fDate + '\n' + fTime)

    }

    const showAlert = () => {
        Alert.alert(
            'Confirm Appointment',
            `Confirm your appointment on ${stringDate} at ${stringTime}`,
            [
                {
                    text:'Yes',
                    onPress: () => setUploadVisible(true)
                },
                {
                    text:'Cancel',
                }
            ]
        );
    }
    

    return(
        <View style={styles.container}>
            <Text style={{fontWeight: 'bold', fontSize:23, marginBottom: 20}}>Let's book your appointment!</Text>
            <View style={{alignItems:'center'}}>
                <Text style={{fontSize:20, marginBottom: 10}}>Pick a date you will available</Text>
                <FontAwesome name="arrow-circle-down" size={40} color="#b9243c" style={{marginBottom:10}}/>
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                />
            </View>
            <View style={{alignItems:'center'}}> 
                <Text style={{fontSize:20, marginBottom: 10, marginTop: 20}}>Pick a date you will available</Text>
                <FontAwesome name="arrow-circle-down" size={40} color="#b9243c" style={{marginBottom:10}}/>
                <DateTimePicker
                    testID='dateTimePicker'
                    value={date}
                    mode={'time'}
                    is24Hour={true}
                    display='default'
                    onChange={onChange}
                />
            </View>
            <TouchableOpacity style={styles.bookButton} onPress={showAlert}>
                <Text style={{fontWeight: 'bold', fontSize:23, color:'white'}}>BOOK</Text>
            </TouchableOpacity>

            <Modal visible={uploadVisible}>
                <View style={styles.modalContainer}>
                    <LottieView
                            autoPlay
                            loop={false}
                            onAnimationFinish={()=> setUploadVisible(false)}
                            source={require('../animations/hitCrsLRmd.json')}
                            style={styles.animation}
                    />
                </View>
            </Modal>
            
        </View>

    
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:10
    },
    bookButton: {
        width:'60%',
        height:'8%',
        backgroundColor:'#b9243c',
        borderRadius:20,
        marginTop: 50,
        justifyContent:'center',
        alignItems:'center'
    },
    modalContainer: {
        alignItems:'center',
        flex:1,
        justifyContent:'center'
    },
    animation: {
        width: 300
    }
})
export default SchedulerScreen;