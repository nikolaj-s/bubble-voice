
import React, { useRef, useEffect, useState } from 'react';

import { VideoOff } from 'lucide-react';

import styles from './WebcamPreview.module.css';

import { DeviceSelector } from '../ui/Inputs/DeviceSelector/DeviceSelector';

import TextButton from '../ui/Buttons/TextButton/TextButton';

import { useSelector } from 'react-redux';

const WebcamPreview = () => {

    const videoRef = useRef(null);

    const streamRef = useRef(null);

    const [error, setError] = useState(null);

    const [isWebcamActive, setIsWebcamActive] = useState(false);

    const webcamDevice = useSelector(state => state.deviceSlice.selectedWebcam);

    // Start the webcam using the selected device's id (if provided)
    const startWebcam = async () => {
        try {
        const constraints =
            webcamDevice && webcamDevice.deviceId
            ? { video: { deviceId: { exact: webcamDevice.deviceId } } }
            : { video: true };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        streamRef.current = stream;

        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }

        setIsWebcamActive(true);
        setError(null);

        } catch (err) {
        console.error("Error accessing webcam:", err);
        const deviceName =
            webcamDevice && webcamDevice.label ? webcamDevice.label : 'selected webcam';
        setError(`Unable to use ${deviceName}.`);
        }
    };

    // Stop the webcam
    const stopWebcam = () => {
        if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
        }
        if (videoRef.current) {
        videoRef.current.srcObject = null;
        }
        setIsWebcamActive(false);
    };

    // Toggle the webcam state
    const toggleWebcam = () => {
        if (isWebcamActive) {
        stopWebcam();
        } else {
        startWebcam();
        }
    };

    // Re-run startWebcam when the selected device changes
    useEffect(() => {

        startWebcam();

        return () => {
        stopWebcam();
        };

    }, [webcamDevice]);

    return (
        <div className={styles.webcamContainer}>
        <DeviceSelector type={'webcam'} />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.videoWrapper}>
            <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={`${styles.video} ${!isWebcamActive ? styles.hidden : ''}`}
            />
            {!isWebcamActive && (
            <div className={styles.placeholder}>
                <VideoOff size={64} className={styles.placeholderIcon} />
                <p>Webcam is off</p>
            </div>
            )}
        </div>
        <TextButton 
            backgroundColor={isWebcamActive ? "var(--error-color)" : null}
            action={toggleWebcam}
            title={isWebcamActive ? "Turn off Webcam" : "Turn on Webcam"}
        />
        </div>
    );
};

export default WebcamPreview;
