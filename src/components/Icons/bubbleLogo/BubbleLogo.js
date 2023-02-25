// library
import React from 'react';
import { useSelector } from 'react-redux';
import { selectSecondaryColor } from '../../../features/settings/appSettings/appearanceSettings/appearanceSettingsSlice';

// style
import "./BubbleLogo.css";

export const BubbleLogo = ({action}) => {

    const secondaryColor = useSelector(selectSecondaryColor);

    return (
        <div
        onClick={action} className='logo-container'>
            <svg width="903" height="900" viewBox="0 0 903 900" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M382.577 5.45105C628.485 -30.5366 858.713 139.381 896.803 384.973C934.894 630.565 766.424 858.83 520.515 894.818C274.607 930.805 44.3796 760.888 6.28886 515.296C-31.8019 269.704 136.668 41.4387 382.577 5.45105Z" fill="#393939"/>
            <path d="M388.679 44.3693C612.729 11.5806 822.492 166.394 857.196 390.156C891.901 613.917 738.407 821.892 514.356 854.681C290.306 887.47 80.5436 732.656 45.8388 508.894C11.1339 285.133 164.629 77.158 388.679 44.3693Z" fill="white"/>
            <path d="M333.504 106.942C403.37 74.9416 469.432 68.4975 481.058 92.5489C492.684 116.6 445.471 162.039 375.605 194.04C305.738 226.04 239.676 232.485 228.05 208.433C216.425 184.382 263.638 138.943 333.504 106.942Z" fill="#393939"/>
            <path d="M152.642 246.923C171.221 244.204 188.616 257.042 191.494 275.598C194.372 294.154 181.643 311.401 163.064 314.12C144.484 316.839 127.089 304.001 124.211 285.445C121.333 266.889 134.062 249.642 152.642 246.923Z" fill="#393939"/>
            </svg>

        </div>
    )
}
