import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { Audio } from 'expo-av'
import * as FileSystem from 'expo-file-system'

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

export default function App() {

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
    startRecording();
};

const handleOnPressOut = () => {
    stopRecording();
    getTranscription();
};

  return (
    <SafeAreaView style={styles.container}>
      <Text>DoctorAI</Text>
      {isRecording &&
        
        <FontAwesome name="microphone" size={32} color="#48C9B0" />
       
      }
      {!isRecording &&
          <FontAwesome name="microphone" size={32} color="#48C9B0" />
      }
      <TouchableOpacity style={styles.record}
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
      >
      
      <Text style={styles.recordingText}>Click to start conversation</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  recordingText: {

    color: 'white',

  },
  record: {
    marginTop: 30,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#4F7942',
    height: 60,
    borderRadius: 20,


  }
});
