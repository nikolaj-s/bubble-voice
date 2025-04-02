import React from 'react'
import TextButton from '../ui/Buttons/TextButton/TextButton'
import VUMeter from '../Misc/VUMeter/VUMeter'
import useTestMicrophone from '../../hooks/useTestMicrophone'
import Label from '../ui/Titles/Label/Label'
import VolumeSlider from '../ui/Inputs/VolumeSlider/VolumeSlider'

import styles from './TestMicrophone.module.css'


const ListenToMicrophone = ({onChange = () => {}, deviceId, voiceThreshold}) => {

    const volume = useTestMicrophone(voiceThreshold, deviceId);

    React.useEffect(() => {
        console.log(volume);
        onChange(volume);

    }, [volume, onChange])

    return (
       null
    )
}


export const TestMicrophone = ({voiceThreshold = 0, setVoiceThreshold = () => {}, usingPushToTalk, deviceId}) => {

    const [testingMicrophone, toggleTestingMicrophone] = React.useState(false);

    const [volume, setVolume] = React.useState(0);

    return (
        <div className={styles.container}>
        <VUMeter 
        volume={volume} 
        voiceThreshold={usingPushToTalk ? null : voiceThreshold}
        />
        {!usingPushToTalk && 
        <>
        <Label label='Adjust Voice Activation Threshold' />
        <VolumeSlider 
        min={1}
        max={99}
        step={2}
        value={voiceThreshold}
        onChange={setVoiceThreshold}
        />
        </>}
        <TextButton
        backgroundColor={testingMicrophone ? "var(--error-color)" : null}
        action={() => {toggleTestingMicrophone(!testingMicrophone); setVolume(0)}}
        title={testingMicrophone ? "Stop" : "Start"} 
        maxWidth={120}
        />
        {testingMicrophone ?
        <ListenToMicrophone 
        deviceId={deviceId}
        voiceThreshold={voiceThreshold}
        onChange={setVolume} />
        :
        null
        }
        </div>
    )
}
