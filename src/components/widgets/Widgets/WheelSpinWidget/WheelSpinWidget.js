// library's
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentChannelId, throwServerError } from '../../../../features/server/ServerSlice';
import { selectDisplayName } from '../../../../features/settings/appSettings/accountSettings/accountSettingsSlice';
import { selectAccentColor, selectPrimaryColor } from '../../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';
import { useAnimation, motion } from 'framer-motion';

// socket
import { socket } from '../../../../features/server/ServerBar/ServerBar';

import "./WheelSpinWidget.css";

export const WheelSpinWidget = ({widget, editing, initDeg = 0, onEnd = () => {}, finishingDeg, overlay = false}) => {

    const dispatch = useDispatch();

    const options = widget.content.text.split(',');

    const accentColor = useSelector(selectAccentColor);

    const primaryColor = useSelector(selectPrimaryColor);

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

        setTimeout( async () => {

            let degree = 1800;

            toggleSpinning(true);

            let newDegree = degree*5;

            let extraDegree = Math.floor(Math.random() * (360 - 1 + 1)) + 1;

            let totalDegree = newDegree + extraDegree;

            animation.start({
                transform: `rotate(${totalDegree}deg)`
            })
        
            const data = {
                widget: widget,
                username: display_name,
                action: 'wheel-spin',
                message: `${display_name} has spun a wheel`,
                extra_info: totalDegree,
                channel_id: channelId
            }

            await socket.request('widget overlay action', data)
            .then(response => {
                return;
            })
            .catch(error => {
                dispatch(throwServerError({errorMessage: error}));
            })
            
            setTimeout( async () => {

                toggleSpinning(false);

                onEnd();

            }, 6000)
        }, 50)
            
    }

    React.useEffect(() => {

        if (overlay) {

            animation.start({
                rotate: 0
            }).then(() => {
                animation.start({
                    rotate: finishingDeg
                })
            })

            setTimeout(() => {

                onEnd();

            }, 8000)

        }
        
    // eslint-disable-next-line
    }, [finishingDeg, overlay])

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
