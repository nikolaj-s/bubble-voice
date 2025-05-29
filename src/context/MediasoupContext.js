import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import * as mediasoupClient from "mediasoup-client";
import { useSocket } from "./SocketContext"; // Adjust this import path
import { useDispatch } from "react-redux";
import ConnectingIndicator from "../components/Indicators/ConnectingIndicator/ConnectingIndicator";
import ErrorIndicator from "../components/Indicators/ErrorIndicator/ErrorIndicator";
import { throwMicrophoneError } from "../features/Channel/MediaControl/mediaControlSlice";
import { useUserAudio } from "./UserAudioContext";

const MediasoupContext = createContext(null);

export const MediasoupProvider = ({ children }) => {

  const dispatch = useDispatch();

  const socket = useSocket();

  const {addTrack, removeTrack} = useUserAudio();

  const [loading, toggleLoading] = useState(true);

  const [error, setError] = useState(false);

  const [updateSignal, setUpdateSignal] = useState(0); // This will trigger re-renders

  const deviceRef = useRef(null);

  const producerTransportRef = useRef(null);

  const consumerTransportRef = useRef(null);

  const producersRef = useRef(new Map()); // Store producers in useRef

  const consumersRef = useRef(new Map()); // Store consumers in useRef

  const forceUpdate = () => setUpdateSignal(prev => prev + 1); // Force re-render when refs change

  const loadDevice = async (routerRtpCapabilities) => {
    try {
      const local_device = new mediasoupClient.Device();
      await local_device.load({ routerRtpCapabilities });
      return local_device;
    } catch (error) {
      console.error("Error loading device:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!socket) return;

    const setupMediasoup = async () => {
      toggleLoading(true);

      const capabilities = await socket.request("getRouterRtpCapabilities").catch(setError);
      if (!capabilities || capabilities.error) return;

      let device = await loadDevice(capabilities);
      if (!device) return;

      deviceRef.current = device;
      await initTransports(deviceRef.current);

      await socket.request('getProducers').then(handleNewProducers).catch(console.log);
      toggleLoading(false);
      
      console.log('MediaSoup Mounted');
    };

    socket.on("newProducers", handleNewProducers);
    socket.on("consumerclosed", handleConsumerClosed);

    setupMediasoup();

    return () => {
      console.log("Cleaning up MediasoupProvider...");

      producersRef.current?.forEach?.((producer) => {
        try {
          producer?.close?.();
        } catch (e) {
          console.warn("Failed to close producer:", e);
        }
      });

      consumersRef.current?.forEach?.((consumer) => {
        try {
          consumer?.close?.();
        } catch (e) {
          console.warn("Failed to close consumer:", e);
        }
      });

      try {
        producerTransportRef.current?.close?.();
      } catch (e) {
        console.warn("Failed to close producerTransport:", e);
      }

      try {
        consumerTransportRef.current?.close?.();
      } catch (e) {
        console.warn("Failed to close consumerTransport:", e);
      }

      socket?.off?.("newProducers", handleNewProducers);
      socket?.off?.("consumerclosed", handleConsumerClosed);

      deviceRef.current = null;
      producersRef.current = new Map();
      consumersRef.current = new Map();
      forceUpdate();
    };

  }, [socket]);

  const handleConsumerClosed = ({ consumer_id }) => {
    consumersRef.current.delete(consumer_id);
    forceUpdate();
  };

  const handleNewProducers = async (producers) => {
    for (const { producer_id, user, appData } of producers) {
      await consume(producer_id, user, appData).catch(console.log);
    }
    forceUpdate();
  };

  const initTransports = async (device) => {
    const prodData = await socket.request("createWebRtcTransport", {
      forceTcp: false,
      rtpCapabilities: device.rtpCapabilities,
    });

    if (prodData.error) {
      console.error("Error creating send transport:", prodData.error);
      return;
    }

    producerTransportRef.current = device.createSendTransport(prodData);

    producerTransportRef.current.on("connect", async ({ dtlsParameters }, callback, errback) => {
      socket.request("connectTransport", { dtlsParameters, transport_id: prodData.id })
        .then(callback)
        .catch(errback);
    });

    producerTransportRef.current.on("produce", async ({ kind, rtpParameters, appData }, callback, errback) => {
      try {
        const producerId = await socket.request("produce", {
          producerTransportId: producerTransportRef.current.id,
          kind,
          rtpParameters,
          appData: appData || {},
        });
        callback({ id: producerId });
      } catch (error) {
        console.error("Error producing:", error);
        errback(error);
      }
    });

    const data = await socket.request("createWebRtcTransport", { forceTcp: false });
    if (data.error) {
      console.error("Error creating receive transport:", data.error);
      return;
    }

    consumerTransportRef.current = device.createRecvTransport(data);

    consumerTransportRef.current.on("connect", ({ dtlsParameters }, callback, errback) => {
      socket.request("connectTransport", { transport_id: consumerTransportRef.current.id, dtlsParameters })
        .then(callback)
        .catch(errback);
    });

    consumerTransportRef.current.on("connectionstatechange", (state) => {
      console.log("Consumer transport state:", state);
    });
  };

  const produce = async (type, track) => {
    if (!deviceRef.current) return;

    if (producersRef.current.has(type)) {
      await closeProducer(type);
    }

    let params = { track, appData: { type } };

    const producer = await producerTransportRef.current.produce(params);
    console.log(producer, type)
    producer.on("transportclose", () => closeProducer(type));
    producer.on("close", () => closeProducer(type));
    producer.on("trackended", () => closeProducer(type));

    producersRef.current.set(type, producer);
    forceUpdate();
  };

  const consume = async (producerId, user, data) => {
    if (!deviceRef.current) return;

    const consumerParams = await socket.request("consume", {
      producerId,
      rtpCapabilities: deviceRef.current.rtpCapabilities,
      consumerTransportId: consumerTransportRef.current.id,
    });

    if (!consumerParams || consumerParams.error) return;

    const consumer = await consumerTransportRef.current.consume(consumerParams);

    consumer.user_id = user;

    consumer.appData = data;
    
    if (data.type === 'microphone') {
      addTrack(user, consumer.track)
    } else if (data.type === 'screenAudio') {
      addTrack(`screen-audio-source-${user}`, consumer.track);
    }

    consumer.on("trackended", () => {

      document.getElementById(consumer.id)?.remove();

      if (consumer.appData.type === 'microphone') {
        removeTrack(consumer.user_id);
      }
    });

    consumer.on("close", () => {

      document.getElementById(consumer.id)?.remove();

       if (consumer.appData.type === 'microphone') {
        removeTrack(consumer.user_id);
      }

    }); 
    
    consumer.on("transportclose", () => {

      document.getElementById(consumer.id)?.remove()

      if (consumer.appData.type === 'microphone') {
        removeTrack(consumer.user_id);
      }

      closeConsumer(consumer.id)
    });    

    consumersRef.current.set(consumer.id, consumer);

    forceUpdate();
  };

  const closeProducer = async (type) => {

      const producer = producersRef.current.get(type);

      if (producer) {
        await socket.request('producerClosed', { producer_id: producer.id });
        producer?.close();
        producersRef?.current?.delete(type);
        forceUpdate();
        if (type === 'microphone') {
          socket.emit('voice activation', {voiceActive: false})
        }
      }
  };

  const closeConsumer = (consumerId) => {
    const consumer = consumersRef.current.get(consumerId);
    if (consumer) {
      consumer?.close();
      consumersRef.current.delete(consumerId);
      forceUpdate();
    }
  };

  const pauseProducer = (type) => {
    const producer = producersRef.current.get(type);
    if (producer) {
      producer.pause();
      if (type === 'microphone') {
        socket.emit('voice activation', { voiceActive: false });
      }
     // forceUpdate();
    }
  };

  const resumeProducer = (type) => {

    const producer = producersRef.current.get(type);

    if (producer) {
      producer.resume();
      if (type === 'microphone') {
        socket.emit('voice activation', { voiceActive: true });
      }
    //  forceUpdate();
    } else {

      if (type === 'microphone') {
        dispatch(throwMicrophoneError('No Microphone Producer Present, You may need to rejoin the channel'))
        
      }

    }
  };

  const getProducers = () => new Map(producersRef.current);
  const getConsumers = () => new Map(consumersRef.current);
  
  if (error) return <ErrorIndicator message={error} />

  if (loading) return <ConnectingIndicator />

  return (
    <MediasoupContext.Provider value={{ 
      produce, consume, closeProducer, pauseProducer, resumeProducer,
      getProducers, getConsumers, updateSignal // Trigger context updates
    }}>
      {children}
    </MediasoupContext.Provider>
  );
};

export const useMediasoup = () => {
  const context = useContext(MediasoupContext);
  if (!context) {
    throw new Error("useMediasoup must be used within a MediasoupProvider");
  }
  return context;
};
