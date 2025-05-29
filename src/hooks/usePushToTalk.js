import React from "react";

export const usePushToTalk = (isMicrophoneMuted, usingPushToTalk, isPushToTalkActive, resumeProducer = () => {}, pauseProducer = () => {}) => {

    React.useEffect(() => {
        if (isMicrophoneMuted || !usingPushToTalk) return;

        if (isPushToTalkActive) {
            resumeProducer('microphone');
        } else if (isPushToTalkActive === false) {
            pauseProducer('microphone');
        }
        return () => {

        }
    // eslint-disable-next-line
    }, [isMicrophoneMuted, usingPushToTalk, isPushToTalkActive])

}