import { USER_PREFS } from "../../../../util/LocalData";
import { audioCtx } from "../../../AudioInit/AudioInit";

const mediaType = {
    audio: 'audioType',
    video: 'videoType',
    screen: 'screenType'
}

export class RoomClient {
    constructor(socket, current_channel_id, server_id, mediasoupClient, audioInputDevice, videoInputDevice, audioInputState, videoInputState, user, dispatch, audioState, mirrorWebCam, echoCancellation = false, noiseSuppression = false, microphoneInputVolume = 1, autoGainControl = false) {

        this.socket = socket;

        this.current_channel_id = current_channel_id;

        this.server_id = server_id;

        this.mediasoupClient = mediasoupClient;

        this.audioInputDevice = audioInputDevice;

        this.videoInputDevice = videoInputDevice;

        this.audioInputState = audioInputState;

        this.videoInputState = videoInputState;

        this.user = user;

        this.device = null;

        this.producerTransport = null;

        this.consumerTransport = null;

        this.consumers = new Map();

        this.producers = new Map();

        this.producerLabel = new Map();

        this.dispatch = dispatch;

        this.audioState = audioState;

        this.webCamMirrorState = mirrorWebCam;

        this.noiseSuppression = noiseSuppression;

        this.echoCancellation = echoCancellation;

        this.autoGainControl = autoGainControl;

        this.microphoneInputVolume = microphoneInputVolume;

        this.error_count = 0;

        this.handling_error = false;
    }
    
    updateAudioPrefs(noiseSuppression, echoCancellation, microphoneInputVolume, l_autoGainControl) {

        this.noiseSuppression = noiseSuppression;

        this.echoCancellation = echoCancellation;

        this.microphoneInputVolume = microphoneInputVolume;

        this.autoGainControl = l_autoGainControl;
    
    }

    async loadDevice(routerRtpCapabilities) {
        let local_device;
        try {
            local_device = new this.mediasoupClient.Device();
        } catch (error) {
            console.log(error);
        }

        await local_device.load({
            routerRtpCapabilities
        })

        return local_device;
    }

    async initTransports(device) {
        {   
                
            const data = await this.socket.request('createWebRtcTransport', {
                forceTcp: false,
                rtpCapabilities: this.device.rtpCapabilities
            }).then(response => {
                return response;
            })
            
            if (data.error) {
                console.log(data.error)
                return;
            }
            
            this.producerTransport = device.createSendTransport(data);

            this.producerTransport.on('connect', async function({dtlsParameters}, callback, errback) {
                this.socket.request('connectTransport', {dtlsParameters: dtlsParameters, transport_id: data.id})
                .then(callback)
                .catch(errback)
            }.bind(this))

            this.producerTransport.on('produce', async function ({kind, rtpParameters, appData}, callback, errback) {

                try {
                    
                    const producer_id = await this.socket.request('produce', {
                        producerTransportId: this.producerTransport.id,
                        kind: kind,
                        rtpParameters: rtpParameters,
                        appData: appData
                    }).then(response => {
                        return response;
                    })
                    callback({id: producer_id});
                } catch (error) {
                    console.log(error)
                    errback(error);
                    this.dispatch({error: true, errorMessage: "Fatal Error Sending Data"})
                }
            }.bind(this))

            this.producerTransport.on('connectionstatechange', function(state) {
                switch (state) {
                    case 'connecting':
                        break
                    case 'connected':
                        break
                    case 'failed':
                        this.producerTransport.close();
                        break
                    default:
                        break
                }
            }.bind(this))
        }
        // initialize consumer transport
        {
            const data = await this.socket.request('createWebRtcTransport', {
                forceTcp: false
            })

            if (data.error) {
                console.log(data.error);
                return;
            }

            this.consumerTransport = device.createRecvTransport(data);

            this.consumerTransport.on('connect', function({ dtlsParameters }, callback, errback) {
                this.socket.request('connectTransport', {transport_id: this.consumerTransport.id, dtlsParameters: dtlsParameters})
                .then(callback)
                .catch(errback)
            }.bind(this));

            this.consumerTransport.on('connectionstatechange', async function(state) {
                console.log(state)
                switch (state) {
                    case 'connecting':
                        this.dispatch({action: 'connection', value: true});
                        break
                    case 'connected':
                        this.dispatch({action: 'connection', value: false});
                        this.dispatch({action: 'connectionError', value: false});
                        break
                    case 'failed':
                        this.dispatch({action: 'connection', value: true});
                        this.dispatch({action: 'connectionError', value: true});
                        this.consumerTransport.close();
                        break
                    default:
                        break
                }
            }.bind(this))
        }
    }

