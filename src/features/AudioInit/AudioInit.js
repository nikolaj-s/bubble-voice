import React from 'react'

export let audioCtx;

export const AudioInit = () => {

    React.useEffect(() => {

        if (audioCtx) return;

        audioCtx = new AudioContext();

    }, [])

    return (
        <></>
    )
}
