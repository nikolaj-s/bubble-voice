import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./RoomUserCard.module.css";
import {ImageComponent }from "../../Image/Image";  // Assuming this is a valid component

export const RoomUserCard = ({ user_id, consumers, action }) => {

    const user = useSelector(state => state.serverUsersSlice.users[user_id]);

    const { isAudioMuted } = useSelector(state => state.mediaControlSlice);
 
    const audioElementsRef = useRef({});  // Store references to audio elements by consumer ID

    const audioContainerRef = useRef(null);  // Container for audio elements

      // Effect to handle consumers and audio elements
      useEffect(() => {
        // Add new audio elements for consumers
        consumers.forEach(consumer => {
            if (consumer.appData.type === 'microphone') {
                const track = consumer.track;

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
        });

        // Cleanup function when component unmounts or when consumers change
        return () => {
            consumers.forEach(consumer => {
                // If an audio element exists for the consumer, clean it up
                if (audioElementsRef.current[consumer.id]) {
                    audioElementsRef.current[consumer.id].remove(); // Remove the audio element from the DOM
                    delete audioElementsRef.current[consumer.id]; // Remove the reference
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
            {/* Audio elements will be appended here */}
            <div ref={audioContainerRef} className={styles.audioContainer}></div>
        </div>
    );
};
