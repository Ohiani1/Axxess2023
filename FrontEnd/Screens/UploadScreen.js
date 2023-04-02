import {StyleSheet, View, Modal} from 'react-native';
import * as Progress from 'react-native-progress';
import LottieView from 'lottie-react-native';

function UploadScreen({progress = 0, visible = false}){
    return(
        <Modal visible={visible}>
            <View Style={stytles.contianer}>
                <Progress.Bar color='#b9243c' progress={progress}/>
            </View>
        </Modal>
    )
}


export default UploadScreen;