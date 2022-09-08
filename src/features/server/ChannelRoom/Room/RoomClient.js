import { USER_PREFS } from "../../../../util/LocalData";

const mediaType = {
    audio: 'audioType',
    video: 'videoType',
    screen: 'screenType'
}

export class RoomClient {
    constructor(socket, current_channel_id, server_id, mediasoupClient, audioInputDevice, videoInputDevice, audioInputState, videoInputState, user, dispatch, audioState) {

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
                switch (state) {
                    case 'connecting':
                        break
                    case 'connected':
                        break
                    case 'failed':
                        this.consumerTransport.close();
                        break
                    default:
                        break
                }
            }.bind(this))
        }
    }

    async getConsumeStream(producerId) {
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
    }

    async consume(producer_id, user) {
        this.getConsumeStream(producer_id)
        .then( function ({consumer, stream, kind }) {
            this.consumers.set(consumer.id, consumer);

            let el;

            let par;
            console.log(stream)
            if (consumer.rtpParameters.codecs[0].mimeType === 'video/VP8') {
                
                el = document.createElement('video');
                el.srcObject = stream;
                el.id = consumer.id;
                el.className = 'stream';
                el.playsInline = false;
                el.autoplay = true;
                el.className = "";
                el.muted = true;
                document.getElementById(user._id).appendChild(el)
            } else if (consumer.rtpParameters.codecs[0].mimeType === 'video/H264' || consumer.rtpParameters.codecs[0].mimeType === 'video/rtx') {

                par = document.createElement('div');
                par.className = 'streaming-video-player-container'
                el = document.createElement('video');
                el.srcObject = stream;
                el.className = 'stream';
                par.id = consumer.id + 'container';
                el.id = consumer.id;
                el.autoplay = true;
                el.className = 'streaming-video-player'
                el.playsInline = false;
                el.muted = false;
                el.volume = 1;
                par.appendChild(el);
                document.getElementById(user._id).parentNode.appendChild(par)
            } else {
                const user_pref_volume = USER_PREFS.get(user._id);

                el = document.createElement('audio')
                el.hidden = true;
                el.srcObject = stream;
                el.className = `audio-source-for-user-${user._id}`;
                el.id = consumer.id;
                el.playsInline = false;
                el.muted = this.audioState;
                el.autoplay = true;
                el.volume = user_pref_volume?.volume ? user_pref_volume.volume : 1;
                console.log(user._id)
                console.log(document.getElementById(user._id))
                document.getElementById(user._id).appendChild(el)

            }

            consumer.on('trackended', function () {
                this.removeConsumer(consumer.id);
            }.bind(this))

            consumer.on('transportclose', function () {
                this.removeConsumer(consumer.id);
            }.bind(this))
        }.bind(this))
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

    closeProducer(type) {
        if (!this.producerLabel.has(type)) {
            console.log('There is no producer for this type ' + type)
            return
          }
      
          let producer_id = this.producerLabel.get(type)
  
          console.log('Close producer', producer_id)
      
          this.socket.emit('producerClosed', {
            producer_id
          })
      
          this.producers.get(producer_id).close()
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
    }

    async produce(type, deviceId = null) {

        let producer;

        let mediaConstraints = {};

        let audio = false;

        let screen = false;

        switch (type) {
            case mediaType.audio:
                mediaConstraints = {
                    audio: {
                        deviceId: deviceId ? {exact: deviceId} : deviceId,
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
                            ideal: 1280
                        },
                        height: {
                            min: 360,
                            ideal: 720
                        },
                        deviceId: deviceId
                    }
                }
                break
            case mediaType.screen:
                mediaConstraints = {
                    audio: false,
                    video: {
                        mandatory: {
                            chromeMediaSource: 'desktop',
                            chromeMediaSourceId: deviceId
                        }
                    }
                };
                screen = true;
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

        let stream_audio;

        try {
            stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);

            const track = audio ? stream.getAudioTracks()[0] : stream.getVideoTracks()[0]
            
           // if (screen) stream_audio = stream.getAudioTracks()[0];

            const params = {
                track
            }

            if (!audio) {
                params.encodings = [
                    {
                    rid: 'r0',
                    maxBitrate: 100000,
                    scaleResolutionDownBy: 2.0,
                    scalabilityMode: 'S1T3'
                    },
                    {
                    rid: 'r1',
                    maxBitrate: 300000,
                    scalabilityMode: 'S1T3'
                    },
                    {
                    rid: 'r2',
                    maxBitrate: 900000,
                    scalabilityMode: 'S1T3'
                    }
                ]

                params.codec = screen ? this.device.rtpCapabilities.codecs.find(codec => codec.mimeType === 'video/H264') : this.device.rtpCapabilities.codecs.find(codec => codec.mimeType === 'video/VP8')
            }

            producer = await this.producerTransport.produce(params);

            this.producers.set(producer.id, producer);

            let el;

            let par;
            
            if (!audio && !screen) {
                el = document.createElement('video');
                el.srcObject = stream;
                el.id = producer.id;
                el.playsInline = false;
                el.className = 'stream';
                el.autoplay = true;
                el.className = 'videoplayer';
                document.getElementById(this.user._id).appendChild(el);
            } else if (screen) {
                stream[type] = 'screen'
                par = document.createElement('div');
                par.className = 'streaming-video-player-container'
                el = document.createElement('video');
                el.srcObject = stream;
                el.id = producer.id;
                par.id = producer.id + 'container';
                el.autoplay = true;
                el.className = 'stream';
                el.muted = true;
                el.className = 'streaming-video-player'
                el.playsInline = true;
                par.appendChild(el)
                document.getElementById(this.user._id).parentNode.appendChild(par)
            }
            
            producer.on('trackended', () => {
                this.closeProducer(type);
            })

            producer.on('transportclose', () => {
                if (!audio) {
                    el.srcObject.getTracks().forEach(track => {
                        track.stop();
                    })
                }

                this.producers.delete(producer.id);
            })

            producer.on('close', () => {
                if (!audio) {
                    el.srcObject.getTracks().forEach(track => {
                        track.stop();
                    })
                }

                this.producers.delete(producer.id);
            })

            this.producerLabel.set(type, producer.id);

            if (audio) {
                this.pauseProducer('audioType')
            }

            if (stream_audio) {

                let stream_audio_producer = await this.producerTransport.produce({ track: stream_audio })

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

        } catch (error) {
            console.log(error)
        }
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
            console.log(consumer_id)
            this.removeConsumer(consumer_id);
        }.bind(this))

        this.socket.on('newProducers', async function (data) {
            for (let {producer_id, user } of data) {
                await this.consume(producer_id, user);
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
            console.log(error);
        })

        
    }

    toggleAudioState(value) {
        this.audioState = value;
    }
}
