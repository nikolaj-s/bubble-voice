audioCtx = new AudioContext();
                    
analyser = audioCtx.createAnalyser();

source = audioCtx.createMediaStreamSource(audio);

scriptProcessor = audioCtx.createScriptProcessor(1024, 1, 1)

analyser.smoothingTimeConstant = 0.2;

analyser.fftSize = 1024;

source.connect(analyser);

analyser.connect(scriptProcessor);

scriptProcessor.connect(audioCtx.destination);

scriptProcessor.onaudioprocess = function() {
    try {
        const array = new Uint8Array(analyser.frequencyBinCount);

        analyser.getByteFrequencyData(array);

        const arrSum = array.reduce((a, value) => a + value, 0);

        const avg = (arrSum / array.length) * 5;

        let timeout;
        
        if (avg >= voiceActivationSensitivity) {
            
            if (playing || microphoneState === false) return;

            clearTimeout(timeout);

            timeout = null;

            playing = true;

            client.resumeProducer('audioType');

            dispatch(updateMemberStatus({username: user.username, action: {active: true}}))
        
            socket.emit('user status', {username: user.username, action: {active: true, channel_specific: true}})
            
        } else if (avg < voiceActivationSensitivity) {

            if (playing === false) return;

            playing = false;

            clearTimeout(timeout);

            timeout = null;

            timeout = setTimeout(() => {

                client.pauseProducer('audioType');

                dispatch(updateMemberStatus({username: user.username, action: {active: false}}))
                
                socket.emit('user status', {username: user.username, action: {active: false, channel_specific: true}})
            }, voiceDeactivationDelay)
        }

        console.log(timeout)
    } catch (error) {
        console.log(error)
        scriptProcessor.onaudioprocess = null;
    }
}