    async getConsumeStream(producerId) {
        try {
            const { rtpCapabilities } = this.device;

            const data = await this.socket.request('consume', {
                rtpCapabilities: rtpCapabilities,
                consumerTransportId: this.consumerTransport.id,
                producerId: producerId
            })
            .catch(error => {
                console.log(error);
            })

            const { id, kind, rtpParameters } = data;

            let codecOptions = {};

            const consumer = await this.consumerTransport.consume({
                id,
                producerId,
                kind,
                rtpParameters,
                codecOptions
            })

            const stream = new MediaStream();

            stream.addTrack(consumer.track);

            const user = this.user

            return {
                consumer,
                stream,
                kind,
                user
            }
        
        } catch (error) {
            console.log(error);

            console.log('sdp error is being thrown here')
         //   this.dispatch({action: 'error', value: "A SDP Verification Error has been thrown, Attempting Experimental fix, if no audio or missing streams please reconnect to channel"})
            this.handleError();
        }
    }

    async consume(producer_id, user, appData) {
        try {
            this.getConsumeStream(producer_id)
            .then( async function (data) {
                
                let consumer = data?.consumer;

                if (consumer === undefined) return;

                let stream = data?.stream;
                
                this.consumers.set(consumer.id, consumer);

                const prefs = USER_PREFS.get(user._id);

                let el;

                let par;

                if (consumer.rtpParameters.codecs[0].mimeType === 'video/VP8' || appData.type === 'web cam') {
                    // handle displaying web cam feed

                    el = document.createElement('video');

                    el.srcObject = stream;

                    el.id = consumer.id;

                    console.log(user)

                    el.className = `stream web-cam-stream ${user._id}-camera-stream`;

                    el.playsInline = false;

                    el.style.transform = (user.mirror_web_cam && prefs?.flip_web_cam) ? null : (user.mirror_web_cam && !prefs?.flip_web_cam) ? 'scaleX(-1)' : null;

                    el.autoplay = true;

                    el.muted = true;

                    if (prefs?.disabled_web_cam) {

                        el.style.opacity = 0;

                        this.pauseConsumerById(consumer.id);
                    }

                    document.getElementById(user._id).appendChild(el);
                    
                } else if (consumer.rtpParameters.codecs[0].mimeType === 'video/H264' || consumer.rtpParameters.codecs[0].mimeType === 'video/rtx' || appData.type === 'screen share') {
                    // display incoming screen stream

                    stream.getVideoTracks()[0].contentHint = 'motion'
                    
                    const exists = document.getElementsByClassName(`${user._id}-screen-share-stream`)[0]

                    if (exists) {

                        exists.srcObject = stream;

                        exists.id = consumer.id;

                        exists.parentElement.id = consumer.id + 'container'

                    } else {

                        par = document.createElement('div');

                        par.className = `streaming-video-player-container`

                        el = document.createElement('video');

                        let stream_title_container = document.createElement('div');
                        let stream_title = document.createElement('p');
                        stream_title_container.className = 'stream-title-container';
                        stream_title.innerHTML = appData?.name;
                        stream_title_container.append(stream_title);

                        el.srcObject = stream;
                        
                        par.id = consumer.id + 'container';

                        par.style.display = 'flex';

                        el.id = consumer.id;

                        el.autoplay = true;

                        el.className = `streaming-video-player ${user._id} ${user._id}-screen-share-stream`

                        el.playsInline = true;

                        el.muted = true;

                        el.volume = 1;

                        par.appendChild(stream_title_container);

                        par.appendChild(el);

                        if (prefs?.disable_stream) {
                            par.style.display = 'none';

                            this.pauseConsumerById(consumer.id);
                        }

                        document.getElementById(user._id).parentNode.appendChild(par)
                        
                    }
                } else {
                    
                    el = document.createElement('audio')

                    el.hidden = true;

                    el.id = consumer.id;

                    el.muted = this.audioState;

                    el.autoplay = true;
                    // handle incoming audio
                    
                    if (appData?.type === 'stream audio') {

                        const existing_audio = document.getElementsByClassName(`${user._id}-stream-audio`);

                        if (existing_audio.length > 0) existing_audio[0].remove();
                    
                        if (prefs?.disable_stream) {
                            this.pauseConsumerById(consumer.id)
                        }

                        el.className = `${user._id}-stream-audio`;
                        console.log(prefs?.stream_volume)
                        el.volume = 1;

                        el.srcObject = stream;
                        
                        audioCtx.resume();

                        document.getElementById('live-chat-wrapper').appendChild(el);
                    
                    } else {
                        
                        const user_pref_volume = USER_PREFS.get(user._id);

                        el.className = `audio-source-for-user-${user._id}`;

                        el.volume = user_pref_volume?.volume ? user_pref_volume.volume > 1 ? 1 : user_pref_volume.volume : 1;

                        // const source = audioCtx.createMediaStreamSource(stream);
                        
                        // const dst = audioCtx.createMediaStreamDestination();

                        // const gainNode = audioCtx.createGain();
                        
                        // source.connect(gainNode);

                        // gainNode.connect(dst)

                        // source.connect(dst)

                        // gainNode.gain.value = 3;
                        
                        audioCtx.resume();

                        el.srcObject = stream;

                        document.getElementById(user._id).appendChild(el);

                    } 

                }

                
                consumer.on('trackended', function () {
                    this.removeConsumer(consumer.id);
                }.bind(this))

                consumer.on('transportclose', function () {
                    this.removeConsumer(consumer.id);
                }.bind(this))
            
            }.bind(this))

        } catch (error) {
            console.log(error);
            
            this.handleError();
            
            console.log('sdp error is being thown on consume')

            this.dispatch({action: 'error', value: "ERROR: SDP/UDP Layer Verification of connection failed, please reconnect to server or restart app to solve issue, this is a temporary work around"});
        }
    }

