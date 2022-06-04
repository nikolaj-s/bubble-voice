// library's
import React from 'react';
import { Image } from '../Image/Image';

// styles
import "./ServerBanner.css";

export const ServerBanner = ({serverName, serverImage}) => {

    return (
        <div className='server-banner-container' >
            <Image position='absolute' objectFit='cover' image={serverImage} />
            <div className='server-title-overlay'>
                <h2>{serverName}</h2>
            </div>
        </div>
    )
}
