
import React from 'react'

import Header from '../../../../components/Titles/Header/Header'

import { DeviceSelector } from '../../../../components/Inputs/DeviceSelector/DeviceSelector'

export const VoiceVideoSettingsForm = () => {
    return (
        <>
        <Header text='Voice / Video Settings' />
        <DeviceSelector type={'microphone'} />
        <DeviceSelector type={'speaker'} />
        <DeviceSelector type={'webcam'} />

        </>
    )
}
