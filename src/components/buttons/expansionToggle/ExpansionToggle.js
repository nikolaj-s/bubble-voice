// library's
import React from 'react';
import { motion, useAnimation } from 'framer-motion';

// style's
import "./ExpansionToggle.css";
import { ButtonAnimationWrapper } from '../ButtonAnimationWrapper/ButtonAnimationWrapper';

export const ExpansionToggle = ({action, state}) => {

    return (
        <ButtonAnimationWrapper width={30} height={30} className={"expansion-toggle-button"}>
            <svg width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.2688 0.416672L26.2146 3.36251L14.4292 15.1479L26.2146 26.9333L23.2688 29.8792L8.5375 15.15L23.2688 0.416672ZM4.66667 29.5833V0.416672H0.5V29.5833H4.66667Z" fill="black" fillOpacity="0.5"/>
            </svg>
        </ButtonAnimationWrapper>
    )
}
