import React from 'react'

import "./Decoration.css";
import { Image } from '../Image/Image';

export const Decoration = ({decoration, width, height}) => {

    return (
        <>
        {decoration && decoration !== "" ?

        <div style={{width: width, height: height}} className='decoration-container'>
            <Image image={decoration} objectFit='contain' />
        </div>
        
        :
        null
        }
        </>
    )
}
