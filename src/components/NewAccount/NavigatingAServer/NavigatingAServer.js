import React from 'react'
import { Image } from '../../Image/Image'
import { InputTitle } from '../../titles/inputTitle/InputTitle'

import { motion } from 'framer-motion'

export const NavigatingAServer = () => {
    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
            <InputTitle title={"Navigating A Server"} />
            <div style={{width: '100%', objectFit: 'contain', height: '600px'}}>
                <Image objectFit='contain' image={"https://res.cloudinary.com/drlkgoter/image/upload/v1671826860/serverNavigation_xgln3f.jpg"} />
            </div>
        </motion.div>
    )
}
