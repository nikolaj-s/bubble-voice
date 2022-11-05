// library's
import React from 'react'
import { useSelector } from 'react-redux';
import { WebCamAlt } from '../../../../../components/Icons/WebCamAlt/WebCamAlt';
import { selectAccentColor, selectPrimaryColor } from '../../appearanceSettings/appearanceSettingsSlice';

// style
import "./PreviewWebCam.css";

export const PreviewWebCam = ({preview = false, deviceId, mirrored}) => {

    const accentColor = useSelector(selectAccentColor);

    const primaryColor = useSelector(selectPrimaryColor);

    React.useEffect(() => {

        let el;

        if (preview === true) {

            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    deviceId: deviceId,
                    width: 1280,
                    height: 720
                }
            }).then(stream => {

                el = document.createElement('video')
                el.id = 'web-cam-preview-source';
                el.style.width = '100%';
                el.style.height = '100%';
                el.style.objectFit = 'cover';
                el.srcObject = stream;
                el.autoplay = true;
                if (mirrored) {

                    el.style.transform = 'scaleX(-1)'
                
                }

                document.getElementsByClassName('preview-web-cam-settings-container')[0].appendChild(el);

            })

        } else {
            el?.srcObject.getTracks().forEach(track => {
                track.stop();
            })

            el?.remove();
        }

        return () => {

            el?.srcObject.getTracks().forEach(track => {
                track.stop();
            })

            el?.remove();
        }

    // eslint-disable-next-line
    }, [preview])

    React.useEffect(() => {
        if (preview) {

            if (mirrored) {
                document.getElementById('web-cam-preview-source').style.transform = 'scaleX(-1)'
            } else {
                document.getElementById('web-cam-preview-source').style.transform = 'scaleX(1)'
            }

        }
    // eslint-disable-next-line
    }, [mirrored])

    return (
        <div 
        style={{
            backgroundColor: accentColor,
            border: `solid 4px ${primaryColor}`
        }}
        className="preview-web-cam-settings-container">
            {preview ? null : <WebCamAlt />}
        </div>
    )
}
