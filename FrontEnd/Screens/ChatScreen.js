import React, { useState, useEffect,useRef } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import LottieView from 'lottie-react-native'
import { Audio } from 'expo-av'

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
  
    const deleteRecordingFile = async () => {
      try {
          const info = await FileSystem.getInfoAsync(recording.getURI());
          await FileSystem.deleteAsync(info.uri)
      } catch(error) {
          console.log("There was an error deleting recording file", error);
      }
    }
  
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
          /*
          const response = await fetch(config.CLOUD_FUNCTION_URL, {
              method: 'POST',
              body: formData
          });
          const data = await response.json();
          */
          //console.log(data);
         //setQuery(data.transcript);
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
      startRecording();
  };
  
  const handleOnPressOut = () => {
    pressOut();
    stopRecording();
    getTranscription();
  };

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
                style={{width:'110%', marginBottom:"-70%", marginTop: "-20%"}}
                source={require('../animations/audioLines.json')}
                />
                <TouchableOpacity style={styles.record}
                onPressIn={handleOnPressIn}
                onPressOut={handleOnPressOut}
                >
                
                <FontAwesome name="microphone" size={40} color="white" />
                </TouchableOpacity>
            </View>
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
    }
  });
  

  export default ChatScreen;