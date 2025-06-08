import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import styles from "./RoomUserCard.module.css";
import {ImageComponent }from "../../ui/Image/Image";  // Assuming this is a valid component
import { LongPressGestureWrapper } from "../../ui/Gestures/LongPressGestureWrapper";
import { triggerContext } from "../../../lib/services/helperFunctions";
import MediaStatusIcons from "../../MediaStatusIcons/MediaStatusIcons";
import MiniStreamIndicator from "../../ui/MiniStreamIndicator/MiniStreamIndicator";
import StreamOverlay from "../../ui/StreamOverlay/StreamOverlay";
import IconButton from "../../ui/Buttons/IconButton/IconButton";
import { Ellipsis } from "lucide-react";

export const RoomUserCard = ({ user_id, webcam, action, id }) => {

    const user = useSelector(state => state.serverUsersSlice.users[user_id]);

    const {hideNonVideoUsers} = useSelector(state => state.voiceChannelSlice);

    const webcamContainerRef = useRef()

    const webcamElementRef = useRef({});

    const channel_status = user?.channel_status;

    const userStreamState = useSelector(state => state.userStreamStateSlice.streams);

    // 🔹 Function to remove video elements for webcam
    const removeWebcamElement = (webcam) => {
        Object.keys(webcamElementRef.current).forEach(consumerId => {
            if (webcam !== consumerId) {
                // Remove webcam element if consumer is no longer in the list
                webcamElementRef.current[consumerId].remove();
                delete webcamElementRef.current[consumerId];
                document.getElementById(consumerId)?.remove();
          
            }
        });
    };

      // Effect to handle consumers and audio elements
    useEffect(() => {
        // Add new audio elements for consumer
        
        if (!webcam) return removeWebcamElement(webcam?.id);
        
        const track = webcam.track;

        if (webcam.appData.type === 'webcam') {
            
            if (track && !webcamElementRef.current[webcam.id]) {

                const videoElement = document.createElement('video');

                videoElement.srcObject = new MediaStream([track])
                videoElement.autoplay = true;
                videoElement.controls = false;
                videoElement.playsInline = true;
                videoElement.muted = true;
                videoElement.id = `${webcam.id}`;
                webcamElementRef.current[webcam.id] = videoElement;

                if (webcamContainerRef.current) {
                    webcamContainerRef.current.appendChild(videoElement);
                }
            }
        }
       
        removeWebcamElement(webcam?.id);
        // Cleanup function when component unmounts or when consumers change
        return () => {
            // Identify all current consumers by their ID
            removeWebcamElement(webcam?.id);
        };
    }, [webcam]);  // Effect runs when consumers change

    if (!user) {
        return null; // In case the user data is missing or unavailable
    }

    return (
        <div 
        data-context={JSON.stringify({...user, type: 'user', webcam: webcam?.id})}
        onClick={(e) => { action(id) }} 
        id={id} 
        style={{
            display: hideNonVideoUsers && !channel_status?.isWebcamOn ? 'none' : null,
            zIndex: user.voiceActive ? 10 : null
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
                    <div className={styles.userStatus}>
                        <MediaStatusIcons 
                        {...channel_status} 
                        webcamDisabled={userStreamState[`${user_id}-webcam`]?.disabled} 
                        />
                       
                    </div>
                    {/* Audio elements will be appended here */}
                    <div ref={webcamContainerRef} className={styles.webcamSource} style={{display: userStreamState[`${user_id}-webcam`]?.disabled ? 'none' : null}} ></div>
                </div>
       
            </LongPressGestureWrapper>
            <StreamOverlay name={user.display_name} button={
            <>
            <IconButton
            Icon={<Ellipsis color="var(--text-color)" />}
            onClick={(e) => {triggerContext(e, id)}}
            title={'More'}
            position="bottom"
            />
            </>
        } />
        </div>
    );
};
