import React, { useState, useEffect,useRef } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Image, Modal, Platform, Alert } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import { Audio } from 'expo-av'
import SchedulerScreen from './SchedulerScreen'
import DateTimePicker from '@react-native-community/datetimepicker';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const recordingOptions = {
    // android not currently in use, but parameters are required
    android: {
        extension: '.m4a',
        outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
        audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
        sampleRate: 44100,
        numberOfChannels: 2,
        bitRate: 128000,
    },
    ios: {
        extension: '.wav',
        audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
        sampleRate: 44100,
        numberOfChannels: 1,
        bitRate: 128000,
        linearPCMBitDepth: 16,
        linearPCMIsBigEndian: false,
        linearPCMIsFloat: false,
    },
  };

function ChatScreen(props){
    const animation = useRef(null);

    const onpress = () => {
      animation.current.play();
    }
  
    const pressOut = () => {
      animation.current.pause();
    }
  
    const [recording, setRecording] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [ending, setEnding] = useState(false)
    const [seeText, setSeeText] = useState(true);
    const [sound, setSound] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(true);
    const [text, setText] = useState('Empty');
    const [uploadVisible, setUploadVisible] = useState(false);
    const [stringDate, setStringDate] = useState((date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear());
    const [stringTime, setStringTime] = useState(date.getHours() + ':' + date.getMinutes());
    


    async function playSound(soundFile) {

      console.log('Loading sound...')

      const { sound } = await Audio.Sound.createAsync({uri: soundFile})

      setSound(sound)

      console.log('Playing Sound')

      await sound.playAsync()

    }
    useEffect(() =>{
      console.log(ending)
    }, [ending])


    useEffect(() => {
      return sound ? () => {
        console.log('Unloading Sound')
        sound.unloadAsync()
      }
      : undefined
    }, [sound])
  
    const [siri, setSiri] = useState(false);
  
    const getTranscription = async () => {
  
      setIsFetching(true);
      try {
  
          const uri = await recording.getURI();
          
          console.log(`URI: ${uri}`);
          const formData = new FormData();
          formData.append('file', {
              uri,
              type: 'audio/x-wav',
              name: 'speech2text'
          });
  
          console.log(formData)
          const response = await fetch('https://donna-enabled-majority-re.trycloudflare.com/stt', {
              method: 'POST',
              body: formData
          });

          const data = await response.json();

          url = data.url

          console.log(`bot asked question: ${data.bot}`)

          if(data.bot.toLowerCase().includes("appointment")){
 
            setEnding(true);
          }

          const user = data.user
          console.log(user)
          
          if (ending && data.user.toLowerCase().includes("yes"))
          {
            setModalVisible(true);
          }
        

          console.log(url);

          playSound(url)

      } catch(error) {
          console.log('There was an error reading file', error);
      }
      setIsFetching(false);
  }
  
    async function startRecording() {
  
  
      try {
      
      console.log('Requesting permissions...')
  
      await Audio.requestPermissionsAsync()
  
      await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
      });
  
      console.log('Starting recording..')
  
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
        );
  
      setRecording(recording)
      setIsRecording(true);
  
      console.log('Recording started')
  
      } catch (error) {
  
        
          console.log(error);
          stopRecording();
      }
  
    }
  
    async function stopRecording() {
  
      console.log('Stopped recording...')
     
      setIsRecording(false)
  
      await recording.stopAndUnloadAsync()
  
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      })
  
      const uri = recording.getURI();
      console.log('Recording stopped and stored at', uri);
  
  
    }
  
  const resetRecording = () => {
      deleteRecordingFile();
      setRecording(null);
  };
  
  const handleOnPressIn = () => {
    onpress();  
    setSeeText(false);
    startRecording();
  };
  
  const handleOnPressOut = () => {
    pressOut();
    setSeeText(true);
    stopRecording();
    getTranscription();
  };

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
        <View style={styles.screenTop}>
            <SafeAreaView style={styles.header}>
                <Text style={styles.text}>Hi Sarah,👋</Text>
                <Image style={styles.person} source={require('../assets/person.jpg')}/>
            </SafeAreaView>
            <Text style={styles.smallText}>Welcome!</Text>
            <View style={styles.container}>
                <LottieView
                    ref={animation}
                    style={{width:"150%"}}
                    source={require('../animations/53476-siri.json')}
                />
                       
                <TouchableOpacity style={styles.record}
                onPressIn={handleOnPressIn}
                onPressOut={handleOnPressOut}
                >
                
                <FontAwesome name="microphone" size={40} color="white" />
                </TouchableOpacity>
                {seeText && <Text>Press and Hold to Begin!</Text>}
            </View>
            <Modal visible={modalVisible}>
                <View style={styles.newContainer}>
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
                                onAnimationFinish={()=> {
                                    setUploadVisible(false)
                                    setModalVisible(false);
                                }}
                                source={require('../animations/hitCrsLRmd.json')}
                                style={styles.animation}
                        />
                    </View>
                </Modal>
             </View>

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      width:'100%',
      height:'80%',
      borderTopRightRadius:15,
      borderTopLeftRadius:15,
      position:'absolute',
      bottom:0
    },
  
    recordingText: {
  
      color: 'white',
  
    },
    record: {
      alignItems:'center',
      justifyContent:'center',
      height: 100,
      width:100,
      borderRadius:1000,
      backgroundColor: '#333333',
      shadowRadius: 10,
      shadowOpacity:0.6,
      marginBottom:7
    },
    screenTop: {
      backgroundColor:'#b9243c',
      width: '100%',
      height:'100%'
    },
    header: {
      justifyContent:'space-between',
      alignItems:'center',
      width:'100%',
      marginTop:'17%',
      flexDirection:'row',
    },
    text: {
        fontStyle:'normal',
        color:'white',
        fontWeight:'bold',
        fontSize:28,
        marginLeft:"8%"
    },
    person: {
      width: 60,
      height:60,
      marginRight:"8%",
      borderRadius:50,
      borderWidth:2
    },
    smallText:
    {
      fontStyle:'normal',
      color:'white',
      marginLeft:"8%",
      marginTop:"-3%",
    },
    newContainer: {
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
  });
  

  export default ChatScreen;
