import React from 'react'
import FullScreenWrapper from '../../../components/ui/Wrappers/FullScreenWrapper/FullScreenWrapper'
import WebcamPreview from '../../../components/WebcamPreview/WebcamPreview'

export const WebcamOverlay = ({close}) => {
    return (
        <FullScreenWrapper onClose={close} >
            <WebcamPreview />
        </FullScreenWrapper>
    )
}
