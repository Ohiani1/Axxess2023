import {Platform, View, Button, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native';
import {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesome } from '@expo/vector-icons';

function SchedulerScreen(props){
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(true);
    const [text, setText] = useState('Empty');
    const [visible, setVisible] = useState(false);
    const [stringDate, setStringDate] = useState((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
    const [stringTime, setStringTime] = useState(date.getHours() + ':' + date.getMinutes());

    const onChange = (event, SelectedDate) => {
        const currentDate = SelectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);

        let tempDate = new Date(currentDate);
        let fDate = (tempDate.getMonth() + 1) + "/" + tempDate.getDate() + "/" +tempDate.getFullYear();
        let fTime =  tempDate.getHours() + ':' + tempDate.getMinutes();
        setText(fDate + '\n' + fTime)
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
                    onPress: () => setVisible(true)
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
    }
})
export default SchedulerScreen;