    getConsumer(consumer_id) {
        return this.consumers.get(consumer_id);
    }

    removeConsumer(consumer_id) {
        let el = document.getElementById(consumer_id);

        let par = document.getElementById(consumer_id + 'container');

        if (el) {
            el.srcObject.getTracks().forEach(track => {
                track.stop();
            })
    
            el.remove();
        }

        if (par) {
            par.remove();
        }
        
        this.consumers.delete(consumer_id);
    }    

    closeProducerById(id) {
        try {

            let producer_id = this.producers.get(id);

            if (producer_id) {
                this.producers.get(producer_id)?.close()

                this.producers.delete(producer_id)

                this.socket.emit('producerClosed', {
                    producer_id
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    closeProducer(type) {
        try {
            if (!this.producerLabel.has(type)) {
                console.log('There is no producer for this type ' + type)
                return
            }
        
            let producer_id = this.producerLabel.get(type)
    
            console.log('Close producer', producer_id)
        
            this.socket.emit('producerClosed', {
                producer_id
            })
        
            this.producers.get(producer_id)?.close()
            this.producers.delete(producer_id)
            this.producerLabel.delete(type)
    
            const el = document.getElementById(producer_id);

            const par = document.getElementById(producer_id + 'container');

            if (type !== mediaType.audio) {
                el.srcObject.getTracks().forEach(track => {
                    track.stop();
                })
    
                el.remove();
            }

            if (par) {
                par.remove();
            }
    
            this.producers.delete(producer_id);

        } catch (error) {
            console.log(error);

        }
    }

    async produce(type, deviceId = null, screenName, experimental_audio = false) {

        let producer;

        let mediaConstraints = {};

        let audio = false;

        let screen = false;
        
        switch (type) {
            case mediaType.audio:
                mediaConstraints = {
                    audio: {
                        deviceId: deviceId,
                        echoCancellation: this.echoCancellation,
                        noiseSuppression: this.noiseSuppression,
                        autoGainControl: this.autoGainControl
                    },
                    video: false,
                }
                audio = true;
                break
            case mediaType.video:
                mediaConstraints = {
                    audio: false,
                    video: {
                        width: {
                            min: 540,
                            ideal: 1280,
                            max: 1280
                        },
                        height: {
                            min: 360,
                            ideal: 720,
                            max: 720
                        },
                        deviceId: deviceId,
                        maxFrameRate: 30
                    }
                }
                break
            case mediaType.screen:
                mediaConstraints = {
                    audio: false,
                    video: {
                        mandatory: {
                            chromeMediaSource: 'desktop',
                            chromeMediaSourceId: deviceId,
                            minWidth: 960,
                            maxWidth: 1280,
                            minHeight: 540,
                            maxHeight: 720,
                            maxFrameRate: 30,
                            minFrameRate: 30,
                        }
                    }
                };
                screen = true;

                this.dispatch({action: 'screen-share-loading-state', value: true})
                break
            default:
                return
        }
        
        if (!this.device.canProduce('video') && !audio) {
            this.dispatch({error: true, errorMessage: "Unable to produce video or audio"})
            return;
        }

        if (this.producerLabel.has(type)) {
            return;
        }

        let stream;

      //  let stream_audio;

        let microphone_stream;

        try {
            stream = (screen && experimental_audio) ? await navigator.mediaDevices.getDisplayMedia({video: {frameRate: 30, echoCancellation: true, deviceId: deviceId, width: 1280, height: 720}, audio: {deviceId: deviceId, echoCancellation: true, autoGainControl: false, noiseSuppression: false}, systemAudio: 'exclude'}) : await navigator.mediaDevices.getUserMedia(mediaConstraints);

            if (screen) {

                stream.getVideoTracks()[0].contentHint = 'motion'

            }
            if (audio) {

                let audCtxSrc = audioCtx.createMediaStreamSource(stream);

                audCtxSrc.mediaStream.getAudioTracks()[0].contentHint = 'speech';

                let dst = audioCtx.createMediaStreamDestination();

                let gainNode = audioCtx.createGain();
             
                gainNode.gain.value = this.microphoneInputVolume;
                
                [audCtxSrc, gainNode, dst].reduce((a, b) => a && a.connect(b));

                microphone_stream = dst.stream;
            
            }

            const track = audio ? microphone_stream.getAudioTracks()[0] : stream.getVideoTracks()[0]
            
            let params = {
                track 
            } 

            if (!audio) {
                params.appData = {type: screen ? 'screen share' : 'web cam', name: screenName}
                // params.encodings = [
                //     {
                //     rid: 'r0',
                //     maxBitrate: 100000,
                //     scalabilityMode: 'L3T2',
                //     maxFramerate: 30.0,
                //     },
                //     {
                //     rid: 'r1',
                //     maxBitrate: 300000,
                //     scalabilityMode: 'L3T2',
                //     maxFramerate: 30.0
                //     },
                //     {
                //     rid: 'r2',
                //     maxBitrate: 900000,
                //     scalabilityMode: 'L3T2',
                //     maxFramerate: 30.0
                //     }
                // ]

                params.codec = this.device.rtpCapabilities.codecs.find(codec => codec.mimeType === 'video/H264');
                // document change video bitrate start
                
            }

            if (audio) {
                
                params.appData = {type: 'microphone'}
                
            }

            producer = await this.producerTransport.produce(params);

            this.producers.set(producer.id, producer);
        
            let el;

            let par;
            
            if (!audio && !screen) {

                const exists = document.getElementsByClassName(`${this.user.username}-web-cam`)[0];

                if (exists) {
                    exists.remove();
                }

                el = document.createElement('video');
                el.srcObject = stream;
                el.id = producer.id;
                el.playsInline = false;
                el.muted = true;
                if (this.webCamMirrorState) {
                    el.style.transform = 'scaleX(-1)'
                }
                
                el.className = `stream web-cam-stream ${this.user.username}-web-cam`;
                
                el.autoplay = true;
                
                document.getElementById(this.user._id).appendChild(el);
            } else if (screen) {

                const exists = document.getElementsByClassName(`${this.user._id}-streaming-player`)[0];

                if (exists) {
                    exists.parentNode.remove();
                }
                
                stream[type] = 'screen'

                el = document.createElement('video');
                
                el.srcObject = stream;

                el.id = producer.id;

                el.autoplay = true;

                el.muted = true;

                el.volume = 0;

                el.className = `user-stream-preview-source ${this.user.username}-streaming-player`

                el.playsInline = true;
                
                document.getElementById('user-stream-source-wrapper').appendChild(el)
            
            }

            let stream_audio_producer;

            if (screen && experimental_audio) {
              //  stream_audio.applyConstraints({echoCancellation: true, suppressLocalAudioPlayback: true})

                let stream_audio = stream.getAudioTracks()[0]

                let stream_audio_producer = await this.producerTransport.produce({ track: stream_audio, appData: {type: 'stream audio'}})

                this.producers.set(stream_audio_producer.id, stream_audio_producer);
            
                stream_audio_producer.on('trackended', () => {
                    this.closeProducer(type);
                })
    
                stream_audio_producer.on('transportclose', () => {
                    if (!audio) {
                        el.srcObject.getTracks().forEach(track => {
                            track.stop();
                        })
                    }
    
                    this.producers.delete(producer.id);
                })
    
                stream_audio_producer.on('close', () => {
                    if (!audio) {
                        el.srcObject.getTracks().forEach(track => {
                            track.stop();
                        })
                    }
    
                    this.producers.delete(producer.id);
                })
            }
            
            producer.on('trackended', () => {
                this.closeProducer(type);

                if (screen) {

                    this.dispatch({action: 'close-stream'})
                
                }
            })

            producer.on('transportclose', () => {
                this.closeProducer(type);

                if (!audio) {
                    el.srcObject.getTracks().forEach(track => {
                        track.stop();
                    })

                }

                if (screen) {
                    this.dispatch({action: 'close-stream'})
                }

                this.producers.delete(producer.id);
            })

            producer.on('close', () => {
                this.closeProducer(type);

                if (!audio) {
                    el.srcObject.getTracks().forEach(track => {
                        track.stop();
                    })
                }

                if (screen) {
                    this.dispatch({action: 'close-stream'})

                    this.producers.delete(stream_audio_producer.id);
                }

                this.producers.delete(producer.id);
            })

            this.producerLabel.set(type, producer.id);

            if (audio) {
                this.pauseProducer('audioType')
            }

            setTimeout(() => {
                this.dispatch({action: 'screen-share-loading-state', value: false})

                this.dispatch({action: 'webcam-loading-state', value: false})
            }, 500) 

        } catch (error) {
            console.log(error)

            this.dispatch({action: 'webcam-loading-state', value: false})

            this.dispatch({action: 'screen-share-loading-state', value: false})

            this.closeProducer(type);

            if (error.message.includes('Queue')) {
                


            } else {
                this.dispatch({action: 'error', value: error.message})
            }

            
        }
    }

    pauseConsumerById(id) {
        if (!this.consumers.has(id)) return;

        this.socket.request('pauseConsumer', {consumerId: id});
    }

    resumeConsumerById(id) {
        if (!this.consumers.has(id)) return;

        this.socket.request('resumeConsumer', {consumerId: id});
    }

    pauseProducerById(id) {
        if (!this.producers.has(id)) return;

        this.producers.get(id).pause();
    }

    resumeProducerById(id) {
        if (!this.producers.has(id)) return;

        this.producers.get(id).resume();
    }

    pauseProducer(type) {
        if (!this.producerLabel.has(type)) return;
        let producer_id = this.producerLabel.get(type);
        this.producers.get(producer_id).pause();

        if (type === 'videoType') {
            document.querySelector(`#${this.user.username} video`).style.zIndex = "-1";
        }
    }

    resumeProducer(type) {
        if (!this.producerLabel.has(type)) return;
        
        let producer_id = this.producerLabel.get(type);

        this.producers.get(producer_id).resume();

        if (type === 'videoType') {
            document.querySelector(`#${this.user.username} video`).style.zIndex = "3";
        }
    }

    exit(offline = false) {
        let clean = function() {
            this.consumerTransport.close();
            this.producerTransport.close();
            this.socket.off('disconnect');
            this.socket.off('newProducers');
            this.socket.off('consumerClosed');
        }.bind(this)

        if (!offline) {
            this.socket.request('leaves channel')
            .finally( function () {clean()})
        } else {
            clean();
        }
    }

    async initSockets() {
        this.socket.on('consumerclosed', function({ consumer_id }) {
            
            this.removeConsumer(consumer_id);
        
        }.bind(this))

        this.socket.on('newProducers', async function (data) {
           console.log(data)
            for (let {producer_id, user, appData } of data) {
                await this.consume(producer_id, user, appData);
            }
            
        }.bind(this))

        this.socket.on('disconnect', function () {
            this.exit(true);
        }.bind(this))
    }

    async join() {

        await this.socket.request('join channel', {channel_id: this.current_channel_id, server_id: this.server_id, user: this.user})
        .then(async function() {
            const data = await this.socket.request('getRouterRtpCapabilities');

            let device = await this.loadDevice(data);
            
            this.device = device;

            await this.initTransports(device);

            await this.initSockets();

            this.socket.emit('getProducers');
            
            this.dispatch({action: "playSoundEffect", value: "connected"});
        }.bind(this))
        .catch(error => {
            this.dispatch({action: 'sdp-error'});
        })

        
    }

    toggleAudioState(value) {
        this.audioState = value;
    }

    async handleError() {
        if (this.handling_error) return;

        this.handling_error = true;

        this.error_count++;

        this.dispatch({action: 'reconnecting', value: false});

        if (this.error_count > 20) {
           return this.dispatch({action: 'error', value: "Unable to establish a secure connection please try relaunching the application"})
        } else {
            try {
                this.closeProducer('audioType');
                this.closeProducer('screenType');
                this.closeProducer('videoType');
                this.consumerTransport.close();
                this.producerTransport.close();
                this.socket.off('disconnect');
                this.socket.off('newProducers');
                this.socket.off('consumerClosed');
            } catch (error) {
                console.log(error);
            }

            setTimeout(async () => {

                const data = await this.socket.request('getRouterRtpCapabilities');

                let device = await this.loadDevice(data);
                
                this.device = device;

                await this.initTransports(device);

                await this.initSockets();

                this.socket.emit('getProducers');

                this.dispatch({action: 'reconnecting', value: true});
                
                this.handling_error = false;
                
            }, 3000)
        }

    }
}
