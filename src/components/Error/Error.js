// library's
import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

// components
import { TextButton } from "../buttons/textButton/TextButton";

// state 
import { selectPrimaryColor, selectTextColor } from '../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style 
import "./Error.css";

export const Error = ({errorMessage, action, buttonLabel = "Close"}) => {

    const primaryColor = useSelector(selectPrimaryColor)

    const textColor = useSelector(selectTextColor);

    React.useEffect(() => {

        try {
            setTimeout(() => {
                
                document.getElementsByClassName('content-screen-inner-container')[0].scrollTo(0, 0)
                
                document.getElementsByClassName('content-screen-inner-container')[0].style.overflowY = 'hidden'
            }, 10)  
            

        } catch (error) {
            return;
        }

        return () => {
            try {

                document.getElementsByClassName('content-screen-inner-container')[0].style.overflowY = 'auto'

            } catch (error) {
                return;
            }
        }
    }, [])

    return (
        <motion.div 
        style={{
            backgroundColor: 'rgba(' + primaryColor.split('rgb(')[1].split(')')[0] + ', 0.8)'
        }}
        className='error-container' initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} key={"error-componen"}> 
            <div className='inner-error-container' >
                <div
                style={{
                    backgroundColor: primaryColor
                }} 
                className='error-message-container'>
                    <p
                    style={{color: textColor}}
                    >{errorMessage}</p>
                </div>
                <TextButton action={action} name={buttonLabel} />
            </div>
        </motion.div>
    )
}
