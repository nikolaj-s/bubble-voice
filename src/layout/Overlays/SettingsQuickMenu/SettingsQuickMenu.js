
import React from 'react'

import { QuickMenuWrapper } from '../../../components/ui/Wrappers/QuickMenuWrapper/QuickMenuWrapper'

import Label from '../../../components/ui/Titles/Label/Label'

import { useDispatch, useSelector } from 'react-redux'

import TextButton from '../../../components/ui/Buttons/TextButton/TextButton'

import { setOverlay } from '../../../features/Overlay/overlaySlice'

import BoolInput from '../../../components/ui/Inputs/BoolInput/BoolInput'

import { toggleUsingPushToTalk } from '../../../features/Channel/MediaControl/mediaControlSlice'

import { LineSpacer } from '../../../components/ui/Spacers/LineSpacer/LineSpacer'


export const SettingsQuickMenu = ({close}) => {

    const dispatch = useDispatch();

    const {usingPushToTalk} = useSelector(state => state.mediaControlSlice);

    const handlePreviewWebcam = () => {
        dispatch(setOverlay('webcamOverlay'));
    }

    const handleToggleVoiceInputType = () => {
        dispatch(toggleUsingPushToTalk())
    }

    return (
        <QuickMenuWrapper close={close}>
            <div style={{
                padding: 5,
                width: 'calc(100% - 10px)',
                display: 'flex',
                flexDirection: 'column',
                gap: 10
            }}>
                <Label label='Select Voice Input Mode' />
                <div>
                <BoolInput name={"Voice Activation"} value={!usingPushToTalk} onChange={handleToggleVoiceInputType} />
                <BoolInput name={"Push To Talk"} value={usingPushToTalk} onChange={handleToggleVoiceInputType} />
                </div>
                <LineSpacer />
                <TextButton action={handlePreviewWebcam} title='Preview Webcam' />
            </div>
            
        </QuickMenuWrapper>
    )
}
