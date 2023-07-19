import React from 'react'
import { InstagramEmbed, TikTokEmbed } from 'react-social-media-embed'

export const AltSocialMedia = ({link}) => {
    return (
        <>
        {!link ? null :
        link?.includes('tiktok.com') ?
        <div style={{marginLeft: 50, marginTop: 5, borderRadius: 10, overflow: 'hidden', width: 325}}>
            <TikTokEmbed width={325} url={link} />
        </div>
        : link?.includes('instagram.com') ?
        <div style={{marginLeft: 50, marginTop: 5, borderRadius: 10, overflow: 'hidden', width: 325}}>
            <InstagramEmbed  width={325} url={link} />
        </div>
        :
        null
        }
        </>
    )
}
