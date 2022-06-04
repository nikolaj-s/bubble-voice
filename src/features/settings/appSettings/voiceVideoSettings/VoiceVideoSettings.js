import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoutes } from 'react-router'
import { DropDownList } from '../../../../components/DropDownList/DropDownList';
import { InputTitle } from '../../../../components/titles/inputTitle/InputTitle';
import { setHeaderTitle } from '../../../contentScreen/contentScreenSlice';
import { selectAudioInputList, selectAudioInput, updateSelectedDevice, selectAudioOutput, selectAudioOutputList, selectVideoInput, selectVideoInputList } from './voiceVideoSettingsSlice';

const Settings = () => {

    const dispatch = useDispatch();

    React.useEffect(() => {

        dispatch(setHeaderTitle("Voice / Video Settings"))

    }, [])

    const selectedAudioInput = useSelector(selectAudioInput);

    const selectedAudioInputList = useSelector(selectAudioInputList);

    const selectedAudioOutput = useSelector(selectAudioOutput);

    const selectedAudioOutputList = useSelector(selectAudioOutputList);

    const selectedVideoInput = useSelector(selectVideoInput);

    const selectedVideoInputList = useSelector(selectVideoInputList);

    const selectDevice = (type, device) => {
        dispatch(updateSelectedDevice({type, device}))
    }

    return (
        <>
        <InputTitle title={"Select Audio Input Device"} />
        <DropDownList action={selectDevice} stateType={"audioInput"} selectedItem={selectedAudioInput.label} list={selectedAudioInputList} />
        <InputTitle title={"Select Audio Output Device"} />
        <DropDownList action={selectDevice} stateType={"audioOutput"} selectedItem={selectedAudioOutput.label} list={selectedAudioOutputList} />
        <InputTitle title={"Select Video Input Device"} />
        <DropDownList action={selectDevice} stateType={"videoInput"} selectedItem={selectedVideoInput.label} list={selectedVideoInputList} />
        </>
    )
}

export const VoiceVideoSettings = () => useRoutes([
    { path: "voice-video", element: <Settings /> }
])

