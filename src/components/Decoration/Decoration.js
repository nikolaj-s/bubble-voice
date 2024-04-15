import React from 'react'

import "./Decoration.css";
import { Image } from '../Image/Image';

export const Decoration = ({decoration = false, width, height}) => {

    return (
        <>
        {decoration && decoration !== "" ?

        <div style={{width: width, height: height}} className='decoration-container'>
            <Image disableErr={true} cursor='pointer' image={decoration} objectFit='contain' />
        </div>
        
        :
        null
        }
        </>
    )
}
