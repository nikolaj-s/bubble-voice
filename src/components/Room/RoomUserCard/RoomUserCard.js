import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./RoomUserCard.module.css";
import {ImageComponent }from "../../ui/Image/Image";  // Assuming this is a valid component
import { LongPressGestureWrapper } from "../../ui/Gestures/LongPressGestureWrapper";
import { triggerContext } from "../../../lib/services/helperFunctions";

export const RoomUserCard = ({ user_id, consumers, action }) => {

    const [state, toggleState] = React.useState(false);

    const user = useSelector(state => state.serverUsersSlice.users[user_id]);

    const { isAudioMuted } = useSelector(state => state.mediaControlSlice);

    const {hideNonVideoUsers} = useSelector(state => state.voiceChannelSlice);
 
    const audioElementsRef = useRef({});  // Store references to audio elements by consumer ID

    const audioContainerRef = useRef(null);  // Container for audio elements

    const webcamContainerRef = useRef()

    const webcamElementRef = useRef({});

    const channel_status = user?.channel_status;

    // 🔹 Function to remove video elements for webcam
    const removeWebcamElement = (consumerId) => {
        if (webcamElementRef.current[consumerId]) {
            console.log(`Removing video element for consumer ${consumerId}`);
            webcamElementRef.current[consumerId].remove();
            delete webcamElementRef.current[consumerId];
        }
    };

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
                    audioElement.id = `${consumer.user_id}`; // Use the correct user_id
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
                    videoElement.playsInline = true;
                    videoElement.muted = true;
                    videoElement.id = `${consumer.id}`;
                    webcamElementRef.current[consumer.id] = videoElement;

                    if (webcamContainerRef.current) {
                        webcamContainerRef.current.appendChild(videoElement);
                    }

                    // track.onended = () => {
                    //     removeWebcamElement(consumer.id);

                    //     webcamContainerRef.current?.removeChild(videoElement);
                    // };
                }
            }


        });
        
        const currentConsumerIds = consumers.map(consumer => consumer.id);

        // 🔹 Cleanup when consumers array is empty
        Object.keys(audioElementsRef.current).forEach(consumerId => {
            if (!currentConsumerIds.includes(consumerId)) {
                // Remove audio element if consumer is no longer in the list
                audioElementsRef.current[consumerId].remove();
                delete audioElementsRef.current[consumerId];
                document.getElementById(consumerId)?.remove();
               
            }
        });

        Object.keys(webcamElementRef.current).forEach(consumerId => {
            if (!currentConsumerIds.includes(consumerId)) {
                // Remove webcam element if consumer is no longer in the list
                webcamElementRef.current[consumerId].remove();
                delete webcamElementRef.current[consumerId];
                document.getElementById(consumerId)?.remove();
          
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
                    document.getElementById(consumerId)?.remove();
                   
                }
            });

            Object.keys(webcamElementRef.current).forEach(consumerId => {
                if (!currentConsumerIds.includes(consumerId)) {
                    // Remove webcam element if consumer is no longer in the list
                    webcamElementRef.current[consumerId].remove();
                    delete webcamElementRef.current[consumerId];
                    document.getElementById(consumerId)?.remove();
              
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
        <div 
        data-context={JSON.stringify({...user, type: 'user'})}
        onClick={(e) => { action(`room-user-card-${user_id}`) }} 
        id={`room-user-card-${user_id}`} 
        style={{
            display: hideNonVideoUsers && !channel_status?.isWebcamOn ? 'none' : null
        }}
        hidden={hideNonVideoUsers && !channel_status?.isWebcamOn}
        className={styles.container}>
            <LongPressGestureWrapper width={'100%'} height={'100%'} onTouchContext={(e) => {triggerContext(e, `room-user-card-${user_id}`)}}>
                <div className={styles.userInnerContainer}>
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
            </LongPressGestureWrapper>
        </div>
    );
};
