import React from 'react'
import { GradientButton } from '../../../../../components/buttons/GradientButton/GradientButton'

import "./Gradients.css";
import { useSelector } from 'react-redux';
import { selectGlassColor } from '../appearanceSettingsSlice';

export const Gradients = ({gradients, action, current_gradient}) => {
    
    const glassColor = useSelector(selectGlassColor);

    return (
        <div 
        style={{background: (current_gradient.gradient || glassColor)}}
        className='gradient-buttons-wrapper'>
            {gradients.map(gradient => {
                return <GradientButton gradient={gradient.gradient} action={() => {action(gradient)}} active={gradient.type === current_gradient.type} description={gradient.type} />
            })}
        </div>
    )
}
