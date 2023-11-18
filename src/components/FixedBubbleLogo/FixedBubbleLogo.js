import React from 'react'

import { BubbleLogo } from '../Icons/bubbleLogo/BubbleLogo';

export const FixedBubbleLogo = () => {
    return (
        <div style={{
            position: 'fixed',
            top: 10,
            left: 10,
            zIndex: 10
        }}>
            <BubbleLogo />
        </div>
    )
}
