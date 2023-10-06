import React from 'react'

import { ButtonAnimationWrapper } from '../../../buttons/ButtonAnimationWrapper/ButtonAnimationWrapper'

export const SendButton = ({action, color}) => {
    return (
        <ButtonAnimationWrapper
        action={action}
        width={22}
        height={22}
        borderRadius={5}
        description={"Send"}
        zIndex={3}
        desc_space={18}
        padding={6}
        id='social-send-button'
        >
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.8334 29.1667L43.75 6.25M20.8334 29.1667L28.125 43.75C28.2164 43.9495 28.3632 44.1185 28.5478 44.237C28.7325 44.3555 28.9473 44.4185 29.1667 44.4185C29.3861 44.4185 29.6009 44.3555 29.7855 44.237C29.9702 44.1185 30.117 43.9495 30.2084 43.75L43.75 6.25M20.8334 29.1667L6.25002 21.875C6.05056 21.7836 5.88154 21.6368 5.76304 21.4522C5.64454 21.2675 5.58154 21.0527 5.58154 20.8333C5.58154 20.6139 5.64454 20.3991 5.76304 20.2145C5.88154 20.0298 6.05056 19.8831 6.25002 19.7917L43.75 6.25" stroke={color} strokeWidth="4.16667" strokeLinecap="round" strokeLinejoin="round"/>
</svg>


        </ButtonAnimationWrapper>
    )
}
