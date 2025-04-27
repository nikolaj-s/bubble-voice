import React from 'react'
import { Embed } from '../../ui/Embed/Embed'
import { NsfwWrapper } from '../../ui/Wrappers/NsfwWrapper/NsfwWrapper'

export const EmbedWidget = ({embed, nsfw}) => {
    return (
        <NsfwWrapper nsfw={{nsfw}}>
            <Embed url={embed} />
        </NsfwWrapper>
        
    )
}
