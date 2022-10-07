// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { newMessage, selectCurrentChannelId, throwServerError, updateMessage } from '../../../../features/server/ServerSlice';
import { selectDisplayName, selectUsername } from '../../../../features/settings/appSettings/accountSettings/accountSettingsSlice';
import { selectAccentColor, selectPrimaryColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { useAnimation, motion } from 'framer-motion';

// socket
import { socket } from '../../../../features/server/ServerBar/ServerBar';

import "./WheelSpinWidget.css";

export const WheelSpinWidget = ({widget, editing}) => {

    const dispatch = useDispatch();

    const options = widget.content.text.split(',');

    const accentColor = useSelector(selectAccentColor);

    const primaryColor = useSelector(selectPrimaryColor);

    const username = useSelector(selectUsername);

    const display_name = useSelector(selectDisplayName);

    const channelId = useSelector(selectCurrentChannelId);

    const [spinning, toggleSpinning] = React.useState(false);

    const animation = useAnimation();

    const spin = async () => {

        if (editing) return;

        if (spinning) return;

        animation.start({
            transform: 'rotate(0deg)'
        })

        setTimeout(() => {

            let degree = 1800;

            toggleSpinning(true);

            let newDegree = degree*5;

            let extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1;

            let totalDegree = newDegree + extraDegree;

            animation.start({
                transform: `rotate(${totalDegree}deg)`
            })
            
            const finalDegree = totalDegree - (Math.trunc(totalDegree / 360) * 360)
            
            setTimeout( async () => {

                let landedOn;

                if (finalDegree < 70) {
                    landedOn = options[4]
                } else if (finalDegree < 130) {
                    landedOn = options[3]
                } else if (finalDegree < 190) {
                    landedOn = options[2]
                } else if (finalDegree < 250) {
                    landedOn = options[1]
                } else if (finalDegree < 310) {
                    landedOn = options[0]
                } else if (finalDegree < 370) {
                    landedOn = options[5]
                }
                
                const data = {
                    username: username,
                    channel_id: channelId,
                    content: {
                        image: false,
                        text: `${display_name} has spun the wheel widget and it landed on ${landedOn}!`,
                        video: false,
                        link: false,
                        local_id: Math.random(5 * 30) + 1 + username,
                        loading: true,
                        display_name: display_name
                    }
                }

                dispatch(newMessage(data));

                await socket.request('message', data)
                .then(response => {
                    if (response.success) {
                        dispatch(updateMessage(response.message));
                    }
                })
                .catch(error => {
                    dispatch(throwServerError({errorMessage: error}));
                })

                toggleSpinning(false);

            }, 6000)
        }, 50)
            
    }

    return (
        <div 
        style={{
            border: `solid 4px ${accentColor}`,
            backgroundColor: primaryColor
        }}
        className='wheel-widget-wrapper' >
            <div id="wheel">
                <motion.div transition={{duration: 0.1}} animate={animation} id="inner-wheel">
                    {options.map((option, key) => {
                        return (
                            <div
                            id={360 - (60 * key)} key={option + key} className='sec'>
                                <h2 className='fa'>{option}</h2>
                            </div>
                        )
                    })}
                </motion.div>       
                <div onClick={spin} id="spin">
                    <div id="inner-spin"></div>
                </div>
                
                <div id="shine"></div>
            </div>
        </div>
    )
}
