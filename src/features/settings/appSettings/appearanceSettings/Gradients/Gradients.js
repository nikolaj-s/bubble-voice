import React from 'react'
import { GradientButton } from '../../../../../components/buttons/GradientButton/GradientButton'

import "./Gradients.css";

export const Gradients = ({gradients, action, current_gradient}) => {
    
    return (
        <div className='gradient-buttons-wrapper'>
            {gradients.map(gradient => {
                return <GradientButton gradient={gradient.gradient} action={() => {action(gradient)}} active={gradient.type === current_gradient.type} description={gradient.type} />
            })}
        </div>
    )
}
