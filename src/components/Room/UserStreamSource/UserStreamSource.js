import React, { useRef, useEffect, useState } from "react";
import styles from "./UserStreamSource.module.css"; // See CSS below
import SpinnerLoading from "../../ui/Loading/Spinner/SpinnerLoading";
import { useDispatch, useSelector } from "react-redux";
import { MicroUserDisplay } from "../../ui/MicroUserDisplay/MicroUserDisplay";
import { Subtitle } from "../../ui/Titles/Subtitle/Subtitle";
import StreamPausedOverlay from "./StreamPausedOverlay/StreamPausedOverlay";
import StreamOverlay from "../../ui/StreamOverlay/StreamOverlay";
import IconButton from "../../ui/Buttons/IconButton/IconButton";
import { Ellipsis } from "lucide-react";
import { triggerContext } from "../../../lib/services/helperFunctions";
import { useAppFocus } from "../../../hooks/useAppFocus";
import { StreamDisabledOverlay } from "./StreamDisabledOverlay/StreamDisabledOverlay";
import { setStreamDisabled } from "../../../features/UserStreamState/userStreamStateSlice";
import { useVideoElementAverageColor } from "../../../hooks/useVideoTrackAverageColor";

const UserStreamSource = ({ user_id, stream, action, id, isExpanded, setAmbientColor }) => {

    const dispatch = useDispatch();

    const videoRef = useRef(null);

    const [backgroundColor, setBackgroundColor] = React.useState('black');

    const [loading, setLoading] = useState(true);

    const {hideNonVideoUsers} = useSelector(state => state.voiceChannelSlice);

    const [trackSettings, setTrackSettings] = useState({});

    const disableStreamAmbiance = useSelector(state => state.appearanceSlice.disableStreamAmbiance);

    const user = useSelector(state => state.serverUsersSlice.users[user_id]);

    const {_id: userID} = useSelector(state => state.accountSlice.account);

    const isStreamDisabled = useSelector(state => state.userStreamStateSlice.streams[`${user_id}-stream`]?.disabled) || false;

    const focused = useAppFocus();
    
    const channel_status = user?.channel_status;

    // Set stream on mount and whenever stream changes
    useEffect(() => {
        const video = videoRef.current;
        setLoading(true);

        if (video && stream) {
            const track = stream.track;
            
            setTrackSettings(track.getSettings());

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

            setTrackSettings({});

        }

    }, [stream]);

    useEffect(() => {
        if (!focused && (user_id === userID)) {
            videoRef.current?.pause()?.catch(() => {})
        } else {
            videoRef.current?.play()?.catch(() => {});
        }
    }, [focused, userID, user_id])

    const watchStream = () => {

        const stream_source_key = `${user_id}-stream`;

        const stream_audio_source_key = `${user_id}-streamAudio`;

        dispatch(setStreamDisabled({key: stream_source_key, disabled: false}));

        dispatch(setStreamDisabled({key: stream_audio_source_key, disabled: false}));

    }

    const color = useVideoElementAverageColor(`video-stream-source-for-${user_id}`, isStreamDisabled || (!focused && user_id === userID) || disableStreamAmbiance, 1000);

    React.useEffect(() => {

        setBackgroundColor(color);

        if (isExpanded) setAmbientColor(color);
    // eslint-disable-next-line
    }, [color, isExpanded])

    return (
        <div 
        hidden={hideNonVideoUsers && isStreamDisabled}
        style={{display: hideNonVideoUsers && isStreamDisabled ? 'none' : null, backgroundColor: isExpanded ? 'transparent' : backgroundColor,}}
        data-context={JSON.stringify({type: 'userStreamSource', user_id, consumer_id: stream.id, ...trackSettings, ...channel_status?.streamDetails})}
        onClick={() => {action(id)}}
        id={id}
        className={styles.container} 
        title={`${user?.display_name} streaming ${channel_status?.streamDetails?.name || 'screen'}`}>
        {loading && (
            <SpinnerLoading />
        )}
            <video
                id={`video-stream-source-for-${user_id}`}
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={styles.video}
                style={loading ? { visibility: "hidden" } : {backgroundColor: isExpanded ? 'transparent' : backgroundColor}} // Hide video while loading
            />
            <div className={styles.streamOverlay}>
                <div className={styles.wrapper}>
                    <MicroUserDisplay user_id={user_id} />
                    <Subtitle >is streaming: {channel_status?.streamDetails?.name || 'Screen'}</Subtitle>
                </div>
            </div>
            <StreamOverlay name={`${user?.display_name} is streaming: ${channel_status?.streamDetails?.name || 'Screen'}`} 
            button={
                <IconButton 
                Icon={<Ellipsis color="var(--text-color)" />}
                onClick={(e) => {triggerContext(e, id)}}
                title={'More'}
                position="bottom"
                />
            }
            />
            {isStreamDisabled && (<StreamDisabledOverlay onWatch={watchStream} displayName={user?.display_name} streamName={channel_status?.streamDetails?.name} streamPreview={channel_status?.streamPreview} />)}
            {!focused && (user_id === userID) && (<StreamPausedOverlay />)}
        </div>
    );
};

export default UserStreamSource;
