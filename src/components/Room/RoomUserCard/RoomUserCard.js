import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./RoomUserCard.module.css";
import {ImageComponent }from "../../Image/Image";  // Assuming this is a valid component

export const RoomUserCard = ({ user_id, consumers, action }) => {

    const user = useSelector(state => state.serverUsersSlice.users[user_id]);

    const { isAudioMuted } = useSelector(state => state.mediaControlSlice);
 
    const audioElementsRef = useRef({});  // Store references to audio elements by consumer ID

    const audioContainerRef = useRef(null);  // Container for audio elements

    const webcamContainerRef = useRef()

    const webcamElementRef = useRef({});

      // Effect to handle consumers and audio elements
      useEffect(() => {
        // Add new audio elements for consumers
        consumers.forEach(consumer => {
  
            const track = consumer.track;

            if (consumer.appData.type === 'microphone') {
               
                // If the consumer doesn't already have an audio element
                if (track && !audioElementsRef.current[consumer.id]) {
                    const audioElement = document.createElement("audio");
                    audioElement.srcObject = new MediaStream([track]);  // Set the track as the source
                    audioElement.autoplay = true;
                    audioElement.muted = false;  // Ensure the audio is not muted
                    audioElement.controls = false;
                    audioElement.id = `${consumer.user_id}-microphone-source`; // Use the correct user_id
                    audioElement.volume = 0.5;
                    audioElement.style.display = 'none'; // Optional: add controls to the audio element
                    audioElementsRef.current[consumer.id] = audioElement; // Store the audio element reference

                    // Append the audio element to the container in the DOM
                    if (audioContainerRef.current) {
                        audioContainerRef.current.appendChild(audioElement);
                    }
                }
            }

            if (consumer.appData.type === 'webcam') {
               
                if (track && !webcamElementRef.current[consumer.id]) {

                    const videoElement = document.createElement('video');

                    videoElement.srcObject = new MediaStream([track])
                    videoElement.autoplay = true;
                    videoElement.controls = false;
                    videoElement.muted = true;
                    videoElement.id = `${consumer.id}-webcam-source`;
                    webcamElementRef.current[consumer.id] = videoElement;

                    if (webcamContainerRef.current) {
                        webcamContainerRef.current.appendChild(videoElement);
                    }
                }
            }
        });

        // Cleanup function when component unmounts or when consumers change
        return () => {
            // Identify all current consumers by their ID
            const currentConsumerIds = consumers.map(consumer => consumer.id);

            // Clean up elements that are no longer in the consumers list
            Object.keys(audioElementsRef.current).forEach(consumerId => {
                if (!currentConsumerIds.includes(consumerId)) {
                    // Remove audio element if consumer is no longer in the list
                    audioElementsRef.current[consumerId].remove();
                    delete audioElementsRef.current[consumerId];
                }
            });

            Object.keys(webcamElementRef.current).forEach(consumerId => {
                if (!currentConsumerIds.includes(consumerId)) {
                    // Remove webcam element if consumer is no longer in the list
                    webcamElementRef.current[consumerId].remove();
                    delete webcamElementRef.current[consumerId];
                }
            });
        };
    }, [consumers]);  // Effect runs when consumers change

    // Handle muting logic
    useEffect(() => {
        consumers.forEach(consumer => {
            const audioElement = audioElementsRef.current[consumer.id];
            if (audioElement) {
                // Muting or unmuting based on isAudioMuted
                audioElement.muted = isAudioMuted;
            }
        });
    }, [isAudioMuted, consumers]); // Runs when isAudioMuted or consumers change
// Effect runs when consumers change

    if (!user) {
        return null; // In case the user data is missing or unavailable
    }

    return (
        <div onClick={(e) => { action(`room-user-card-${user_id}`) }} id={`room-user-card-${user_id}`} className={styles.container}>
            <div className={styles.userBanner}>
                <ImageComponent src={user.user_banner} />
            </div>
            <div className={styles.userImage}>
                <ImageComponent src={user.user_image} />
            </div>
            
            <div  
            style={{
                borderColor: user.voiceActive ? 'var(--success-color)' : 'transparent'
            }}
            className={styles.overlay} />

            {/* Audio elements will be appended here */}
            <div ref={audioContainerRef} className={styles.audioContainer}></div>
            <div ref={webcamContainerRef} className={styles.webcamSource} ></div>
        </div>
    );
};
