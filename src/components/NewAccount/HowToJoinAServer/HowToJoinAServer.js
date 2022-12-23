import React from 'react'

import { motion } from 'framer-motion'
import { InputTitle } from '../../titles/inputTitle/InputTitle'
import { Image } from '../../Image/Image'

export const HowToJoinAServer = () => {

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} style={{display: 'flex', flexDirection: 'column'}}>
            <InputTitle title={"How To Join A Server"} />
            <div 
            style={{width: '100%', height: '600px', objectFit: 'contain'}}
            className='joinning-a-server-image'>
                <Image objectFit='contain' image={"https://res.cloudinary.com/drlkgoter/image/upload/v1671826244/HowToJoin_rd6s2i.jpg"} />
            </div>
        </motion.div>
    )
}
