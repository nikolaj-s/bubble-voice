import React from 'react'
import { motion } from 'framer-motion'

export const ImageIcon = ({center = false, zIndex, animation}) => {

    return (
        <motion.div
        animate={animation}
        style={{
            width: 50,
            height: 50,
            padding: 10,
            borderRadius: 15,
            position: 'absolute',
            zIndex: zIndex + 1,
            top: center ? '50%' : 10,
            left: center ? '50%' : 10,
            transform: center ? 'translate(-50%, -50%)' : null
        }}
        >
            <svg width="50" height="50" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M70.0667 16.6666H63.3333V9.93329C63.3333 8.13329 61.8667 6.66663 60.0667 6.66663H59.9667C58.1333 6.66663 56.6667 8.13329 56.6667 9.93329V16.6666H49.9667C48.1667 16.6666 46.7 18.1333 46.6667 19.9333V20.0333C46.6667 21.8666 48.1333 23.3333 49.9667 23.3333H56.6667V30.0333C56.6667 31.8333 58.1333 33.3333 59.9667 33.3H60.0667C61.8667 33.3 63.3333 31.8333 63.3333 30.0333V23.3333H70.0667C71.8667 23.3333 73.3333 21.8666 73.3333 20.0666V19.9333C73.3333 18.1333 71.8667 16.6666 70.0667 16.6666ZM53.3333 30.0333V26.6666H49.9667C48.2 26.6666 46.5333 25.9666 45.2667 24.7333C44.0333 23.4666 43.3333 21.8 43.3333 19.9333C43.3333 18.7333 43.6667 17.6333 44.2333 16.6666H16.6667C13 16.6666 10 19.6666 10 23.3333V63.3333C10 67 13 70 16.6667 70H56.6667C60.3333 70 63.3333 67 63.3333 63.3333V35.7333C62.3333 36.3 61.2 36.6666 59.9333 36.6666C58.1826 36.6491 56.5089 35.9436 55.274 34.7024C54.0391 33.4613 53.342 31.7841 53.3333 30.0333ZM53.2 63.3333H20C19.6905 63.3333 19.3871 63.2471 19.1238 63.0844C18.8605 62.9217 18.6477 62.6888 18.5093 62.412C18.3709 62.1351 18.3123 61.8252 18.3401 61.517C18.3679 61.2087 18.481 60.9142 18.6667 60.6666L25.2667 51.9C25.9667 50.9666 27.3333 51.0333 28 51.9666L33.3333 60L42.0333 48.4C42.7 47.5333 44 47.5 44.6667 48.3666L54.5 60.6333C55.3667 61.7333 54.6 63.3333 53.2 63.3333Z" fill="black"/>
            </svg>
        </motion.div>
    )
}
