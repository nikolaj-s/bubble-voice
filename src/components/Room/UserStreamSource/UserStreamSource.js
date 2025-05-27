import { useRef, useEffect, useState } from "react";
import styles from "./UserStreamSource.module.css"; // See CSS below
import SpinnerLoading from "../../ui/Loading/Spinner/SpinnerLoading";
import { useSelector } from "react-redux";
import { MicroUserDisplay } from "../../ui/MicroUserDisplay/MicroUserDisplay";
import { Subtitle } from "../../ui/Titles/Subtitle/Subtitle";
import StreamPausedOverlay from "./StreamPausedOverlay/StreamPausedOverlay";

const UserStreamSource = ({ user_id, stream, action }) => {
    const videoRef = useRef(null);

    const [loading, setLoading] = useState(true);

    const user = useSelector(state => state.serverUsersSlice.users[user_id]);

    const {user_id: userID} = useSelector(state => state.accountSlice.account);

    const {focused} = useSelector(state => state.uiSlice);
    
    const channel_status = user?.channel_status;

    // Set stream on mount and whenever stream changes
    useEffect(() => {
        const video = videoRef.current;
        setLoading(true);

        if (video && stream) {
            const track = stream.track;

            video.srcObject = new MediaStream([track]);

            const handleLoaded = () => setLoading(false);

            video.addEventListener("loadedmetadata", handleLoaded);

            video.play().catch(() => {}); // Some browsers may need play() to start

            return () => {
                video.pause();

                video.removeEventListener("loadedmetadata", handleLoaded);

                video.srcObject = null; // Clean up

            };

        } else if (video) {

            video.srcObject = null;

            setLoading(false);

        }

    }, [stream]);

    useEffect(() => {
        if (!focused && (user_id === userID)) {
            videoRef.current?.pause()?.catch()
        } else {
            videoRef.current?.play()?.catch();
        }
    }, [focused, userID, user_id])

    return (
        <div 
        data-context={JSON.stringify({type: 'userStreamSource', user_id, consumer_id: stream.id})}
        onClick={() => {action(`${user_id}-screen-share-source`)}}
        id={`${user_id}-screen-share-source`}
        className={styles.container} 
        title={`${user.display_name} streaming ${channel_status?.streamDetails?.name || 'screen'}`}>
        {loading && (
            <SpinnerLoading />
        )}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={styles.video}
                style={loading ? { visibility: "hidden" } : {}} // Hide video while loading
            />
            <div className={styles.streamOverlay}>
                <div className={styles.wrapper}>
                    <MicroUserDisplay user_id={user_id} />
                    <Subtitle >is streaming: {channel_status?.streamDetails?.name || 'Screen'}</Subtitle>
                </div>
            </div>
            {!focused && (user_id === userID) && (<StreamPausedOverlay />)}
        </div>
    );
};

export default UserStreamSource;
